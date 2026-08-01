"use client";

import { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AuthGuard } from "@/components/auth/auth-guard";
import { Users, Calendar } from "lucide-react";
import { getStartups, getMeetings } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { StartupProgressTab } from "@/components/startup/StartupProgressTab";

export default function MentorDashboardPage() {
  return (
    <AuthGuard requiredRoles={["mentor"]}>
      <MentorDashboard />
    </AuthGuard>
  );
}

function MentorDashboard() {
  const [activeTab, setActiveTab] = useState("startups");
  const [assignedStartups, setAssignedStartups] = useState<any[]>([]);
  const [startupsError, setStartupsError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStartup, setSelectedStartup] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"list" | "progress">("list");
  const [meetings, setMeetings] = useState<any[]>([]);
  const [meetingsError, setMeetingsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignedStartups = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const startupsData = await getStartups(token);
        // Transform API data to the shape this dashboard renders. Fields
        // the backend doesn't currently track (progress, sector, stage,
        // last/next meeting) are left undefined rather than fabricated —
        // the UI shows an honest "not tracked yet" placeholder for those.
        const transformedStartups = startupsData.map((startup: any) => ({
          id: startup.id,
          name: startup.name,
          founder: startup.founder_details?.username || "Unknown Founder",
          sector: startup.sector,
          stage: startup.stage,
          progress: typeof startup.progress === "number" ? startup.progress : null,
          status: startup.status,
          avatar: startup.logo || null,
        }));
        setAssignedStartups(transformedStartups);
        setStartupsError(null);
      } catch (error) {
        console.error("Failed to fetch assigned startups:", error);
        setAssignedStartups([]);
        setStartupsError("Failed to load your assigned startups. Please refresh the page.");
      } finally {
        setLoading(false);
      }

      try {
        const meetingsData = await getMeetings(token);
        setMeetings(meetingsData);
        setMeetingsError(null);
      } catch (error) {
        console.error("Failed to fetch meetings:", error);
        setMeetings([]);
        setMeetingsError("Failed to load your meetings. Please refresh the page.");
      }
    };

    fetchAssignedStartups();
  }, []);

  const handleViewStartupDetails = (startup: any) => {
    setSelectedStartup(startup);
    setViewMode("progress");
  };

  const handleBackToStartups = () => {
    setSelectedStartup(null);
    setViewMode("list");
  };

  const getStartupName = (startupId: number) => {
    const startup = assignedStartups.find((s) => s.id === startupId);
    return startup ? startup.name : "Unknown Startup";
  };

  const meetingsThisWeek = meetings.filter((meeting) => {
    const date = new Date(meeting.schedule_date);
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return date >= now && date <= weekFromNow;
  }).length;

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "on_track":
        return "bg-green-100 text-green-800";
      case "needs_attention":
        return "bg-yellow-100 text-yellow-800";
      case "at_risk":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {viewMode === "progress" && selectedStartup ? (
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-7xl">
            <StartupProgressTab
              startup={selectedStartup}
              onBack={handleBackToStartups}
              userRole="mentor"
            />
          </div>
        </section>
      ) : (
        <>
          {/* Header */}
          <section className="bg-muted/30 py-12 px-4">
            <div className="container mx-auto max-w-7xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Mentor Dashboard</h1>
                  <p className="text-xl text-muted-foreground">
                    Guide and support your assigned startups
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-7xl">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-6"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="startups">Assigned Startups</TabsTrigger>
                  <TabsTrigger value="meetings">Meetings</TabsTrigger>
                </TabsList>

                {/* Assigned Startups Tab */}
                <TabsContent value="startups" className="space-y-6">
                  {/* Overview Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Assigned Startups
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-aau-blue">
                          {assignedStartups.length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Active mentorships
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          This Week's Meetings
                        </CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-aau-blue">
                          {meetingsThisWeek}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Scheduled sessions
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Startup Cards */}
                  <div className="space-y-4">
                    {loading ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          Loading assigned startups...
                        </p>
                      </div>
                    ) : startupsError ? (
                      <div className="text-center py-8">
                        <p className="text-red-600">{startupsError}</p>
                      </div>
                    ) : assignedStartups.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          No assigned startups yet.
                        </p>
                      </div>
                    ) : (
                      assignedStartups.map((startup) => (
                        <Card
                          key={startup.id}
                          className="hover:shadow-md transition-shadow"
                        >
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-4">
                                <Avatar className="h-12 w-12">
                                  {startup.avatar && (
                                    <AvatarImage
                                      src={startup.avatar}
                                      alt={startup.name}
                                    />
                                  )}
                                  <AvatarFallback className="bg-aau-blue text-white">
                                    {startup.name.substring(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-lg">
                                    {startup.name}
                                  </CardTitle>
                                  <CardDescription>
                                    Founded by {startup.founder}
                                    {startup.sector ? ` • ${startup.sector}` : ""}
                                    {startup.stage ? ` • ${startup.stage}` : ""}
                                  </CardDescription>
                                </div>
                              </div>
                              {startup.status && (
                                <Badge className={getStatusColor(startup.status)}>
                                  {startup.status.replace("_", " ")}
                                </Badge>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">
                                  Overall Progress
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {startup.progress === null
                                    ? "Not tracked yet"
                                    : `${startup.progress}%`}
                                </span>
                              </div>
                              {startup.progress !== null && (
                                <Progress value={startup.progress} className="h-2" />
                              )}
                            </div>

                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewStartupDetails(startup)}
                              >
                                View Details
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </TabsContent>

                {/* Meetings Tab */}
                <TabsContent value="meetings" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Meetings</CardTitle>
                      <CardDescription>
                        Your scheduled mentoring sessions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {meetingsError ? (
                          <div className="text-center py-8">
                            <p className="text-red-600">{meetingsError}</p>
                          </div>
                        ) : meetings.length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">
                              No meetings scheduled yet.
                            </p>
                          </div>
                        ) : (
                          meetings.map((meeting) => (
                            <div
                              key={meeting.id}
                              className="flex items-center justify-between p-4 border rounded-lg"
                            >
                              <div className="flex items-center space-x-4">
                                <div className="h-10 w-10 bg-aau-blue/10 rounded-full flex items-center justify-center">
                                  <Calendar className="h-5 w-5 text-aau-blue" />
                                </div>
                                <div>
                                  <h4 className="font-medium">
                                    {meeting.title}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {getStartupName(meeting.startup)}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(
                                      meeting.schedule_date
                                    ).toLocaleDateString()}{" "}
                                    at{" "}
                                    {new Date(
                                      meeting.schedule_date
                                    ).toLocaleTimeString()}
                                  </p>
                                  {meeting.description && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {meeting.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {meeting.link && (
                                  <Button
                                    size="sm"
                                    className="bg-aau-blue hover:bg-aau-blue/90"
                                    onClick={() =>
                                      window.open(meeting.link, "_blank")
                                    }
                                  >
                                    Join Meeting
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
