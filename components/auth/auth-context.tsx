"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { supabase } from "@/api/client";

// Unified user shape consumed by the app
export interface AppUser {
  id: string;
  email: string;
  name?: string | null;
  role?: "founder" | "mentor" | "investor" | "admin";
  avatar?: string | null;
  // Add any other profile fields you store (department, etc.)
  department?: string | null;
}

interface AuthContextType {
  user: AppUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<AppUser | null>;
  signUp: (params: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role?: AppUser["role"];
    department?: string;
  }) => Promise<AppUser | null>;
  logout: () => Promise<void>;
  setUserRole: (role: AppUser["role"]) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Role mapping helpers (DB enum uses capitalized e.g. 'Founder')
const dbRoleToAppRole = (r?: string | null): AppUser["role"] | undefined => {
  if (!r) return undefined;
  const lower = r.toLowerCase();
  if (["founder", "mentor", "investor", "admin"].includes(lower))
    return lower as AppUser["role"];
  return undefined;
};
const appRoleToDbRole = (r?: AppUser["role"] | null): string | undefined => {
  if (!r) return undefined;
  return r.charAt(0).toUpperCase() + r.slice(1); // founder -> Founder
};

// Helper: map auth user + DB row into AppUser
function mapUser(raw: any, row?: any): AppUser | null {
  if (!raw) return null;
  const md = raw?.user_metadata || {};
  const first = row?.first_name || md.first_name;
  const last = row?.last_name || md.last_name;
  const fullName =
    [first, last].filter(Boolean).join(" ") || md.full_name || md.name || null;
  return {
    id: raw.id,
    email: raw.email,
    name: fullName,
    role: dbRoleToAppRole(row?.role || md.role),
    avatar: md.avatar_url || null, // adjust if you store avatar in users table later
    department: row?.department || md.department || null,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;

  const fetchUserRow = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("id, first_name, last_name, email, role, username")
      .eq("id", userId)
      .single();
    if (error) {
      console.warn("users row fetch error", error.message);
      return null;
    }
    return data;
  }, []);

  const loadSession = useCallback(async () => {
    setLoading(true);
    const { data: sessionData, error } = await supabase.auth.getSession();
    if (error) {
      console.warn("Session load error", error.message);
      setUser(null);
      setLoading(false);
      return;
    }
    const authUser = sessionData.session?.user;
    if (authUser) {
      const row = await fetchUserRow(authUser.id);
      setUser(mapUser(authUser, row));
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [fetchUserRow]);

  useEffect(() => {
    loadSession();
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const authUser = session?.user;
        if (authUser) {
          fetchUserRow(authUser.id).then((row) =>
            setUser(mapUser(authUser, row))
          );
        } else {
          setUser(null);
        }
      }
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [fetchUserRow, loadSession]);

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setLoading(false);
        throw new Error(error.message);
      }
      const authUser = data.user;
      const row = authUser ? await fetchUserRow(authUser.id) : null;
      const mapped = mapUser(authUser, row);
      setUser(mapped);
      setLoading(false);
      return mapped;
    },
    [fetchUserRow]
  );

  const signUp = useCallback(
    async ({
      email,
      password,
      firstName,
      lastName,
      role = "founder",
      department,
    }: {
      email: string;
      password: string;
      firstName?: string;
      lastName?: string;
      role?: AppUser["role"];
      department?: string;
    }) => {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            role: appRoleToDbRole(role),
            department,
          },
          // Temporarily disable email redirect to avoid redirect issues
          // emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/login` : undefined,
        },
      });
      if (error) {
        console.error("[auth] Signup error:", error);
        setLoading(false);
        throw new Error(`Signup failed: ${error.message}`);
      }
      const authUser = data.user;
      if (authUser) {
        // Upsert into public.users to guarantee persistence
        const payload: any = {
          id: authUser.id,
          first_name: firstName || null,
          last_name: lastName || null,
          email,
          role: appRoleToDbRole(role),
        };
        const { data: upsertData, error: upsertErr } = await supabase
          .from("users")
          .upsert(payload, { onConflict: "id" })
          .select()
          .single();
        if (upsertErr) {
          console.error(
            "[auth] users upsert error",
            upsertErr.code,
            upsertErr.message
          );
          // If table doesn't exist, try to create it or skip the profile creation
          if (
            upsertErr.code === "PGRST116" ||
            upsertErr.message?.includes(
              'relation "public.users" does not exist'
            )
          ) {
            console.warn(
              "[auth] Users table not found. Please run the database schema first."
            );
            // Continue without profile data for now
            const mapped = mapUser(authUser, payload);
            setUser(mapped);
            setLoading(false);
            return mapped;
          }
          // For other errors, still continue but log the issue
          console.warn(
            "[auth] Continuing without profile data due to database error"
          );
        }
        const row = upsertData || (await fetchUserRow(authUser.id)) || payload;
        const mapped = mapUser(authUser, row);
        setUser(mapped);
        setLoading(false);
        return mapped;
      } else {
        // Email confirmation required; user null until confirmation
        setUser(null);
        setLoading(false);
        return null;
      }
      // Fallback
      setLoading(false);
      return null;
    },
    [fetchUserRow]
  );

  const logout = useCallback(async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setLoading(false);
  }, []);

  const setUserRole = useCallback(
    async (role: AppUser["role"]) => {
      if (!user) return;
      const dbRole = appRoleToDbRole(role);
      const { error: updateErr } = await supabase
        .from("users")
        .update({ role: dbRole })
        .eq("id", user.id);
      if (updateErr) {
        console.warn("Role update failed in users table", updateErr.message);
        // Fallback to auth metadata if needed
        await supabase.auth.updateUser({ data: { role: dbRole } });
      }
      await loadSession();
    },
    [user, loadSession]
  );

  const refreshProfile = useCallback(async () => {
    if (!user) return;
    await loadSession();
  }, [user, loadSession]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        signUp,
        logout,
        setUserRole,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
