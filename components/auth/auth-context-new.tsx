"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { API_BASE_URL } from "@/lib/api";

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

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      if (data.token) {
        // Store token for API calls
        localStorage.setItem("authToken", data.token);

        // Get user profile
        const profileResponse = await fetch(`${API_BASE_URL}/users/profile/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${data.token}`,
          },
        });

        if (profileResponse.ok) {
          const profile = await profileResponse.json();

          const backendRole = profile.profile?.role;
          // Map backend role to frontend role
          const frontendRole =
            backendRole === "student" ? "founder" : backendRole;

          const appUser: AppUser = {
            id:
              profile.id?.toString() || data.user?.id?.toString() || "mock-id",
            email: profile.email || email,
            name: profile.username || profile.name || null,
            role: frontendRole || "founder",
            avatar: profile.avatar || null,
            department: profile.profile?.bio || null,
          };
          setUser(appUser);
          localStorage.setItem("auth_user", JSON.stringify(appUser));
          setLoading(false);
          return appUser;
        }
      }
      throw new Error("Login failed: No token received");
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }, []);

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
        // Map frontend role to backend expected role
        const backendRole = role === "founder" ? "student" : role;

        const response = await fetch(`${API_BASE_URL}/users/register/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: firstName || email.split("@")[0],
            email,
            password,
            profile: {
              bio: department,
              role: backendRole,
              skills: department,
            },
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          const firstError = Object.values(errorData)[0];
          throw new Error(
            Array.isArray(firstError) ? firstError[0] : "Registration failed."
          );
        }

        const data = await response.json();
        setLoading(false);
        return data; // Registration successful
      } catch (error) {
        setLoading(false);
        throw error;
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setLoading(true);
    setUser(null);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("authToken");
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
