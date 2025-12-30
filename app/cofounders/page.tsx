"use client";

import { useState, useCallback, useEffect } from "react";
import { AuthGuard } from "@/components/auth/auth-guard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  MessageCircle,
  Filter,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { getMatchedUsers } from "@/lib/api";
import { getToken } from "@/lib/auth";

interface CoFounder {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url?: string;
  location?: string;
  skills: string[];
  experience?: string;
  looking_for?: string;
}

export default function CoFoundersPage() {
  const [coFounders, setCoFounders] = useState<CoFounder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  const fetchCoFounders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const result = await getMatchedUsers(token, searchTerm || undefined);

      // Map API response to CoFounder interface
      const mappedData = result.map((user: any) => {
        // Ensure skills is always an array
        let skillsArray: string[] = [];
        if (Array.isArray(user.profile?.skills)) {
          skillsArray = user.profile.skills;
        } else if (typeof user.profile?.skills === "string") {
          // If skills is a string, split by comma or space
          skillsArray = user.profile.skills
            .split(/[, ]+/)
            .filter((s) => s.trim());
        }

        return {
          id: user.id.toString(),
          name: user.username,
          role: user.profile?.role || "Co-founder",
          bio: user.profile?.bio || "",
          location: user.profile?.location,
          skills: skillsArray,
          experience: user.profile?.experience,
          looking_for: user.profile?.looking_for,
        };
      });

      setCoFounders(mappedData);
      setTotalCount(result.length);
    } catch (err) {
      console.error("Error fetching cofounders:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load cofounders"
      );
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchCoFounders();
  }, [fetchCoFounders]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCoFounders();
    }, 500); // Debounce search by 500ms

    return () => clearTimeout(timer);
  }, [searchTerm, fetchCoFounders]);

  const handleSearch = () => {
    fetchCoFounders();
  };

  const clearFilters = () => {
    setSearchTerm("");
    fetchCoFounders();
  };

  return (
    <AuthGuard requiredRoles={["founder", "mentor"]}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-muted/30 py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-4xl font-bold">Find Your Co-Founder</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Connect with talented individuals who share your entrepreneurial
                vision
              </p>
            </div>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search by skills, experience, or interests..."
                    className="h-12"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <Button
                  className="h-12 px-6 bg-aau-blue hover:bg-aau-blue/90"
                  onClick={handleSearch}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Search
                </Button>
                {searchTerm && (
                  <Button
                    variant="outline"
                    className="h-12 px-6"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Co-founders Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold">Available Co-Founders</h2>
                <p className="text-muted-foreground">
                  {loading
                    ? "Loading..."
                    : `${totalCount} potential matches found`}
                </p>
              </div>
              <Button variant="outline">Post Your Profile</Button>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-aau-blue" />
                <span className="ml-2 text-muted-foreground">
                  Loading cofounders...
                </span>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="flex justify-center items-center py-12">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <span className="ml-2 text-red-500">{error}</span>
              </div>
            )}

            {/* Co-founders Grid */}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coFounders.map((person) => (
                  <Card
                    key={person.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={person.image_url || "/placeholder.svg"}
                            alt={person.name}
                          />
                          <AvatarFallback className="bg-aau-blue text-white">
                            {person.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg">
                            {person.name}
                          </CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <Briefcase className="h-3 w-3 mr-1" />
                            {person.role}
                          </CardDescription>
                          {person.location && (
                            <CardDescription className="flex items-center mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {person.location}
                            </CardDescription>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {person.bio && (
                        <p className="text-sm text-muted-foreground">
                          {person.bio}
                        </p>
                      )}

                      {person.experience && (
                        <div>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <GraduationCap className="h-3 w-3 mr-1" />
                            {person.experience} experience
                          </div>
                        </div>
                      )}

                      {person.skills &&
                        Array.isArray(person.skills) &&
                        person.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {person.skills.map((skill) => (
                              <Badge
                                key={skill}
                                variant="secondary"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        )}

                      <div className="pt-2 border-t">
                        {person.looking_for && (
                          <p className="text-sm font-medium mb-3">
                            Looking for: {person.looking_for}
                          </p>
                        )}
                        <Button className="w-full bg-aau-blue hover:bg-aau-blue/90">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && coFounders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No cofounders found matching your criteria.
                </p>
              </div>
            )}

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Profiles
              </Button>
            </div>
          </div>
        </section>
      </div>
    </AuthGuard>
  );
}
