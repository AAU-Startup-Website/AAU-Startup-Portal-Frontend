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
import {
  Users,
  Calendar,
  MessageSquare,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { getStartups } from "@/lib/api";
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
  const [loading, setLoading] = useState(true);
  const [selectedStartup, setSelectedStartup] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"list" | "progress">("list");

  useEffect(() => {
    const fetchAssignedStartups = async () => {
      try {
        const token = getToken();
        console.log("Token:", token);
        if (token) {
          console.log("Fetching assigned startups for mentor...");
          const startupsData = await getStartups(token);
          console.log("Assigned startups data:", startupsData);
          
          // Transform API data to match expected format for mentor dashboard
          const transformedStartups = startupsData.map((startup: any) => ({
            id: startup.id,
            name: startup.name,
            founder: startup.founder_name || "Unknown Founder",
            sector: startup.sector || "Technology",
            stage: startup.stage || "Early Stage",
            progress: startup.progress || Math.floor(Math.random() * 100), // Temporary random progress
            lastMeeting: startup.last_meeting || new Date().toISOString().split('T')[0],
            nextMeeting: startup.next_meeting || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            status: startup.status || "on_track",
            avatar: startup.logo || "/placeholder.svg?height=40&width=40",
          }));
          
          setAssignedStartups(transformedStartups);
        }
      } catch (error) {
        console.error("Failed to fetch assigned startups:", error);
        // Mock data for testing
        setAssignedStartups([
          {
            id: 1,
            name: "EthioPay Solutions",
            founder: "Meron Tadesse",
            sector: "FinTech",
            stage: "Series A",
            progress: 85,
            lastMeeting: "2024-12-10",
            nextMeeting: "2024-12-15",
            status: "on_track",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 2,
            name: "AgriTech Ethiopia",
            founder: "Dawit Kebede",
            sector: "Agriculture",
            stage: "Seed",
            progress: 60,
            lastMeeting: "2024-12-08",
            nextMeeting: "2024-12-20",
            status: "needs_attention",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 3,
            name: "EduConnect",
            founder: "Hana Mengistu",
            sector: "Education",
            stage: "Pre-seed",
            progress: 40,
            lastMeeting: "2024-12-05",
            nextMeeting: "2024-12-18",
            status: "on_track",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        ]);
      } finally {
        setLoading(false);
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

  const upcomingMeetings = [
    {
      id: 1,
      startup: "EthioPay Solutions",
      founder: "Meron Tadesse",
      date: "2024-12-15",
      time: "14:00",
      type: "Progress Review",
      location: "Conference Room A",
    },
    {
      id: 2,
      startup: "HealthConnect Ethiopia",
      founder: "Daniel Bekele",
      date: "2024-12-18",
      time: "10:00",
      type: "Strategy Session",
      location: "Innovation Lab",
    },
    {
      id: 3,
      startup: "EduTech Africa",
      founder: "Sara Ahmed",
      date: "2024-12-20",
      time: "16:00",
      type: "Pitch Practice",
      location: "Virtual Meeting",
    },
  ];

  const feedbackRequests = [
    {
      id: 1,
      startup: "EthioPay Solutions",
      type: "Business Plan Review",
      submittedAt: "2024-12-12",
      priority: "high",
      description: "Review updated business plan for Series A funding round",
    },
    {
      id: 2,
      startup: "HealthConnect Ethiopia",
      type: "Market Analysis",
      submittedAt: "2024-12-11",
      priority: "medium",
      description: "Feedback on market research and competitive analysis",
    },
  ];

  const availabilitySlots = [
    { day: "Monday", slots: ["09:00-10:00", "14:00-15:00", "16:00-17:00"] },
    { day: "Tuesday", slots: ["10:00-11:00", "15:00-16:00"] },
    { day: "Wednesday", slots: ["09:00-10:00", "11:00-12:00", "14:00-15:00"] },
    { day: "Thursday", slots: ["13:00-14:00", "16:00-17:00"] },
    { day: "Friday", slots: ["09:00-10:00", "10:00-11:00"] },
  ];

  const getStatusColor = (status: string) => {
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
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
                <Button className="bg-aau-blue hover:bg-aau-blue/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="startups">Assigned Startups</TabsTrigger>
              <TabsTrigger value="meetings">Meetings</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
            </TabsList>

            {/* Assigned Startups Tab */}
            <TabsContent value="startups" className="space-y-6">
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      {upcomingMeetings.length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Scheduled sessions
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Pending Feedback
                    </CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-aau-blue">
                      {feedbackRequests.length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Awaiting review
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Startup Cards */}
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Loading assigned startups...</p>
                  </div>
                ) : assignedStartups.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No assigned startups yet.</p>
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
                            <AvatarImage
                              src={startup.avatar || "/placeholder.svg"}
                              alt={startup.name}
                            />
                            <AvatarFallback className="bg-aau-blue text-white">
                              {startup.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">
                              {startup.name}
                            </CardTitle>
                            <CardDescription>
                              Founded by {startup.founder} • {startup.sector} •{" "}
                              {startup.stage}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge className={getStatusColor(startup.status)}>
                          {startup.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">
                            Overall Progress
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {startup.progress}%
                          </span>
                        </div>
                        <Progress value={startup.progress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Last Meeting:
                          </span>
                          <div className="font-medium">
                            {new Date(startup.lastMeeting).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Next Meeting:
                          </span>
                          <div className="font-medium">
                            {new Date(startup.nextMeeting).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewStartupDetails(startup)}
                        >
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Send Message
                        </Button>
                        <Button
                          size="sm"
                          className="bg-aau-blue hover:bg-aau-blue/90"
                        >
                          Schedule Meeting
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
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Upcoming Meetings</CardTitle>
                      <CardDescription>
                        Your scheduled mentoring sessions
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/bookings">
                        View Calendar
                        <ArrowUpRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingMeetings.map((meeting) => (
                      <div
                        key={meeting.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 bg-aau-blue/10 rounded-full flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-aau-blue" />
                          </div>
                          <div>
                            <h4 className="font-medium">{meeting.startup}</h4>
                            <p className="text-sm text-muted-foreground">
                              {meeting.type} with {meeting.founder}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(meeting.date).toLocaleDateString()} at{" "}
                              {meeting.time} • {meeting.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button
                            size="sm"
                            className="bg-aau-blue hover:bg-aau-blue/90"
                          >
                            Join Meeting
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Feedback Tab */}
            <TabsContent value="feedback" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Feedback Requests</CardTitle>
                  <CardDescription>
                    Review and provide feedback on startup submissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {feedbackRequests.map((request) => (
                      <div key={request.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{request.startup}</h4>
                            <p className="text-sm text-muted-foreground">
                              {request.type}
                            </p>
                          </div>
                          <Badge className={getPriorityColor(request.priority)}>
                            {request.priority} priority
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {request.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">
                            Submitted on{" "}
                            {new Date(request.submittedAt).toLocaleDateString()}
                          </p>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View Document
                            </Button>
                            <Button
                              size="sm"
                              className="bg-aau-blue hover:bg-aau-blue/90"
                            >
                              Provide Feedback
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Availability Tab */}
            <TabsContent value="availability" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Weekly Availability</CardTitle>
                      <CardDescription>
                        Manage your mentoring schedule and availability
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit Schedule
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {availabilitySlots.map((day, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="font-medium w-24">{day.day}</div>
                        <div className="flex-1 flex flex-wrap gap-2">
                          {day.slots.map((slot, slotIndex) => (
                            <Badge
                              key={slotIndex}
                              variant="outline"
                              className="text-xs"
                            >
                              {slot}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {day.slots.length} slots
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mentoring Statistics</CardTitle>
                  <CardDescription>
                    Your impact and engagement metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-aau-blue">24</div>
                      <div className="text-sm text-muted-foreground">
                        Total Sessions
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-aau-blue">
                        4.8
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Average Rating
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-aau-blue">18</div>
                      <div className="text-sm text-muted-foreground">
                        Hours This Month
                      </div>
                    </div>
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
