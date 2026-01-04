"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function BookingsPage() {
  return (
    <AuthGuard requiredRoles={["founder"]}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Coming Soon
          </Badge>
          <Card>
            <CardHeader>
              <CardTitle>Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This feature is currently under development. We're working hard
                to bring you the best experience possible. Stay tuned for
                updates!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  );
}
