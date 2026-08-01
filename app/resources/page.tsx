"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { AuthGuard } from "@/components/auth/auth-guard";
import { getResources } from "@/lib/api";
import { getToken } from "@/lib/auth";

function ResourcesList() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await getResources(token);
        setResources(data);
      } catch (err) {
        console.error("Failed to fetch resources:", err);
        setError("Failed to load resources. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#005081]">Resources</h1>
          <p className="text-muted-foreground">
            Shared resources available for booking
          </p>
        </div>

        {loading ? (
          <p className="text-muted-foreground text-center py-8">
            Loading resources...
          </p>
        ) : error ? (
          <p className="text-red-600 text-center py-8">{error}</p>
        ) : resources.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No resources available yet.
          </p>
        ) : (
          <div className="space-y-4">
            {resources.map((resource) => (
              <Card key={resource.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{resource.name}</CardTitle>
                      <CardDescription className="flex flex-wrap items-center gap-3 pt-1">
                        <Badge variant="outline" className="capitalize">
                          {resource.type?.replace("_", " ")}
                        </Badge>
                        {resource.capacity && (
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" /> {resource.capacity}
                          </span>
                        )}
                        <Badge
                          variant={
                            resource.availability === "available"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {resource.availability === "available"
                            ? "Available"
                            : "Unavailable"}
                        </Badge>
                      </CardDescription>
                    </div>
                    <Button
                      size="sm"
                      className="bg-[#005081] hover:bg-[#015384]"
                      disabled={resource.availability !== "available"}
                      asChild
                    >
                      <Link href={`/resources/${resource.id}/book`}>Book</Link>
                    </Button>
                  </div>
                </CardHeader>
                {resource.description && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {resource.description}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <AuthGuard>
      <ResourcesList />
    </AuthGuard>
  );
}
