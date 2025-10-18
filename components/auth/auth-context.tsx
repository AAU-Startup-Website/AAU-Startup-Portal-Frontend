"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

// Unified user shape consumed by the app
export interface AppUser {
  id: string;
  email: string;
  name?: string | null;
  role?: "founder" | "mentor" | "investor" | "admin";
  avatar?: string | null;
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(false);
  const isAuthenticated = !!user;

  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        // Mock login - replace with your actual authentication API
        const mockUser: AppUser = {
          id: "mock-user-id",
          email,
          name: "Mock User",
          role: "founder",
        };
        setUser(mockUser);
        localStorage.setItem("auth_user", JSON.stringify(mockUser));
        setLoading(false);
        return mockUser;
      } catch (error) {
        setLoading(false);
        throw new Error("Login failed");
      }
    },
    []
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
      try {
        // Mock signup - replace with your actual authentication API
        const mockUser: AppUser = {
          id: "mock-user-id",
          email,
          name: [firstName, lastName].filter(Boolean).join(" ") || null,
          role,
          department,
        };
        setUser(mockUser);
        localStorage.setItem("auth_user", JSON.stringify(mockUser));
        setLoading(false);
        return mockUser;
      } catch (error) {
        setLoading(false);
        throw new Error("Signup failed");
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setLoading(true);
    setUser(null);
    localStorage.removeItem("auth_user");
    setLoading(false);
  }, []);

  const setUserRole = useCallback(
    async (role: AppUser["role"]) => {
      if (!user) return;
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem("auth_user", JSON.stringify(updatedUser));
    },
    [user]
  );

  const refreshProfile = useCallback(async () => {
    // Mock refresh - in a real app, this would fetch fresh user data
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to refresh profile", e);
      }
    }
  }, []);

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
