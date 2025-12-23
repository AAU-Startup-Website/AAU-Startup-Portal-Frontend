"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthGuard } from "@/components/auth/auth-guard";
import { useAuth } from "@/components/auth/auth-context";
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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  Building2,
  TrendingUp,
  DollarSign,
  FileText,
  Award,
  ArrowUpRight,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";
import { getIdeas, approveIdea, rejectIdea } from "@/lib/api";
import { getToken } from "@/lib/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("30d");
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIdea, setSelectedIdea] = useState<any>(null);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [processingId, setProcessingId] = useState<number | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  // Check if user is admin
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You do not have permission to access this page. Admin privileges
              required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/")}>Go Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  useEffect(() => {
    fetchAllIdeas();
  }, []);

  const fetchAllIdeas = async () => {
    try {
      const token = getToken();
      if (token) {
        const ideasData = await getIdeas(token);
        setIdeas(ideasData);
      }
    } catch (error) {
      console.error("Failed to fetch ideas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!selectedIdea) return;

    try {
      setProcessingId(selectedIdea.id);
      const token = getToken();
      console.log("Token:", token);
      if (token) {
        await approveIdea(token, selectedIdea.id, feedback);
        await fetchAllIdeas(); // Refresh the list
        setShowApproveDialog(false);
        setSelectedIdea(null);
        setFeedback("");
      }
    } catch (error) {
      console.error("Failed to approve idea:", error);
      alert("Failed to approve idea. Please try again.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async () => {
    if (!selectedIdea || !feedback.trim()) {
      alert("Please provide feedback for rejection.");
      return;
    }

    try {
      setProcessingId(selectedIdea.id);
      const token = getToken();
      if (token) {
        await rejectIdea(token, selectedIdea.id, feedback);
        await fetchAllIdeas(); // Refresh the list
        setShowRejectDialog(false);
        setSelectedIdea(null);
        setFeedback("");
      }
    } catch (error) {
      console.error("Failed to reject idea:", error);
      alert("Failed to reject idea. Please try again.");
    } finally {
      setProcessingId(null);
    }
  };

  const openApproveDialog = (idea: any) => {
    setSelectedIdea(idea);
    setFeedback("");
    setShowApproveDialog(true);
  };

  const openRejectDialog = (idea: any) => {
    setSelectedIdea(idea);
    setFeedback("");
    setShowRejectDialog(true);
  };

  const openViewDialog = (idea: any) => {
    setSelectedIdea(idea);
    setShowViewDialog(true);
  };

  // Mock data for charts (keeping for now, can be updated with real data later)
  const applicationData = [
    { month: "Jan", applications: 45, approved: 12 },
    { month: "Feb", applications: 52, approved: 15 },
    { month: "Mar", applications: 48, approved: 18 },
    { month: "Apr", applications: 61, approved: 22 },
    { month: "May", applications: 55, approved: 19 },
    { month: "Jun", applications: 67, approved: 25 },
  ];

  const sectorData = [
    { name: "FinTech", value: 35, color: "#003DA5" },
    { name: "HealthTech", value: 25, color: "#FFD700" },
    { name: "EdTech", value: 20, color: "#10B981" },
    { name: "AgriTech", value: 15, color: "#F59E0B" },
    { name: "Other", value: 5, color: "#6B7280" },
  ];

  // Get recent ideas (pending status)
  const recentIdeas = ideas
    .filter((idea: any) => idea.status === "pending")
    .slice(0, 5);

  // Calculate metrics from ideas data
  const totalIdeas = ideas.length;
  const pendingIdeas = ideas.filter(
    (idea: any) => idea.status === "pending"
  ).length;
  const approvedIdeas = ideas.filter(
    (idea: any) => idea.status === "approved"
  ).length;
  const rejectedIdeas = ideas.filter(
    (idea: any) => idea.status === "rejected"
  ).length;
  const successRate =
    totalIdeas > 0 ? Math.round((approvedIdeas / totalIdeas) * 100) : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
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
              <h1 className="text-4xl font-bold mb-2">
                Welcome, {user?.name || "Admin"}!
              </h1>
              <p className="text-xl text-muted-foreground">
                Overview of AAU Startups Portal performance and metrics
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTimeRange("7d")}
              >
                7 Days
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTimeRange("30d")}
              >
                30 Days
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTimeRange("90d")}
              >
                90 Days
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Ideas
                </CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-aau-blue">
                  {totalIdeas}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+{pendingIdeas}</span>{" "}
                  pending review
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Review
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-aau-blue">
                  {pendingIdeas}
                </div>
                <p className="text-xs text-muted-foreground">
                  Awaiting approval
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Approved Ideas
                </CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-aau-blue">
                  {approvedIdeas}
                </div>
                <p className="text-xs text-muted-foreground">
                  Successfully approved
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Success Rate
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-aau-blue">
                  {successRate}%
                </div>
                <p className="text-xs text-muted-foreground">Approval rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Applications Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Application Trends</CardTitle>
                <CardDescription>
                  Monthly applications and approval rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={applicationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="applications"
                      fill="#003DA5"
                      name="Applications"
                    />
                    <Bar dataKey="approved" fill="#FFD700" name="Approved" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Sector Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Startup Sectors</CardTitle>
                <CardDescription>
                  Distribution of startups by sector
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sectorData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${((percent || 0) * 100).toFixed(0)}%`
                      }
                    >
                      {sectorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Ideas */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Ideas</CardTitle>
                  <CardDescription>
                    Latest idea submissions requiring review
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading ideas...</div>
              ) : recentIdeas.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No pending ideas to review
                </div>
              ) : (
                <div className="space-y-4">
                  {recentIdeas.map((idea: any) => (
                    <div
                      key={idea.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-aau-blue/10 rounded-full flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-aau-blue" />
                        </div>
                        <div>
                          <h4 className="font-medium">{idea.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            by {idea.owner_details?.username || "Unknown"} •{" "}
                            {idea.industry || "N/A"} •{" "}
                            {idea.business_stage || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <Badge className={getStatusColor(idea.status)}>
                            {idea.status.replace("_", " ")}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(idea.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openViewDialog(idea)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openApproveDialog(idea)}
                            disabled={processingId === idea.id}
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openRejectDialog(idea)}
                            disabled={processingId === idea.id}
                          >
                            <XCircle className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                    <h3 className="font-semibold">Review Ideas</h3>
                    <p className="text-sm text-muted-foreground">
                      {pendingIdeas} pending reviews
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-aau-gold/10 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-aau-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Manage Users</h3>
                    <p className="text-sm text-muted-foreground">
                      User roles & permissions
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">View Analytics</h3>
                    <p className="text-sm text-muted-foreground">
                      Ideas & approval metrics
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Approval Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Idea</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve "{selectedIdea?.title}"? You can
              optionally add feedback.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="approve-feedback">Feedback (Optional)</Label>
              <Textarea
                id="approve-feedback"
                placeholder="Add any feedback or notes for the founder..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowApproveDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleApprove}
              disabled={processingId === selectedIdea?.id}
            >
              {processingId === selectedIdea?.id ? "Approving..." : "Approve"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Idea</DialogTitle>
            <DialogDescription>
              Please provide feedback explaining why "{selectedIdea?.title}" is
              being rejected.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reject-feedback">Rejection Reason *</Label>
              <Textarea
                id="reject-feedback"
                placeholder="Explain the reasons for rejection and provide constructive feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRejectDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={processingId === selectedIdea?.id || !feedback.trim()}
            >
              {processingId === selectedIdea?.id ? "Rejecting..." : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Idea Details Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedIdea?.title}</DialogTitle>
            <DialogDescription>
              Submitted by {selectedIdea?.owner_details?.username} on{" "}
              {selectedIdea?.created_at
                ? new Date(selectedIdea.created_at).toLocaleDateString()
                : "N/A"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Industry</Label>
                <p className="text-sm">{selectedIdea?.industry || "N/A"}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Business Stage</Label>
                <p className="text-sm">
                  {selectedIdea?.business_stage || "N/A"}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Team Size</Label>
                <p className="text-sm">{selectedIdea?.team_size || "N/A"}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Status</Label>
                <Badge className={getStatusColor(selectedIdea?.status)}>
                  {selectedIdea?.status?.replace("_", " ") || "N/A"}
                </Badge>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Description</Label>
              <p className="text-sm mt-1">
                {selectedIdea?.description || "N/A"}
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium">Problem Statement</Label>
              <p className="text-sm mt-1">
                {selectedIdea?.problem_statement || "N/A"}
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium">Solution</Label>
              <p className="text-sm mt-1">{selectedIdea?.solution || "N/A"}</p>
            </div>

            <div>
              <Label className="text-sm font-medium">Target Audience</Label>
              <p className="text-sm mt-1">
                {selectedIdea?.target_audience || "N/A"}
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium">Technologies Used</Label>
              <p className="text-sm mt-1">
                {selectedIdea?.technologies_used || "N/A"}
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium">Revenue Model</Label>
              <p className="text-sm mt-1">
                {selectedIdea?.revenue_model || "N/A"}
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium">
                Funding Requirements
              </Label>
              <p className="text-sm mt-1">
                {selectedIdea?.funding_requirements || "N/A"}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>
              Close
            </Button>
            {selectedIdea?.status === "pending" && (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowViewDialog(false);
                    openApproveDialog(selectedIdea);
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setShowViewDialog(false);
                    openRejectDialog(selectedIdea);
                  }}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AuthGuard requiredRoles={["admin"]}>
      <AdminDashboard />
    </AuthGuard>
  );
}
