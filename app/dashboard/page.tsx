"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Users, Building2, TrendingUp, DollarSign, FileText, Award, ArrowUpRight } from "lucide-react"

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("30d")

  // Mock data for charts
  const applicationData = [
    { month: "Jan", applications: 45, approved: 12 },
    { month: "Feb", applications: 52, approved: 15 },
    { month: "Mar", applications: 48, approved: 18 },
    { month: "Apr", applications: 61, approved: 22 },
    { month: "May", applications: 55, approved: 19 },
    { month: "Jun", applications: 67, approved: 25 },
  ]

  const sectorData = [
    { name: "FinTech", value: 35, color: "#003DA5" },
    { name: "HealthTech", value: 25, color: "#FFD700" },
    { name: "EdTech", value: 20, color: "#10B981" },
    { name: "AgriTech", value: 15, color: "#F59E0B" },
    { name: "Other", value: 5, color: "#6B7280" },
  ]

  const recentApplications = [
    {
      id: 1,
      startup: "EthioPay Solutions",
      founder: "Meron Tadesse",
      sector: "FinTech",
      stage: "Series A",
      submittedAt: "2024-12-10",
      status: "under_review",
    },
    {
      id: 2,
      startup: "HealthConnect Ethiopia",
      founder: "Daniel Bekele",
      sector: "HealthTech",
      stage: "Seed",
      submittedAt: "2024-12-09",
      status: "approved",
    },
    {
      id: 3,
      startup: "EduTech Africa",
      founder: "Sara Ahmed",
      sector: "EdTech",
      stage: "MVP",
      submittedAt: "2024-12-08",
      status: "needs_info",
    },
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-muted/30 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-xl text-muted-foreground">Overview of AAU Startups Portal performance and metrics</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => setTimeRange("7d")}>
                7 Days
              </Button>
              <Button variant="outline" size="sm" onClick={() => setTimeRange("30d")}>
                30 Days
              </Button>
              <Button variant="outline" size="sm" onClick={() => setTimeRange("90d")}>
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
                <CardTitle className="text-sm font-medium">Total Startups</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-aau-blue">127</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-aau-blue">23</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-orange-600">+5</span> new this week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Funding</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-aau-blue">$12.5M</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+18%</span> from last quarter
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-aau-blue">68%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+3%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Applications Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Application Trends</CardTitle>
                <CardDescription>Monthly applications and approval rates</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={applicationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="applications" fill="#003DA5" name="Applications" />
                    <Bar dataKey="approved" fill="#FFD700" name="Approved" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Sector Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Startup Sectors</CardTitle>
                <CardDescription>Distribution of startups by sector</CardDescription>
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
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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

          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Latest startup applications requiring review</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-aau-blue/10 rounded-full flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-aau-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium">{application.startup}</h4>
                        <p className="text-sm text-muted-foreground">
                          by {application.founder} • {application.sector} • {application.stage}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <Badge className={getStatusColor(application.status)}>
                          {application.status.replace("_", " ")}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(application.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
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
                    <h3 className="font-semibold">Review Applications</h3>
                    <p className="text-sm text-muted-foreground">23 pending reviews</p>
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
                    <p className="text-sm text-muted-foreground">User roles & permissions</p>
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
                    <h3 className="font-semibold">Generate Reports</h3>
                    <p className="text-sm text-muted-foreground">Analytics & insights</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
