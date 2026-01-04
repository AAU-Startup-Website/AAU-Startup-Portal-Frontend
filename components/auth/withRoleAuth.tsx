// components/auth/withRoleAuth.tsx
"use client";

import { useEffect, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-context";

type UserRole = "founder" | "mentor" | "investor" | "admin";

interface WithRoleAuthProps {
  allowedRoles: UserRole[];
  redirectTo?: string;
}

const withRoleAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
  { allowedRoles, redirectTo = "/unauthorized" }: WithRoleAuthProps
) => {
  const WithRoleAuthComponent = (props: P) => {
    const router = useRouter();
    const { user, isAuthenticated, loading } = useAuth();

    useEffect(() => {
      if (loading) return; // Wait for auth state to load

      if (!isAuthenticated) {
        router.push("/login");
        return;
      }

      const userRole = user?.role as UserRole;
      if (!allowedRoles.includes(userRole)) {
        router.push(redirectTo);
        return;
      }
    }, [router, user, isAuthenticated, loading, allowedRoles, redirectTo]);

    if (loading) {
      return <div>Loading...</div>; // Or a proper loading component
    }

    return <WrappedComponent {...props} />;
  };

  return WithRoleAuthComponent;
};

export default withRoleAuth;
