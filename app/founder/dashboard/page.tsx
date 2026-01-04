"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getIdeas, deleteIdea, getProfile } from "@/lib/api";
import { getToken } from "@/lib/auth";

import withAuth from "@/components/auth/withAuth";
import { AuthGuard } from "@/components/auth/auth-guard";

function FounderDashboard() {
  const router = useRouter();
  const [ideas, setIdeas] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      if (!token) return;

      try {
        const [profileData, ideasData] = await Promise.all([
          getProfile(token),
          getIdeas(),
        ]);
        setUser(profileData);
        // Filter ideas by owner (assuming ideas have an owner field)
        const userIdeas = ideasData.filter(
          (idea: any) => idea.owner === profileData.id
        );
        setIdeas(userIdeas);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      await deleteIdea(id);
      setIdeas(ideas.filter((idea) => idea.id !== parseInt(id)));
    } catch (err) {
      setError("Failed to delete idea. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Founder Dashboard</h1>
        <Button onClick={() => router.push("/founder")}>Manage Ideas</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Ideas</CardTitle>
          <CardDescription>
            Here are the startup ideas you have submitted.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ideas.length > 0 ? (
              ideas.map((idea) => (
                <div
                  key={idea.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{idea.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {idea.description}
                    </p>
                    <Badge
                      className={
                        idea.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : idea.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {idea.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push("/founder")}
                    >
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your idea.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(idea.id.toString())}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))
            ) : (
              <p>You have not submitted any ideas yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function FounderDashboardPage() {
  return (
    <AuthGuard requiredRoles={["founder"]}>
      <FounderDashboard />
    </AuthGuard>
  );
}
