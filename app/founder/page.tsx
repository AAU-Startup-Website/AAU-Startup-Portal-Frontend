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
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { AuthGuard } from "@/components/auth/auth-guard";
import {
  Building2,
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  MessageSquare,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import {
  getIdeas,
  deleteIdea,
  getStartups,
  getMilestones,
  updateMilestone,
  getPhases,
} from "@/lib/api";
import { getToken } from "@/lib/auth";

export default function FounderDashboardPage() {
  return (
    <AuthGuard requiredRoles={["founder"]}>
      <FounderDashboard />
    </AuthGuard>
  );
}

function FounderDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [startups, setStartups] = useState<any[]>([]);
  const [selectedStartup, setSelectedStartup] = useState<any>(null);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [milestonesLoading, setMilestonesLoading] = useState(false);
  const [phases, setPhases] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        console.log("Token:", token);
        if (token) {
          // Fetch ideas
          console.log("Fetching ideas...");
          const ideasData = await getIdeas(token);
          console.log("Ideas data:", ideasData);
          setIdeas(ideasData);

          // Fetch all startups for the founder
          console.log("Fetching startups...");
          try {
            const startupsData = await getStartups(token);
            console.log("Startups data:", startupsData);
            setStartups(startupsData);
          } catch (startupsError) {
            console.error("Failed to fetch startups:", startupsError);
            // Mock data for testing
            setStartups([
              {
                id: 1,
                name: "My First Startup",
                current_phase: 1,
                phase_details: { id: 1, name: "Ideation", order: 1 },
              },
              {
                id: 2,
                name: "Second Venture",
                current_phase: 2,
                phase_details: { id: 2, name: "Development", order: 2 },
              },
            ]);
          }

          // Fetch phases
          console.log("Fetching phases...");
          try {
            const phasesData = await getPhases(token);
            console.log("Phases data:", phasesData);
            setPhases(phasesData);
          } catch (phasesError) {
            console.error("Failed to fetch phases:", phasesError);
            // Set empty phases array - UI will handle gracefully
            setPhases([]);
          }
        } else {
          console.log("No token found");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchMilestones = async () => {
      if (selectedStartup) {
        try {
          setMilestonesLoading(true);
          const token = getToken();
          if (token) {
            try {
              const milestonesData = await getMilestones(
                token,
                selectedStartup.id
              );
              console.log(
                "Milestones data for startup",
                selectedStartup.id,
                ":",
                milestonesData
              );
              setMilestones(milestonesData);
            } catch (milestonesError) {
              console.error("Failed to fetch milestones:", milestonesError);
              // Mock milestones for testing - different for each startup
              const mockMilestones = [
                {
                  id: selectedStartup.id * 10 + 1,
                  title: `Market Research for ${selectedStartup.name}`,
                  description:
                    "Conduct comprehensive market research and competitor analysis",
                  due_date: "2024-11-30",
                  completed: false,
                  startup: selectedStartup.id,
                  phase: 1,
                },
                {
                  id: selectedStartup.id * 10 + 2,
                  title: `MVP Development for ${selectedStartup.name}`,
                  description: "Build and test minimum viable product",
                  due_date: "2024-12-15",
                  completed: selectedStartup.id === 1, // First startup has completed milestone
                  startup: selectedStartup.id,
                  phase: 2,
                },
                {
                  id: selectedStartup.id * 10 + 3,
                  title: `User Testing for ${selectedStartup.name}`,
                  description: "Conduct user testing and gather feedback",
                  due_date: "2024-12-30",
                  completed: false,
                  startup: selectedStartup.id,
                  phase: 3,
                },
              ];
              setMilestones(mockMilestones);
            }
          }
        } catch (error) {
          console.error("Failed to fetch milestones:", error);
        } finally {
          setMilestonesLoading(false);
        }
      }
    };

    fetchMilestones();
  }, [selectedStartup]);

  const handleDeleteIdea = async (ideaId: number) => {
    if (!confirm("Are you sure you want to delete this idea?")) return;

    try {
      setDeletingId(ideaId);
      const token = getToken();
      if (token) {
        await deleteIdea(token, ideaId);
        setIdeas(ideas.filter((idea: any) => idea.id !== ideaId));
      }
    } catch (error) {
      console.error("Failed to delete idea:", error);
      alert("Failed to delete idea. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleMilestone = async (milestone: any) => {
    try {
      const token = getToken();
      if (token) {
        try {
          await updateMilestone(token, milestone.id, {
            completed: !milestone.completed,
          });
          console.log("Milestone updated successfully");
        } catch (updateError) {
          console.error("Failed to update milestone on server:", updateError);
          // Still update local state for UI feedback
        }
      }
      // Update local state
      setMilestones(
        milestones.map((m) =>
          m.id === milestone.id ? { ...m, completed: !m.completed } : m
        )
      );
    } catch (error) {
      console.error("Failed to update milestone:", error);
      alert("Failed to update milestone. Please try again.");
    }
  };

  // Mock data for founder's startup
  const startupMetrics = [
    { month: "Jan", users: 1200, revenue: 5400 },
    { month: "Feb", users: 1800, revenue: 7200 },
    { month: "Mar", users: 2400, revenue: 9600 },
    { month: "Apr", users: 3200, revenue: 12800 },
    { month: "May", users: 4100, revenue: 16400 },
    { month: "Jun", users: 5000, revenue: 20000 },
  ];

  const applications = [
    {
      id: 1,
      title: "EthioPay Mobile Payment Platform",
      status: "approved",
      submittedAt: "2024-11-15",
      reviewedAt: "2024-11-28",
      feedback:
        "Excellent market opportunity and strong team. Approved for incubation program.",
    },
    {
      id: 2,
      title: "Rural Banking Extension",
      status: "under_review",
      submittedAt: "2024-12-01",
      reviewedAt: null,
      feedback: null,
    },
  ];

  const upcomingMeetings = [
    {
      id: 1,
      title: "Mentor Session with Dr. Alemayehu",
      date: "2024-12-15",
      time: "14:00",
      type: "mentor",
    },
    {
      id: 2,
      title: "Investor Pitch Practice",
      date: "2024-12-18",
      time: "10:00",
      type: "presentation",
    },
    {
      id: 3,
      title: "Team Strategy Meeting",
      date: "2024-12-20",
      time: "09:00",
      type: "internal",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "under_review":
        return "bg-yellow-100 text-yellow-800";
      case "needs_info":
        return "bg-orange-100 text-orange-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-muted/30 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-4xl font-bold mb-2">Founder Dashboard</h1>
              <p className="text-xl text-muted-foreground">
                Track your startup journey and manage your applications
              </p>
            </div>
            <Button className="bg-aau-blue hover:bg-aau-blue/90" asChild>
              <Link href="/apply">
                <Plus className="h-4 w-4 mr-2" />
                New Idea
              </Link>
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
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="applications">My Ideas</TabsTrigger>
              <TabsTrigger value="startup">Startup Progress</TabsTrigger>
              <TabsTrigger value="meetings">Meetings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Users
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-aau-blue">
                      5,000
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+22%</span> from last
                      month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Monthly Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-aau-blue">
                      $20,000
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+28%</span> from last
                      month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Team Size
                    </CardTitle>
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-aau-blue">12</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-blue-600">+3</span> new hires
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Funding Raised
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-aau-blue">
                      $2.5M
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Series A completed
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Growth Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Growth Metrics</CardTitle>
                  <CardDescription>
                    User growth and revenue trends over the past 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={startupMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="users"
                        stackId="1"
                        stroke="#003DA5"
                        fill="#003DA5"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stackId="2"
                        stroke="#FFD700"
                        fill="#FFD700"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-aau-blue/10 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-aau-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Submit New Idea</h3>
                        <p className="text-sm text-muted-foreground">
                          Apply for incubation
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-aau-gold/10 rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-aau-gold" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Book Resources</h3>
                        <p className="text-sm text-muted-foreground">
                          Reserve workspace
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Contact Mentor</h3>
                        <p className="text-sm text-muted-foreground">
                          Get guidance
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Applications Tab */}
            <TabsContent value="applications" className="space-y-6">
              {loading ? (
                <div className="text-center py-8">Loading ideas...</div>
              ) : ideas.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      No ideas submitted yet.
                    </p>
                    <Button asChild>
                      <Link href="/apply">
                        <Plus className="h-4 w-4 mr-2" />
                        Submit Your First Idea
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {ideas.map((idea: any) => (
                    <Card key={idea.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              {idea.title}
                            </CardTitle>
                            <CardDescription>
                              Submitted on{" "}
                              {new Date(idea.created_at).toLocaleDateString()}
                            </CardDescription>
                          </div>
                          <Badge className={getStatusColor(idea.status)}>
                            {idea.status.replace("_", " ")}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          {idea.description}
                        </p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/apply?edit=${idea.id}`}>Edit</Link>
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteIdea(idea.id)}
                            disabled={deletingId === idea.id}
                          >
                            {deletingId === idea.id ? "Deleting..." : "Delete"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Startup Progress Tab */}
            <TabsContent value="startup" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Startup Milestones</CardTitle>
                  <CardDescription>
                    Track your progress towards key objectives
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">
                        Select Startup
                      </label>
                      <Select
                        value={selectedStartup?.id?.toString() || ""}
                        onValueChange={(value) => {
                          const startup = startups.find(
                            (s) => s.id.toString() === value
                          );
                          setSelectedStartup(startup || null);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose a startup to view milestones" />
                        </SelectTrigger>
                        <SelectContent>
                          {startups.map((startup) => (
                            <SelectItem
                              key={startup.id}
                              value={startup.id.toString()}
                            >
                              {startup.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedStartup && (
                      <>
                        {milestonesLoading ? (
                          <div className="text-center py-8">
                            Loading milestones...
                          </div>
                        ) : phases.length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">
                              Loading phases...
                            </p>
                          </div>
                        ) : milestones.length > 0 ? (
                          <div className="space-y-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold">
                                {Math.round(
                                  (milestones.filter((m) => m.completed)
                                    .length /
                                    milestones.length) *
                                    100
                                )}
                                %
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Complete
                              </p>
                              <Progress
                                value={
                                  (milestones.filter((m) => m.completed)
                                    .length /
                                    milestones.length) *
                                  100
                                }
                                className="mt-2"
                              />
                            </div>

                            {/* Group milestones by phase */}
                            {phases
                              .sort((a, b) => a.order - b.order)
                              .map((phase) => {
                                const phaseMilestones = milestones.filter(
                                  (m) => m.phase === phase.id
                                );
                                if (phaseMilestones.length === 0) return null;

                                return (
                                  <Card key={phase.id}>
                                    <CardHeader>
                                      <CardTitle className="flex items-center">
                                        <Badge
                                          variant="outline"
                                          className="mr-2"
                                        >
                                          Phase {phase.order}
                                        </Badge>
                                        {phase.name}
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="space-y-3">
                                        {phaseMilestones.map((milestone) => (
                                          <div
                                            key={milestone.id}
                                            className="flex items-start space-x-3 p-3 border rounded-lg"
                                          >
                                            <Checkbox
                                              checked={milestone.completed}
                                              onCheckedChange={() =>
                                                handleToggleMilestone(milestone)
                                              }
                                              className="mt-1"
                                            />
                                            <div className="flex-1 space-y-1">
                                              <div className="flex items-center space-x-2">
                                                <h4
                                                  className={`font-medium ${
                                                    milestone.completed
                                                      ? "line-through text-muted-foreground"
                                                      : ""
                                                  }`}
                                                >
                                                  {milestone.title}
                                                </h4>
                                                {milestone.completed && (
                                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                                )}
                                              </div>
                                              <p className="text-sm text-muted-foreground">
                                                {milestone.description}
                                              </p>
                                              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                                <div className="flex items-center">
                                                  <Calendar className="h-3 w-3 mr-1" />
                                                  Due:{" "}
                                                  {new Date(
                                                    milestone.due_date
                                                  ).toLocaleDateString()}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </CardContent>
                                  </Card>
                                );
                              })}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">
                              No milestones found for this startup.
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Meetings Tab */}
            <TabsContent value="meetings" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Upcoming Meetings</CardTitle>
                      <CardDescription>
                        Your scheduled meetings and events
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/bookings">
                        View All Bookings
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
                            <h4 className="font-medium">{meeting.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(meeting.date).toLocaleDateString()} at{" "}
                              {meeting.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{meeting.type}</Badge>
                          <Button variant="outline" size="sm">
                            Join
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
