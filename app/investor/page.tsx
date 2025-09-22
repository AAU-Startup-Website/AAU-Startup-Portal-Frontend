"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Search, Filter, Heart, Eye, Calendar, ArrowUpRight, MapPin } from "lucide-react"
import Link from "next/link"

export default function InvestorDashboard() {
  const [activeTab, setActiveTab] = useState("discover")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSector, setSelectedSector] = useState("all")

  const featuredStartups = [
    {
      id: 1,
      name: "EthioPay Solutions",
      tagline: "Revolutionary mobile payment platform for rural Ethiopia",
      sector: "FinTech",
      stage: "Series A",
      fundingGoal: "$3M",
      raised: "$2.5M",
      valuation: "$15M",
      location: "Addis Ababa",
      founder: "Meron Tadesse",
      avatar: "/placeholder.svg?height=60&width=60",
      metrics: {
        users: "50K+",
        revenue: "$1.2M",
        growth: "+150%",
      },
      tags: ["Mobile Payments", "Financial Inclusion", "B2C"],
      featured: true,
    },
    {
      id: 2,
      name: "HealthConnect Ethiopia",
      tagline: "Telemedicine platform connecting rural patients with doctors",
      sector: "HealthTech",
      stage: "Seed",
      fundingGoal: "$1.5M",
      raised: "$800K",
      valuation: "$8M",
      location: "Addis Ababa",
      founder: "Daniel Bekele",
      avatar: "/placeholder.svg?height=60&width=60",
      metrics: {
        users: "25K+",
        revenue: "$400K",
        growth: "+200%",
      },
      tags: ["Telemedicine", "Healthcare Access", "B2B2C"],
      featured: false,
    },
    {
      id: 3,
      name: "AgriTech Solutions",
      tagline: "Smart farming solutions for Ethiopian agriculture",
      sector: "AgriTech",
      stage: "Early Traction",
      fundingGoal: "$2M",
      raised: "$500K",
      valuation: "$5M",
      location: "Bahir Dar",
      founder: "Sara Ahmed",
      avatar: "/placeholder.svg?height=60&width=60",
      metrics: {
        users: "10K+",
        revenue: "$200K",
        growth: "+180%",
      },
      tags: ["Smart Farming", "IoT", "B2B"],
      featured: false,
    },
  ]

  const myInterests = [
    {
      id: 1,
      startup: "EthioPay Solutions",
      expressedAt: "2024-12-10",
      status: "under_review",
      meetingScheduled: true,
      nextStep: "Due diligence review",
    },
    {
      id: 2,
      startup: "HealthConnect Ethiopia",
      expressedAt: "2024-12-08",
      status: "initial_contact",
      meetingScheduled: false,
      nextStep: "Schedule intro call",
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Ethiopian Startup Pitch Day",
      date: "2024-12-20",
      time: "14:00",
      location: "AAU Innovation Center",
      type: "pitch_event",
      startups: 8,
    },
    {
      id: 2,
      title: "FinTech Investment Forum",
      date: "2024-12-25",
      time: "09:00",
      location: "Sheraton Addis",
      type: "networking",
      startups: 15,
    },
  ]

  const getStageColor = (stage: string) => {
    const colors = {
      Ideation: "bg-gray-100 text-gray-800",
      MVP: "bg-blue-100 text-blue-800",
      "Early Traction": "bg-green-100 text-green-800",
      Seed: "bg-yellow-100 text-yellow-800",
      "Series A": "bg-orange-100 text-orange-800",
      "Series B": "bg-red-100 text-red-800",
      Growth: "bg-purple-100 text-purple-800",
    }
    return colors[stage as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getInterestStatusColor = (status: string) => {
    switch (status) {
      case "under_review":
        return "bg-yellow-100 text-yellow-800"
      case "initial_contact":
        return "bg-blue-100 text-blue-800"
      case "due_diligence":
        return "bg-orange-100 text-orange-800"
      case "negotiating":
        return "bg-purple-100 text-purple-800"
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
              <h1 className="text-4xl font-bold mb-2">Investor Dashboard</h1>
              <p className="text-xl text-muted-foreground">Discover and invest in promising Ethiopian startups</p>
            </div>
            <Button className="bg-aau-blue hover:bg-aau-blue/90" asChild>
              <Link href="/startups">
                <Search className="h-4 w-4 mr-2" />
                Browse All Startups
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
              <TabsTrigger value="discover">Discover</TabsTrigger>
              <TabsTrigger value="interests">My Interests</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            </TabsList>

            {/* Discover Tab */}
            <TabsContent value="discover" className="space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search startups..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={selectedSector} onValueChange={setSelectedSector}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="All sectors" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sectors</SelectItem>
                        <SelectItem value="fintech">FinTech</SelectItem>
                        <SelectItem value="healthtech">HealthTech</SelectItem>
                        <SelectItem value="edtech">EdTech</SelectItem>
                        <SelectItem value="agritech">AgriTech</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      More Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Investment Opportunities */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Investment Opportunities</h2>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/startups">
                      View All
                      <ArrowUpRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {featuredStartups.map((startup) => (
                    <Card
                      key={startup.id}
                      className={`hover:shadow-lg transition-shadow ${startup.featured ? "ring-2 ring-aau-gold" : ""}`}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={startup.avatar || "/placeholder.svg"} alt={startup.name} />
                              <AvatarFallback className="bg-aau-blue text-white">
                                {startup.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center space-x-2">
                                <CardTitle className="text-lg">{startup.name}</CardTitle>
                                {startup.featured && (
                                  <Badge className="bg-aau-gold text-aau-blue text-xs">Featured</Badge>
                                )}
                              </div>
                              <CardDescription>{startup.tagline}</CardDescription>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Badge className={getStageColor(startup.stage)}>{startup.stage}</Badge>
                          <Badge variant="outline">{startup.sector}</Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {startup.location}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 py-3 border-t border-b">
                          <div className="text-center">
                            <div className="text-sm font-semibold text-aau-blue">{startup.metrics.users}</div>
                            <div className="text-xs text-muted-foreground">Users</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-semibold text-green-600">{startup.metrics.revenue}</div>
                            <div className="text-xs text-muted-foreground">Revenue</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-semibold text-aau-blue">{startup.metrics.growth}</div>
                            <div className="text-xs text-muted-foreground">Growth</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Funding Progress</span>
                            <span className="font-medium">
                              {startup.raised} / {startup.fundingGoal}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-aau-blue h-2 rounded-full"
                              style={{
                                width: `${(Number.parseFloat(startup.raised.replace("$", "").replace("M", "")) / Number.parseFloat(startup.fundingGoal.replace("$", "").replace("M", ""))) * 100}%`,
                              }}
                            />
                          </div>
                          <div className="text-xs text-muted-foreground">Valuation: {startup.valuation}</div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {startup.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                            <Link href={`/startups/${startup.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Link>
                          </Button>
                          <Button size="sm" className="flex-1 bg-aau-blue hover:bg-aau-blue/90">
                            Express Interest
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* My Interests Tab */}
            <TabsContent value="interests" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Investment Interests</CardTitle>
                  <CardDescription>Track your expressed interests and investment pipeline</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myInterests.map((interest) => (
                      <div key={interest.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 bg-aau-blue/10 rounded-full flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-aau-blue" />
                          </div>
                          <div>
                            <h4 className="font-medium">{interest.startup}</h4>
                            <p className="text-sm text-muted-foreground">
                              Expressed interest on {new Date(interest.expressedAt).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-muted-foreground">Next: {interest.nextStep}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getInterestStatusColor(interest.status)}>
                            {interest.status.replace("_", " ")}
                          </Badge>
                          {interest.meetingScheduled && (
                            <Badge variant="outline" className="text-green-600">
                              Meeting Scheduled
                            </Badge>
                          )}
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Upcoming Investment Events</CardTitle>
                      <CardDescription>Pitch events, networking, and startup showcases</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/events">
                        View All Events
                        <ArrowUpRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 bg-aau-blue/10 rounded-full flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-aau-blue" />
                          </div>
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(event.date).toLocaleDateString()} at {event.time} • {event.location}
                            </p>
                            <p className="text-xs text-muted-foreground">{event.startups} startups participating</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{event.type.replace("_", " ")}</Badge>
                          <Button size="sm" className="bg-aau-blue hover:bg-aau-blue/90">
                            RSVP
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Portfolio Tab */}
            <TabsContent value="portfolio" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Investment Portfolio</CardTitle>
                  <CardDescription>Your current investments and their performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Investments Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start building your portfolio by expressing interest in promising startups.
                    </p>
                    <Button className="bg-aau-blue hover:bg-aau-blue/90" asChild>
                      <Link href="/startups">Discover Startups</Link>
                    </Button>
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
