"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, TrendingDown, Users, Building, Target, CheckCircle, Star } from "lucide-react"

export default function AnalyticsPage() {
  const kpiData = {
    totalStartups: 156,
    activeStartups: 89,
    graduatedStartups: 23,
    acceptanceRate: 68.5,
    avgMentorLoad: 4.2,
    resourceUtilization: 78.3,
    monthlyGrowth: 12.5,
    fundingRaised: 2.4,
  }

  const startupsByStage = [
    { name: "Idea", value: 45, color: "#E6EEF7" },
    { name: "MVP", value: 38, color: "#CFAE70" },
    { name: "Growth", value: 28, color: "#003478" },
    { name: "Scale", value: 15, color: "#6B7280" },
  ]

  const startupsBySector = [
    { name: "FinTech", startups: 32, growth: 15 },
    { name: "AgriTech", startups: 28, growth: 8 },
    { name: "EdTech", startups: 24, growth: 12 },
    { name: "HealthTech", startups: 18, growth: 6 },
    { name: "E-commerce", startups: 16, growth: 10 },
    { name: "Other", startups: 38, growth: 5 },
  ]

  const monthlyApplications = [
    { month: "Jan", applications: 24, approved: 16, rejected: 8 },
    { month: "Feb", applications: 32, approved: 22, rejected: 10 },
    { month: "Mar", applications: 28, approved: 19, rejected: 9 },
    { month: "Apr", applications: 35, approved: 24, rejected: 11 },
    { month: "May", applications: 42, approved: 29, rejected: 13 },
    { month: "Jun", applications: 38, approved: 26, rejected: 12 },
  ]

  const resourceUsage = [
    { resource: "Meeting Rooms", utilization: 85, bookings: 124 },
    { resource: "Co-working Space", utilization: 72, bookings: 89 },
    { resource: "Equipment", utilization: 68, bookings: 45 },
    { resource: "Mentorship Hours", utilization: 91, bookings: 156 },
    { resource: "Workshop Space", utilization: 56, bookings: 34 },
  ]

  const mentorMetrics = [
    { name: "Dr. Samuel Getachew", startups: 6, rating: 4.8, hours: 24 },
    { name: "Prof. Almaz Bekele", startups: 5, rating: 4.9, hours: 20 },
    { name: "Dr. Yohannes Assefa", startups: 4, rating: 4.7, hours: 18 },
    { name: "Prof. Tekle Ferede", startups: 3, rating: 4.6, hours: 15 },
    { name: "Dr. Hanan Ahmed", startups: 4, rating: 4.8, hours: 19 },
  ]

  const cohortPerformance = [
    { cohort: "2024-A", startups: 25, active: 23, graduated: 0, success_rate: 92 },
    { cohort: "2023-B", startups: 28, active: 18, graduated: 8, success_rate: 93 },
    { cohort: "2023-A", startups: 32, active: 15, graduated: 15, success_rate: 94 },
    { cohort: "2022-B", startups: 30, active: 8, graduated: 20, success_rate: 93 },
    { cohort: "2022-A", startups: 35, active: 5, graduated: 28, success_rate: 94 },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-aau-deep-blue mb-2">Analytics Dashboard</h1>
            <p className="text-stone">Comprehensive insights and KPI tracking</p>
          </div>
          <div className="flex space-x-2">
            <Select defaultValue="6months">
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone">Total Startups</p>
                <p className="text-3xl font-bold">{kpiData.totalStartups}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+{kpiData.monthlyGrowth}%</span>
                </div>
              </div>
              <Building className="h-8 w-8 text-aau-deep-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone">Acceptance Rate</p>
                <p className="text-3xl font-bold">{kpiData.acceptanceRate}%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+2.3%</span>
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone">Avg Mentor Load</p>
                <p className="text-3xl font-bold">{kpiData.avgMentorLoad}</p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                  <span className="text-sm text-red-600">-0.5</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-aau-gold" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone">Resource Usage</p>
                <p className="text-3xl font-bold">{kpiData.resourceUtilization}%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+5.2%</span>
                </div>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="startups">Startups</TabsTrigger>
          <TabsTrigger value="mentors">Mentors</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="cohorts">Cohorts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Applications</CardTitle>
                <CardDescription>Application submissions and approval trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyApplications}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="applications" stackId="1" stroke="#003478" fill="#E6EEF7" />
                    <Area type="monotone" dataKey="approved" stackId="2" stroke="#CFAE70" fill="#CFAE70" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Startups by Stage</CardTitle>
                <CardDescription>Distribution across development stages</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={startupsByStage}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {startupsByStage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sector Performance</CardTitle>
              <CardDescription>Startup distribution and growth by sector</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={startupsBySector}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="startups" fill="#003478" />
                  <Bar dataKey="growth" fill="#CFAE70" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="startups" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-aau-deep-blue">{kpiData.activeStartups}</p>
                  <p className="text-sm text-stone">Active Startups</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{kpiData.graduatedStartups}</p>
                  <p className="text-sm text-stone">Graduated</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-aau-gold">${kpiData.fundingRaised}M</p>
                  <p className="text-sm text-stone">Funding Raised</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">94%</p>
                  <p className="text-sm text-stone">Success Rate</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Startup Growth Trends</CardTitle>
              <CardDescription>Monthly startup registrations and graduations</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyApplications}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="approved" stroke="#003478" strokeWidth={2} />
                  <Line type="monotone" dataKey="applications" stroke="#CFAE70" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mentor Performance</CardTitle>
              <CardDescription>Mentor workload and ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mentorMetrics.map((mentor) => (
                  <div key={mentor.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{mentor.name}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-stone">{mentor.startups} startups</span>
                        <span className="text-sm text-stone">{mentor.hours}h this month</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-aau-gold" />
                      <span className="font-semibold">{mentor.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resource Utilization</CardTitle>
              <CardDescription>Usage statistics for portal resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {resourceUsage.map((resource) => (
                  <div key={resource.resource} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{resource.resource}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-stone">{resource.bookings} bookings</span>
                        <Badge
                          variant={
                            resource.utilization > 80
                              ? "destructive"
                              : resource.utilization > 60
                                ? "default"
                                : "secondary"
                          }
                        >
                          {resource.utilization}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={resource.utilization} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cohorts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cohort Performance</CardTitle>
              <CardDescription>Performance tracking across different cohorts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cohortPerformance.map((cohort) => (
                  <div key={cohort.cohort} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{cohort.cohort}</h3>
                      <Badge variant="outline">{cohort.success_rate}% success rate</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-stone">Total Startups</p>
                        <p className="font-semibold">{cohort.startups}</p>
                      </div>
                      <div>
                        <p className="text-stone">Active</p>
                        <p className="font-semibold text-blue-600">{cohort.active}</p>
                      </div>
                      <div>
                        <p className="text-stone">Graduated</p>
                        <p className="font-semibold text-green-600">{cohort.graduated}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
