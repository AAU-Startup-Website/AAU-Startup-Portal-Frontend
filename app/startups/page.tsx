"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AuthGuard from "@/components/auth/withRoleAuth";

export default function StartupsPage() {
  return (
    <AuthGuard requiredRoles={["admin"]}>
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <Badge variant="secondary" className="w-fit mx-auto mb-2">
              Coming Soon
            </Badge>
            <CardTitle className="text-2xl font-bold text-primary">
              Manage Startups
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">
              This feature is currently under development. We're working hard to
              bring you a comprehensive startup management dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  );
}
