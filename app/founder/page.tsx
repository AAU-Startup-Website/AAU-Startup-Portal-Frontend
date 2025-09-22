"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
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
} from "lucide-react"
import Link from "next/link"

export default function FounderDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for founder's startup
  const startupMetrics = [
    { month: "Jan", users: 1200, revenue: 5400 },
    { month: "Feb", users: 1800, revenue: 7200 },
    { month: "Mar", users: 2400, revenue: 9600 },
    { month: "Apr", users: 3200, revenue: 12800 },
    { month: "May", users: 4100, revenue: 16400 },
    { month: "Jun", users: 5000, revenue: 20000 },
  ]

  const applications = [
    {
      id: 1,
      title: "EthioPay Mobile Payment Platform",
      status: "approved",
      submittedAt: "2024-11-15",
      reviewedAt: "2024-11-28",
      feedback: "Excellent market opportunity and strong team. Approved for incubation program.",
    },
    {
      id: 2,
      title: "Rural Banking Extension",
      status: "under_review",
      submittedAt: "2024-12-01",
      reviewedAt: null,
      feedback: null,
    },
  ]

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
  ]

  const milestones = [
    { title: "Complete MVP Development", progress: 100, dueDate: "2024-11-30", status: "completed" },
    { title: "Launch Beta Testing", progress: 75, dueDate: "2024-12-15", status: "in_progress" },
    { title: "Secure Seed Funding", progress: 30, dueDate: "2025-01-31", status: "in_progress" },
    { title: "Hire 5 Team Members", progress: 0, dueDate: "2025-02-28", status: "pending" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "under_review":
        return "bg-yellow-100 text-yellow-800"
      case "needs_info":
        return "bg-orange-100 text-orange-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in_progress":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-gray-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-muted/30 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-4xl font-bold mb-2">Founder Dashboard</h1>
              <p className="text-xl text-muted-foreground">Track your startup journey and manage your applications</p>
            </div>
            <Button className="bg-aau-blue hover:bg-aau-blue/90" asChild>
              <Link href="/apply">
                <Plus className="h-4 w-4 mr-2" />
                New Application
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="applications">My Applications</TabsTrigger>
              <TabsTrigger value="startup">Startup Progress</TabsTrigger>
              <TabsTrigger value="meetings">Meetings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-aau-blue">5,000</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+22%</span> from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-aau-blue">$20,000</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+28%</span> from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Team Size</CardTitle>
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
                    <CardTitle className="text-sm font-medium">Funding Raised</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-aau-blue">$2.5M</div>
                    <p className="text-xs text-muted-foreground">Series A completed</p>
                  </CardContent>
                </Card>
              </div>

              {/* Growth Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Growth Metrics</CardTitle>
                  <CardDescription>User growth and revenue trends over the past 6 months</CardDescription>
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
                        <p className="text-sm text-muted-foreground">Apply for incubation</p>
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
                        <p className="text-sm text-muted-foreground">Reserve workspace</p>
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
                        <p className="text-sm text-muted-foreground">Get guidance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Applications Tab */}
            <TabsContent value="applications" className="space-y-6">
              <div className="space-y-4">
                {applications.map((application) => (
                  <Card key={application.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{application.title}</CardTitle>
                          <CardDescription>
                            Submitted on {new Date(application.submittedAt).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(application.status)}>
                          {application.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {application.feedback && (
                        <div className="bg-muted/50 p-4 rounded-lg mb-4">
                          <h4 className="font-medium mb-2">Reviewer Feedback</h4>
                          <p className="text-sm text-muted-foreground">{application.feedback}</p>
                          {application.reviewedAt && (
                            <p className="text-xs text-muted-foreground mt-2">
                              Reviewed on {new Date(application.reviewedAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      )}
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {application.status === "needs_info" && (
                          <Button size="sm" className="bg-aau-blue hover:bg-aau-blue/90">
                            Update Application
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Startup Progress Tab */}
            <TabsContent value="startup" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Startup Milestones</CardTitle>
                  <CardDescription>Track your progress towards key objectives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {milestones.map((milestone, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {getMilestoneIcon(milestone.status)}
                            <h4 className="font-medium">{milestone.title}</h4>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Due: {new Date(milestone.dueDate).toLocaleDateString()}
                          </div>
                        </div>
                        <Progress value={milestone.progress} className="h-2" />
                        <div className="text-sm text-muted-foreground">{milestone.progress}% complete</div>
                      </div>
                    ))}
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
                      <CardDescription>Your scheduled meetings and events</CardDescription>
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
                      <div key={meeting.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 bg-aau-blue/10 rounded-full flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-aau-blue" />
                          </div>
                          <div>
                            <h4 className="font-medium">{meeting.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(meeting.date).toLocaleDateString()} at {meeting.time}
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
  )
}
