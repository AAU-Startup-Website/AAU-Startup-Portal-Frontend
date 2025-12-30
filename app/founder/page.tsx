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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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
  getMeetings,
  createMeeting,
  updateMeeting,
  deleteMeeting,
  getProfile,
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
  const [meetings, setMeetings] = useState<any[]>([]);
  const [meetingsLoading, setMeetingsLoading] = useState(false);
  const [createMeetingDialogOpen, setCreateMeetingDialogOpen] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [newMeeting, setNewMeeting] = useState({
    startup: "",
    mentor: "",
    title: "",
    description: "",
    schedule_date: "",
    link: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        console.log("Token:", token);
        if (token) {
          // Fetch current user profile first
          console.log("Fetching current user profile...");
          const userProfile = await getProfile(token);
          console.log("User profile:", userProfile);
          setCurrentUser(userProfile);

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

          // Fetch meetings for the founder
          console.log("Fetching meetings...");
          try {
            const meetingsData = await getMeetings(token);
            console.log("Meetings data:", meetingsData);
            setMeetings(meetingsData);
          } catch (meetingsError) {
            console.error("Failed to fetch meetings:", meetingsError);
            // Set empty meetings array - UI will handle gracefully
            setMeetings([]);
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

  const handleCreateMeeting = async () => {
    try {
      const token = getToken();
      if (token && currentUser) {
        // Validate required fields
        if (
          !newMeeting.startup ||
          !newMeeting.mentor ||
          !newMeeting.title ||
          !newMeeting.schedule_date
        ) {
          alert(
            "Please fill in all required fields (Startup, Mentor, Title, Date & Time)"
          );
          return;
        }

        // Validate link if provided
        if (newMeeting.link && !isValidUrl(newMeeting.link)) {
          alert("Please enter a valid URL for the meeting link");
          return;
        }

        const meetingData = {
          startup: parseInt(newMeeting.startup),
          mentor: parseInt(newMeeting.mentor),
          founder: currentUser.id,
          title: newMeeting.title,
          description: newMeeting.description || "",
          schedule_date: new Date(newMeeting.schedule_date).toISOString(),
          link: newMeeting.link || "",
        };

        console.log("Creating meeting:", meetingData);
        const createdMeeting = await createMeeting(token, meetingData);
        console.log("Meeting created:", createdMeeting);

        // Add to local state
        setMeetings([...meetings, createdMeeting]);

        // Reset form
        setNewMeeting({
          startup: "",
          mentor: "",
          title: "",
          description: "",
          schedule_date: "",
          link: "",
        });
        setCreateMeetingDialogOpen(false);
      }
    } catch (error) {
      console.error("Failed to create meeting:", error);
      alert("Failed to create meeting. Please try again.");
    }
  };

  const handleUpdateMeeting = async () => {
    if (!editingMeeting) return;

    try {
      const token = getToken();
      if (token && currentUser) {
        // Validate required fields
        if (
          !newMeeting.mentor ||
          !newMeeting.title ||
          !newMeeting.schedule_date
        ) {
          alert(
            "Please fill in all required fields (Mentor, Title, Date & Time)"
          );
          return;
        }

        // Validate link if provided
        if (newMeeting.link && !isValidUrl(newMeeting.link)) {
          alert("Please enter a valid URL for the meeting link");
          return;
        }

        const meetingData = {
          mentor: parseInt(newMeeting.mentor),
          founder: currentUser.id,
          title: newMeeting.title,
          description: newMeeting.description || "",
          schedule_date: new Date(newMeeting.schedule_date).toISOString(),
          link: newMeeting.link || "",
        };

        console.log("Updating meeting:", editingMeeting.id, meetingData);
        const updatedMeeting = await updateMeeting(
          token,
          editingMeeting.id,
          meetingData
        );
        console.log("Meeting updated:", updatedMeeting);

        // Update local state
        setMeetings(
          meetings.map((m) => (m.id === editingMeeting.id ? updatedMeeting : m))
        );

        // Reset form
        setNewMeeting({
          startup: "",
          mentor: "",
          title: "",
          description: "",
          schedule_date: "",
          link: "",
        });
        setEditingMeeting(null);
        setCreateMeetingDialogOpen(false);
      }
    } catch (error) {
      console.error("Failed to update meeting:", error);
      alert("Failed to update meeting. Please try again.");
    }
  };

  const handleDeleteMeeting = async (meetingId: number) => {
    if (!confirm("Are you sure you want to delete this meeting?")) return;

    try {
      const token = getToken();
      if (token) {
        console.log("Deleting meeting:", meetingId);
        await deleteMeeting(token, meetingId);
        console.log("Meeting deleted successfully");

        // Remove from local state
        setMeetings(meetings.filter((m) => m.id !== meetingId));
      }
    } catch (error) {
      console.error("Failed to delete meeting:", error);
      alert("Failed to delete meeting. Please try again.");
    }
  };

  const handleEditMeeting = (meeting: any) => {
    setEditingMeeting(meeting);
    setNewMeeting({
      startup: meeting.startup.toString(),
      mentor: meeting.mentor.toString(),
      title: meeting.title,
      description: meeting.description || "",
      schedule_date: new Date(meeting.schedule_date).toISOString().slice(0, 16),
      link: meeting.link || "",
    });
    setCreateMeetingDialogOpen(true);
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Mock data for founder's startup
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
                      My Startups
                    </CardTitle>
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-aau-blue">
                      {startups.length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Active ventures
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Completed Milestones
                    </CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-aau-blue">
                      {startups.reduce((total, startup) => {
                        // Count completed milestones for each startup
                        const startupMilestones = milestones.filter(
                          (m) => m.startup === startup.id
                        );
                        return (
                          total +
                          startupMilestones.filter((m) => m.completed).length
                        );
                      }, 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Across all startups
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Upcoming Meetings
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-aau-blue">
                      {
                        meetings.filter(
                          (meeting) =>
                            new Date(meeting.schedule_date) > new Date()
                        ).length
                      }
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Scheduled sessions
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      My Ideas
                    </CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-aau-blue">
                      {ideas.length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Submitted applications
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Progress Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Startup Progress Cards */}
                <Card>
                  <CardHeader>
                    <CardTitle>Startup Progress</CardTitle>
                    <CardDescription>
                      Current status of your ventures
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {startups.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          No startups yet. Start by submitting an idea!
                        </p>
                      </div>
                    ) : (
                      startups.map((startup) => {
                        const startupMilestones = milestones.filter(
                          (m) => m.startup === startup.id
                        );
                        const completedMilestones = startupMilestones.filter(
                          (m) => m.completed
                        ).length;
                        const totalMilestones = startupMilestones.length;
                        const progress =
                          totalMilestones > 0
                            ? (completedMilestones / totalMilestones) * 100
                            : 0;

                        return (
                          <div key={startup.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{startup.name}</h4>
                              <Badge variant="outline">
                                {startup.current_phase_details?.name ||
                                  "Phase 1"}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                {completedMilestones} of {totalMilestones}{" "}
                                milestones completed
                              </span>
                              <span className="font-medium">
                                {Math.round(progress)}%
                              </span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>
                        );
                      })
                    )}
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Latest updates and milestones
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {milestones
                        .filter((m) => m.completed)
                        .sort(
                          (a, b) =>
                            new Date(b.updated_at || b.due_date).getTime() -
                            new Date(a.updated_at || a.due_date).getTime()
                        )
                        .slice(0, 5)
                        .map((milestone) => {
                          const startup = startups.find(
                            (s) => s.id === milestone.startup
                          );
                          return (
                            <div
                              key={milestone.id}
                              className="flex items-start space-x-3"
                            >
                              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium">
                                  {milestone.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {startup?.name} • Completed{" "}
                                  {new Date(
                                    milestone.updated_at || milestone.due_date
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      {milestones.filter((m) => m.completed).length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">
                            No completed milestones yet.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => (window.location.href = "/apply")}
                >
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

                <Card
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setActiveTab("meetings")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-aau-gold/10 rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-aau-gold" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Schedule Meeting</h3>
                        <p className="text-sm text-muted-foreground">
                          Book time with mentors
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setActiveTab("startup")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">View Progress</h3>
                        <p className="text-sm text-muted-foreground">
                          Track startup milestones
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
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCreateMeetingDialogOpen(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Schedule Meeting
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/bookings">
                          View All Bookings
                          <ArrowUpRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {meetings.length === 0 ? (
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
                              <h4 className="font-medium">{meeting.title}</h4>
                              <p className="text-sm text-muted-foreground">
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
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditMeeting(meeting)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteMeeting(meeting.id)}
                            >
                              Delete
                            </Button>
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

      {/* Create/Edit Meeting Dialog */}
      <Dialog
        open={createMeetingDialogOpen}
        onOpenChange={setCreateMeetingDialogOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingMeeting ? "Edit Meeting" : "Schedule New Meeting"}
            </DialogTitle>
            <DialogDescription>
              {editingMeeting
                ? "Update the meeting details below."
                : "Schedule a new mentoring session with one of your assigned mentors."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="startup">Startup</Label>
              <Select
                value={newMeeting.startup}
                onValueChange={(value) =>
                  setNewMeeting({ ...newMeeting, startup: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a startup" />
                </SelectTrigger>
                <SelectContent>
                  {startups.map((startup) => (
                    <SelectItem key={startup.id} value={startup.id.toString()}>
                      {startup.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="mentor">Mentor</Label>
              <Input
                id="mentor"
                value={newMeeting.mentor}
                onChange={(e) =>
                  setNewMeeting({ ...newMeeting, mentor: e.target.value })
                }
                placeholder="Enter mentor name or ID"
              />
            </div>
            <div>
              <Label htmlFor="title">Meeting Title</Label>
              <Input
                id="title"
                value={newMeeting.title}
                onChange={(e) =>
                  setNewMeeting({ ...newMeeting, title: e.target.value })
                }
                placeholder="e.g., Weekly Progress Review"
              />
            </div>
            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={newMeeting.description}
                onChange={(e) =>
                  setNewMeeting({ ...newMeeting, description: e.target.value })
                }
                placeholder="Meeting agenda or notes"
              />
            </div>
            <div>
              <Label htmlFor="schedule_date">Date & Time</Label>
              <Input
                id="schedule_date"
                type="datetime-local"
                value={newMeeting.schedule_date}
                onChange={(e) =>
                  setNewMeeting({
                    ...newMeeting,
                    schedule_date: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="link">Meeting Link (Optional)</Label>
              <Input
                id="link"
                value={newMeeting.link}
                onChange={(e) =>
                  setNewMeeting({ ...newMeeting, link: e.target.value })
                }
                placeholder="https://meet.google.com/abc-defg"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setCreateMeetingDialogOpen(false);
                setEditingMeeting(null);
                setNewMeeting({
                  startup: "",
                  mentor: "",
                  title: "",
                  description: "",
                  schedule_date: "",
                  link: "",
                });
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={
                editingMeeting ? handleUpdateMeeting : handleCreateMeeting
              }
            >
              {editingMeeting ? "Update Meeting" : "Schedule Meeting"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
