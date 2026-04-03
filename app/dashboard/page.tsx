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
  FileText,
  Award,
  ArrowUpRight,
  CheckCircle,
  XCircle,
  Eye,
  Loader2,
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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Card className="w-full max-w-md border-[#CAD6DE]">
          <CardHeader>
            <CardTitle className="text-[#E63946]">Access Denied</CardTitle>
            <CardDescription>
              You do not have permission to access this page. Admin privileges
              required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full bg-[#005081] hover:bg-[#015384]"
              onClick={() => router.push("/")}
            >
              Go Home
            </Button>
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

  // --- REAL DATA FOR CHARTS derived from ideas ---
  const SECTOR_COLORS = [
    "#005081", "#4378A0", "#E63946", "#21282D", "#6B7280",
    "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#14B8A6",
  ];

  // Monthly application trends — last 6 months
  const applicationData = (() => {
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
      return {
        month: d.toLocaleString("default", { month: "short" }),
        year: d.getFullYear(),
        monthIndex: d.getMonth(),
        applications: 0,
        approved: 0,
      };
    });
    (ideas as any[]).forEach((idea) => {
      const d = new Date(idea.created_at);
      const slot = months.find(
        (m) => m.monthIndex === d.getMonth() && m.year === d.getFullYear()
      );
      if (slot) {
        slot.applications += 1;
        if (idea.status === "approved") slot.approved += 1;
      }
    });
    return months.map(({ month, applications, approved }) => ({
      month,
      applications,
      approved,
    }));
  })();

  // Sector distribution from real industry field
  const sectorData = (() => {
    const counts: Record<string, number> = {};
    (ideas as any[]).forEach((idea) => {
      const key = idea.industry?.trim() || "Other";
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value], i) => ({
        name,
        value,
        color: SECTOR_COLORS[i % SECTOR_COLORS.length],
      }));
  })();

  // --- METRICS CALCULATION ---
  const recentIdeas = ideas
    .filter((idea: any) => idea.status === "pending")
    .slice(0, 5);

  const totalIdeas = ideas.length;
  const pendingIdeas = ideas.filter(
    (idea: any) => idea.status === "pending"
  ).length;
  const approvedIdeas = ideas.filter(
    (idea: any) => idea.status === "approved"
  ).length;

  const successRate =
    totalIdeas > 0 ? Math.round((approvedIdeas / totalIdeas) * 100) : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "rejected":
        return "bg-[#E63946]/10 text-[#E63946] border-[#E63946]/20";
      default:
        return "bg-[#CAD6DE]/30 text-[#21282D] border-[#CAD6DE]";
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#21282D] font-sans">
      {/* Header Section */}
      <section className="bg-[#CAD6DE]/30 py-12 px-4 border-b border-[#CAD6DE]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-[#005081]">
                Welcome, {user?.name || "Admin"}
              </h1>
              <p className="text-xl text-[#7D818B]">
                Overview of AAU Startups Portal performance and metrics
              </p>
            </div>
            <div className="flex space-x-2 bg-white p-1 rounded-lg border border-[#CAD6DE]">
              {["7d", "30d", "90d"].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className={
                    timeRange === range
                      ? "bg-[#005081] text-white hover:bg-[#015384]"
                      : "text-[#7D818B] hover:text-[#005081] hover:bg-[#CAD6DE]/20"
                  }
                >
                  {range === "30d"
                    ? "30 Days"
                    : range === "7d"
                    ? "7 Days"
                    : "90 Days"}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-[#CAD6DE] shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#7D818B]">
                  Total Ideas
                </CardTitle>
                <Building2 className="h-4 w-4 text-[#005081]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#21282D]">
                  {totalIdeas}
                </div>
                <p className="text-xs text-[#7D818B] mt-1">
                  <span className="text-green-600 font-medium">
                    +{pendingIdeas}
                  </span>{" "}
                  pending review
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#CAD6DE] shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#7D818B]">
                  Pending Review
                </CardTitle>
                <FileText className="h-4 w-4 text-[#005081]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#21282D]">
                  {pendingIdeas}
                </div>
                <p className="text-xs text-[#7D818B] mt-1">Awaiting approval</p>
              </CardContent>
            </Card>

            <Card className="border-[#CAD6DE] shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#7D818B]">
                  Approved Ideas
                </CardTitle>
                <Award className="h-4 w-4 text-[#005081]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#21282D]">
                  {approvedIdeas}
                </div>
                <p className="text-xs text-[#7D818B] mt-1">
                  Successfully approved
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#CAD6DE] shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#7D818B]">
                  Success Rate
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-[#005081]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#21282D]">
                  {successRate}%
                </div>
                <p className="text-xs text-[#7D818B] mt-1">Approval rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Applications Chart */}
            <Card className="border-[#CAD6DE] shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#005081]">
                  Application Trends
                </CardTitle>
                <CardDescription className="text-[#7D818B]">
                  Monthly applications and approval rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={applicationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#7D818B" />
                    <YAxis stroke="#7D818B" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        borderColor: "#CAD6DE",
                      }}
                    />
                    <Bar
                      dataKey="applications"
                      fill="#005081"
                      name="Applications"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="approved"
                      fill="#4378A0"
                      name="Approved"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Sector Distribution */}
            <Card className="border-[#CAD6DE] shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#005081]">
                  Startup Sectors
                </CardTitle>
                <CardDescription className="text-[#7D818B]">
                  Distribution of startups by sector
                </CardDescription>
              </CardHeader>
              <CardContent>
                {sectorData.length === 0 ? (
                  <div className="flex items-center justify-center h-[300px] text-[#7D818B]">
                    No sector data yet
                  </div>
                ) : (
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
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          borderColor: "#CAD6DE",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Ideas */}
          <Card className="border-[#CAD6DE] shadow-sm">
            <CardHeader className="border-b border-[#CAD6DE]/30">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[#005081]">Recent Ideas</CardTitle>
                  <CardDescription className="text-[#7D818B]">
                    Latest idea submissions requiring review
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[#005081] border-[#005081]/30 hover:bg-[#005081]/5"
                >
                  View All
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {loading ? (
                <div className="flex justify-center py-8 text-[#005081]">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading
                  ideas...
                </div>
              ) : recentIdeas.length === 0 ? (
                <div className="text-center py-8 text-[#7D818B]">
                  No pending ideas to review
                </div>
              ) : (
                <div className="space-y-4">
                  {recentIdeas.map((idea: any) => (
                    <div
                      key={idea.id}
                      className="flex items-center justify-between p-4 border border-[#CAD6DE] rounded-lg hover:border-[#005081]/30 transition-colors bg-white"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-[#005081]/10 rounded-full flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-[#005081]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#21282D]">
                            {idea.title}
                          </h4>
                          <p className="text-sm text-[#7D818B]">
                            by{" "}
                            <span className="text-[#005081] font-medium">
                              {idea.owner_details?.username || "Unknown"}
                            </span>{" "}
                            • {idea.industry || "N/A"} •{" "}
                            {idea.business_stage || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right hidden sm:block">
                          <Badge className={getStatusColor(idea.status)}>
                            {idea.status.replace("_", " ")}
                          </Badge>
                          <p className="text-xs text-[#7D818B] mt-1">
                            {new Date(idea.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-[#7D818B] hover:text-[#005081] border-[#CAD6DE]"
                            onClick={() => openViewDialog(idea)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50 border-[#CAD6DE]"
                            onClick={() => openApproveDialog(idea)}
                            disabled={processingId === idea.id}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-[#E63946] hover:text-red-700 hover:bg-red-50 border-[#CAD6DE]"
                            onClick={() => openRejectDialog(idea)}
                            disabled={processingId === idea.id}
                          >
                            <XCircle className="h-4 w-4" />
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
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-[#CAD6DE] group">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-[#005081]/10 rounded-lg flex items-center justify-center group-hover:bg-[#005081] transition-colors">
                    <FileText className="h-6 w-6 text-[#005081] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#005081]">
                      Review Ideas
                    </h3>
                    <p className="text-sm text-[#7D818B]">
                      {pendingIdeas} pending reviews
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer border-[#CAD6DE] group">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-[#4378A0]/10 rounded-lg flex items-center justify-center group-hover:bg-[#4378A0] transition-colors">
                    <Users className="h-6 w-6 text-[#4378A0] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#005081]">
                      Manage Users
                    </h3>
                    <p className="text-sm text-[#7D818B]">
                      User roles & permissions
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer border-[#CAD6DE] group">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                    <Award className="h-6 w-6 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#005081]">
                      View Analytics
                    </h3>
                    <p className="text-sm text-[#7D818B]">
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
        <DialogContent className="bg-white border-[#CAD6DE]">
          <DialogHeader>
            <DialogTitle className="text-[#005081]">Approve Idea</DialogTitle>
            <DialogDescription className="text-[#7D818B]">
              Are you sure you want to approve "{selectedIdea?.title}"? You can
              optionally add feedback.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="approve-feedback" className="text-[#21282D]">
                Feedback (Optional)
              </Label>
              <Textarea
                id="approve-feedback"
                placeholder="Add any feedback or notes for the founder..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
                className="border-[#CAD6DE] focus-visible:ring-[#005081]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowApproveDialog(false)}
              className="border-[#CAD6DE] text-[#7D818B]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleApprove}
              disabled={processingId === selectedIdea?.id}
              className="bg-[#005081] hover:bg-[#015384] text-white"
            >
              {processingId === selectedIdea?.id ? "Approving..." : "Approve"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="bg-white border-[#CAD6DE]">
          <DialogHeader>
            <DialogTitle className="text-[#E63946]">Reject Idea</DialogTitle>
            <DialogDescription className="text-[#7D818B]">
              Please provide feedback explaining why "{selectedIdea?.title}" is
              being rejected.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reject-feedback" className="text-[#21282D]">
                Rejection Reason *
              </Label>
              <Textarea
                id="reject-feedback"
                placeholder="Explain the reasons for rejection and provide constructive feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                required
                className="border-[#CAD6DE] focus-visible:ring-[#E63946]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRejectDialog(false)}
              className="border-[#CAD6DE] text-[#7D818B]"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={processingId === selectedIdea?.id || !feedback.trim()}
              className="bg-[#E63946] hover:bg-red-700"
            >
              {processingId === selectedIdea?.id ? "Rejecting..." : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Idea Details Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white border-[#CAD6DE]">
          <DialogHeader>
            <DialogTitle className="text-xl text-[#005081]">
              {selectedIdea?.title}
            </DialogTitle>
            <DialogDescription className="text-[#7D818B]">
              Submitted by{" "}
              <span className="font-medium text-[#21282D]">
                {selectedIdea?.owner_details?.username}
              </span>{" "}
              on{" "}
              {selectedIdea?.created_at
                ? new Date(selectedIdea.created_at).toLocaleDateString()
                : "N/A"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 p-4 bg-[#CAD6DE]/10 rounded-lg">
              <div>
                <Label className="text-xs uppercase text-[#7D818B] font-bold">
                  Industry
                </Label>
                <p className="text-sm font-medium text-[#21282D]">
                  {selectedIdea?.industry || "N/A"}
                </p>
              </div>
              <div>
                <Label className="text-xs uppercase text-[#7D818B] font-bold">
                  Business Stage
                </Label>
                <p className="text-sm font-medium text-[#21282D]">
                  {selectedIdea?.business_stage || "N/A"}
                </p>
              </div>
              <div>
                <Label className="text-xs uppercase text-[#7D818B] font-bold">
                  Team Size
                </Label>
                <p className="text-sm font-medium text-[#21282D]">
                  {selectedIdea?.team_size || "N/A"}
                </p>
              </div>
              <div>
                <Label className="text-xs uppercase text-[#7D818B] font-bold">
                  Status
                </Label>
                <div className="mt-1">
                  <Badge className={getStatusColor(selectedIdea?.status)}>
                    {selectedIdea?.status?.replace("_", " ") || "N/A"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-bold text-[#005081]">
                  Description
                </Label>
                <p className="text-sm mt-1 text-[#21282D] leading-relaxed">
                  {selectedIdea?.description || "N/A"}
                </p>
              </div>

              <div>
                <Label className="text-sm font-bold text-[#005081]">
                  Problem Statement
                </Label>
                <p className="text-sm mt-1 text-[#21282D] leading-relaxed">
                  {selectedIdea?.problem_statement || "N/A"}
                </p>
              </div>

              <div>
                <Label className="text-sm font-bold text-[#005081]">
                  Solution
                </Label>
                <p className="text-sm mt-1 text-[#21282D] leading-relaxed">
                  {selectedIdea?.solution || "N/A"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-bold text-[#005081]">
                    Target Audience
                  </Label>
                  <p className="text-sm mt-1 text-[#21282D]">
                    {selectedIdea?.target_audience || "N/A"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-bold text-[#005081]">
                    Technologies Used
                  </Label>
                  <p className="text-sm mt-1 text-[#21282D]">
                    {selectedIdea?.technologies_used || "N/A"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-bold text-[#005081]">
                    Revenue Model
                  </Label>
                  <p className="text-sm mt-1 text-[#21282D]">
                    {selectedIdea?.revenue_model || "N/A"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-bold text-[#005081]">
                    Funding Requirements
                  </Label>
                  <p className="text-sm mt-1 text-[#21282D]">
                    {selectedIdea?.funding_requirements || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-6 border-t border-[#CAD6DE] pt-4">
            <Button
              variant="outline"
              onClick={() => setShowViewDialog(false)}
              className="border-[#CAD6DE] text-[#7D818B]"
            >
              Close
            </Button>
            {selectedIdea?.status === "pending" && (
              <>
                <Button
                  className="bg-[#005081] hover:bg-[#015384] text-white"
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
                  className="bg-[#E63946] hover:bg-red-700"
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
