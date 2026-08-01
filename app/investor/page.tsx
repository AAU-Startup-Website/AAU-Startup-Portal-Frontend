"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function InvestorPage() {
  return (
    <AuthGuard requiredRoles={["investor"]}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Coming Soon
          </Badge>
          <Card>
            <CardHeader>
              <CardTitle>Investor Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Investor access — browsing startups, expressing interest, and
                portfolio tracking — is planned for a future release. Stay
                tuned for updates!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  );
}
