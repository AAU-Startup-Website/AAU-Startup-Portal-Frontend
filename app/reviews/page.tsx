"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, Star, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ReviewsPage() {
  const { toast } = useToast()
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [reviewFilter, setReviewFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const applications = [
    {
      id: "APP-001",
      startupName: "EthioPay",
      founder: "Abebe Kebede",
      email: "abebe@ethiopay.com",
      sector: "FinTech",
      stage: "MVP",
      submissionDate: "2024-01-15",
      status: "pending",
      score: null,
      reviewer: null,
      priority: "high",
      description: "Mobile payment solution for Ethiopian market",
    },
    {
      id: "APP-002",
      startupName: "AgriTech Solutions",
      founder: "Meron Tadesse",
      email: "meron@agritech.et",
      sector: "Agriculture",
      stage: "Idea",
      submissionDate: "2024-01-14",
      status: "under_review",
      score: 7.5,
      reviewer: "Dr. Samuel Getachew",
      priority: "medium",
      description: "Smart farming solutions using IoT sensors",
    },
    {
      id: "APP-003",
      startupName: "EduConnect",
      founder: "Dawit Haile",
      email: "dawit@educonnect.et",
      sector: "EdTech",
      stage: "Prototype",
      submissionDate: "2024-01-13",
      status: "approved",
      score: 8.2,
      reviewer: "Prof. Almaz Bekele",
      priority: "high",
      description: "Online learning platform for Ethiopian students",
    },
    {
      id: "APP-004",
      startupName: "HealthTracker",
      founder: "Sara Mohammed",
      email: "sara@healthtracker.et",
      sector: "HealthTech",
      stage: "Idea",
      submissionDate: "2024-01-12",
      status: "rejected",
      score: 4.1,
      reviewer: "Dr. Yohannes Assefa",
      priority: "low",
      description: "Digital health monitoring application",
    },
  ]

  const reviewers = [
    "Dr. Samuel Getachew",
    "Prof. Almaz Bekele",
    "Dr. Yohannes Assefa",
    "Prof. Tekle Ferede",
    "Dr. Hanan Ahmed",
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "under_review":
        return "bg-blue-100 text-blue-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredApplications = applications.filter((app) => {
    const matchesFilter = reviewFilter === "all" || app.status === reviewFilter
    const matchesSearch =
      app.startupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.founder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.sector.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleAssignReviewer = (appId: string, reviewer: string) => {
    toast({
      title: "Reviewer Assigned",
      description: `${reviewer} has been assigned to review application ${appId}`,
    })
  }

  const handleStatusChange = (appId: string, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Application ${appId} status changed to ${newStatus}`,
    })
  }

  const stats = {
    total: applications.length,
    pending: applications.filter((app) => app.status === "pending").length,
    underReview: applications.filter((app) => app.status === "under_review").length,
    approved: applications.filter((app) => app.status === "approved").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
    avgScore:
      applications.filter((app) => app.score).reduce((acc, app) => acc + (app.score || 0), 0) /
      applications.filter((app) => app.score).length,
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-aau-deep-blue mb-2">Application Review System</h1>
        <p className="text-stone">Manage and review startup applications</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone">Total Applications</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-aau-deep-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone">Under Review</p>
                <p className="text-2xl font-bold text-blue-600">{stats.underReview}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone">Avg Score</p>
                <p className="text-2xl font-bold text-aau-gold">{stats.avgScore.toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 text-aau-gold" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="applications" className="space-y-6">
        <TabsList>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="reviewers">Reviewers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-stone" />
                    <Input
                      placeholder="Search applications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={reviewFilter} onValueChange={setReviewFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Applications Table */}
          <Card>
            <CardHeader>
              <CardTitle>Applications</CardTitle>
              <CardDescription>Review and manage startup applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application</TableHead>
                    <TableHead>Founder</TableHead>
                    <TableHead>Sector</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Reviewer</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{app.startupName}</p>
                          <p className="text-sm text-stone">{app.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{app.founder}</p>
                          <p className="text-sm text-stone">{app.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{app.sector}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(app.status)}>{app.status.replace("_", " ")}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(app.priority)}>{app.priority}</Badge>
                      </TableCell>
                      <TableCell>
                        {app.score ? (
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-aau-gold mr-1" />
                            {app.score}
                          </div>
                        ) : (
                          <span className="text-stone">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {app.reviewer ? (
                          <span className="text-sm">{app.reviewer}</span>
                        ) : (
                          <Select onValueChange={(value) => handleAssignReviewer(app.id, value)}>
                            <SelectTrigger className="w-[150px]">
                              <SelectValue placeholder="Assign" />
                            </SelectTrigger>
                            <SelectContent>
                              {reviewers.map((reviewer) => (
                                <SelectItem key={reviewer} value={reviewer}>
                                  {reviewer}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedApplication(app)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>{app.startupName} - Application Review</DialogTitle>
                                <DialogDescription>
                                  Submitted on {app.submissionDate} by {app.founder}
                                </DialogDescription>
                              </DialogHeader>
                              {selectedApplication && (
                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium">Startup Name</Label>
                                      <p>{selectedApplication.startupName}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Founder</Label>
                                      <p>{selectedApplication.founder}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Sector</Label>
                                      <p>{selectedApplication.sector}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Stage</Label>
                                      <p>{selectedApplication.stage}</p>
                                    </div>
                                  </div>

                                  <Separator />

                                  <div>
                                    <Label className="text-sm font-medium">Description</Label>
                                    <p className="mt-1">{selectedApplication.description}</p>
                                  </div>

                                  <div className="space-y-4">
                                    <Label className="text-sm font-medium">Review Score</Label>
                                    <div className="flex items-center space-x-4">
                                      <Input
                                        type="number"
                                        min="0"
                                        max="10"
                                        step="0.1"
                                        placeholder="Score (0-10)"
                                        className="w-32"
                                      />
                                      <Button>Submit Score</Button>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <Label className="text-sm font-medium">Review Comments</Label>
                                    <Textarea placeholder="Add your review comments..." rows={4} />
                                  </div>

                                  <div className="flex space-x-2">
                                    <Button
                                      onClick={() => handleStatusChange(app.id, "approved")}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      Approve
                                    </Button>
                                    <Button
                                      onClick={() => handleStatusChange(app.id, "rejected")}
                                      variant="destructive"
                                    >
                                      Reject
                                    </Button>
                                    <Button
                                      onClick={() => handleStatusChange(app.id, "under_review")}
                                      variant="outline"
                                    >
                                      Request More Info
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviewers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reviewer Management</CardTitle>
              <CardDescription>Manage reviewer assignments and workload</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviewers.map((reviewer) => {
                  const assignedApps = applications.filter((app) => app.reviewer === reviewer)
                  const avgScore =
                    assignedApps.length > 0
                      ? assignedApps.reduce((acc, app) => acc + (app.score || 0), 0) / assignedApps.length
                      : 0

                  return (
                    <div key={reviewer} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{reviewer}</h3>
                        <p className="text-sm text-stone">{assignedApps.length} applications assigned</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Avg Score: {avgScore.toFixed(1)}</p>
                        <Badge variant="outline">{assignedApps.length} active</Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>This Month</span>
                    <span className="font-semibold">12 applications</span>
                  </div>
                  <Progress value={75} />
                  <div className="flex justify-between items-center">
                    <span>Last Month</span>
                    <span className="font-semibold">8 applications</span>
                  </div>
                  <Progress value={50} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sector Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["FinTech", "Agriculture", "EdTech", "HealthTech"].map((sector) => {
                    const count = applications.filter((app) => app.sector === sector).length
                    const percentage = (count / applications.length) * 100

                    return (
                      <div key={sector} className="space-y-2">
                        <div className="flex justify-between">
                          <span>{sector}</span>
                          <span>
                            {count} ({percentage.toFixed(0)}%)
                          </span>
                        </div>
                        <Progress value={percentage} />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
