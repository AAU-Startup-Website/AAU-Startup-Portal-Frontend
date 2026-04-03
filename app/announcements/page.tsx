"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  Search,
  Filter,
  Pin,
  AlertCircle,
  Info,
  CheckCircle,
  Megaphone,
  RefreshCcw,
} from "lucide-react";

type Announcement = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  // Optional UI derived fields (not in base table) with fallbacks
  type?: string | null;
  category?: string | null;
  isPinned?: boolean | null;
  author?: string | null;
};

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  const fetchAnnouncements = async () => {
    // separate function for manual refresh
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/announcements`);
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setAnnouncements(json.data || []);
    } catch (e: any) {
      setError(e.message || "Failed to load announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || announcement.category === selectedCategory;
    const matchesType =
      selectedType === "all" || announcement.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "important":
        return <AlertCircle className="h-4 w-4" />;
      case "warning":
        return <AlertCircle className="h-4 w-4" />;
      case "info":
        return <Info className="h-4 w-4" />;
      case "success":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Megaphone className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      important: "bg-red-100 text-red-800 border-red-200",
      warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
      info: "bg-blue-100 text-blue-800 border-blue-200",
      success: "bg-green-100 text-green-800 border-green-200",
      announcement: "bg-[#005081]/10 text-[#005081] border-[#005081]/20",
    };
    return variants[type as keyof typeof variants] || variants.announcement;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-muted/30 py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold">Announcements</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay informed with the latest updates, news, and important
              information from AAU Startups Portal
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search announcements..."
                  className="pl-10 h-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="applications">Applications</SelectItem>
                  <SelectItem value="programs">Programs</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="important">Important</SelectItem>
                  <SelectItem value="announcement">Announcements</SelectItem>
                  <SelectItem value="info">Information</SelectItem>
                  <SelectItem value="warning">Warnings</SelectItem>
                </SelectContent>
              </Select>
              <Button className="h-12 px-6 bg-[#005081] hover:bg-[#015384] text-white transition-colors">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements List */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-6">
            {loading && (
              <div className="text-center py-10 text-muted-foreground">
                Loading announcements...
              </div>
            )}
            {error && !loading && (
              <div className="text-center py-10 text-red-600 text-sm">
                {error}
              </div>
            )}
            {!loading &&
              !error &&
              filteredAnnouncements.length === 0 &&
              announcements.length > 0 && (
                <div className="text-center py-10 text-muted-foreground">
                  No announcements match your filters.
                </div>
              )}
            {!loading && !error && announcements.length === 0 && (
              <Card className="border-[#CAD6DE] max-w-2xl mx-auto">
                <CardContent className="py-16 px-8">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <Megaphone className="h-10 w-10 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">
                        There are no announcements yet
                      </h3>
                      <p className="text-muted-foreground max-w-md text-sm">
                        Announcements will appear here soon. Check back for the
                        latest updates, news, and important information from AAU
                        Startups Portal.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            {filteredAnnouncements.map((announcement) => (
              <Card
                key={announcement.id}
                className={`hover:shadow-lg transition-shadow border-[#CAD6DE] ${
                  announcement.isPinned ? "border-[#E63946] border-2" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {announcement.isPinned && (
                          <Badge className="bg-[#E63946] text-white border-[#E63946]">
                            <Pin className="h-3 w-3 mr-1" />
                            Pinned
                          </Badge>
                        )}
                        <Badge
                          className={getTypeBadge(
                            announcement.type || "announcement",
                          )}
                        >
                          {getTypeIcon(announcement.type || "announcement")}
                          <span className="ml-1 capitalize">
                            {announcement.type || "announcement"}
                          </span>
                        </Badge>
                        {announcement.category && (
                          <Badge variant="outline">
                            {announcement.category}
                          </Badge>
                        )}
                      </div>

                      <CardTitle className="text-xl">
                        {announcement.title}
                      </CardTitle>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(announcement.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {Math.ceil(Math.random() * 5)} min read
                        </div>
                        {announcement.author && (
                          <span>By {announcement.author}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    {announcement.content}
                  </CardDescription>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        Share
                      </Button>
                      <Button variant="ghost" size="sm">
                        Save
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      className="bg-[#005081] hover:bg-[#015384] text-white"
                    >
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={fetchAnnouncements}
                disabled={loading}
              >
                <RefreshCcw className="h-4 w-4 mr-2" /> Refresh
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <Card className="max-w-2xl mx-auto text-center p-8">
            <CardHeader>
              <CardTitle className="text-2xl">Never Miss an Update</CardTitle>
              <CardDescription>
                Subscribe to get important announcements and updates delivered
                directly to your email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder="Enter your email address"
                  type="email"
                  className="flex-1"
                />
                <Button className="bg-[#005081] hover:bg-[#015384] text-white">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Get notified about important updates, deadlines, and
                opportunities. Unsubscribe anytime.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
