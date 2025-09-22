"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Grid, List, Users, Calendar, MapPin, Heart, Share2, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default function StartupsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSector, setSelectedSector] = useState("all")
  const [selectedStage, setSelectedStage] = useState("all")
  const [selectedMentor, setSelectedMentor] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("newest")

  const startups = [
    {
      id: 1,
      name: "EthioPay Solutions",
      tagline: "Revolutionary mobile payment platform for rural Ethiopia",
      description:
        "Bridging the financial inclusion gap by providing secure, accessible mobile payment solutions tailored for Ethiopia's rural communities.",
      sector: "FinTech",
      stage: "Series A",
      founded: "2022",
      location: "Addis Ababa, Ethiopia",
      website: "https://ethiopay.com",
      logo: "/placeholder.svg?height=60&width=60",
      coverImage: "/fintech-mobile-payment-app.jpg",
      metrics: {
        revenue: "$1.2M",
        users: "50K+",
        growth: "+150%",
        funding: "$2.5M",
      },
      team: {
        size: 25,
        founder: "Meron Tadesse",
        founderAvatar: "/placeholder.svg?height=40&width=40",
      },
      mentor: {
        name: "Dr. Alemayehu Geda",
        assigned: true,
      },
      tags: ["Mobile Payments", "Financial Inclusion", "Rural Banking", "B2C"],
      featured: true,
      lastUpdated: "2024-12-01",
    },
    {
      id: 2,
      name: "AgriSmart Technologies",
      tagline: "AI-powered farming solutions for Ethiopian agriculture",
      description:
        "Helping Ethiopian farmers increase crop yields by 40% using machine learning, IoT sensors, and data analytics.",
      sector: "AgTech",
      stage: "Seed",
      founded: "2023",
      location: "Bahir Dar, Ethiopia",
      website: "https://agrismart.et",
      logo: "/placeholder.svg?height=60&width=60",
      coverImage: "/agriculture-technology-farming-ai.jpg",
      metrics: {
        revenue: "$500K",
        users: "2K+",
        growth: "+200%",
        funding: "$800K",
      },
      team: {
        size: 15,
        founder: "Daniel Bekele",
        founderAvatar: "/placeholder.svg?height=40&width=40",
      },
      mentor: {
        name: "Prof. Sarah Johnson",
        assigned: true,
      },
      tags: ["Agriculture", "AI/ML", "IoT", "Sustainability", "B2B"],
      featured: false,
      lastUpdated: "2024-11-28",
    },
    {
      id: 3,
      name: "LearnHub Africa",
      tagline: "Transforming education access across Africa",
      description:
        "Online learning platform providing quality education content in local languages, making learning accessible to millions across Africa.",
      sector: "EdTech",
      stage: "Series B",
      founded: "2021",
      location: "Addis Ababa, Ethiopia",
      website: "https://learnhub.africa",
      logo: "/placeholder.svg?height=60&width=60",
      coverImage: "/education-technology-online-learning-platform.jpg",
      metrics: {
        revenue: "$2.5M",
        users: "100K+",
        growth: "+180%",
        funding: "$5M",
      },
      team: {
        size: 50,
        founder: "Sara Mohammed",
        founderAvatar: "/placeholder.svg?height=40&width=40",
      },
      mentor: {
        name: "Michael Chen",
        assigned: true,
      },
      tags: ["Education", "E-learning", "Local Languages", "B2C", "B2B"],
      featured: true,
      lastUpdated: "2024-11-25",
    },
    {
      id: 4,
      name: "HealthConnect ET",
      tagline: "Telemedicine platform connecting rural patients with doctors",
      description:
        "Bridging healthcare gaps by connecting rural communities with qualified medical professionals through telemedicine technology.",
      sector: "HealthTech",
      stage: "MVP",
      founded: "2024",
      location: "Dire Dawa, Ethiopia",
      website: "https://healthconnect.et",
      logo: "/placeholder.svg?height=60&width=60",
      coverImage: "/placeholder.svg?key=health1",
      metrics: {
        revenue: "$50K",
        users: "500+",
        growth: "+300%",
        funding: "$200K",
      },
      team: {
        size: 8,
        founder: "Dr. Hanan Ahmed",
        founderAvatar: "/placeholder.svg?height=40&width=40",
      },
      mentor: {
        name: "Dr. Aisha Mohammed",
        assigned: true,
      },
      tags: ["Healthcare", "Telemedicine", "Rural Health", "B2C"],
      featured: false,
      lastUpdated: "2024-11-20",
    },
    {
      id: 5,
      name: "GreenEnergy Solutions",
      tagline: "Solar power solutions for Ethiopian businesses",
      description:
        "Providing affordable solar energy solutions to small and medium businesses, reducing energy costs and environmental impact.",
      sector: "CleanTech",
      stage: "Early Traction",
      founded: "2023",
      location: "Mekelle, Ethiopia",
      website: "https://greenenergy.et",
      logo: "/placeholder.svg?height=60&width=60",
      coverImage: "/placeholder.svg?key=solar1",
      metrics: {
        revenue: "$300K",
        users: "150+",
        growth: "+120%",
        funding: "$500K",
      },
      team: {
        size: 12,
        founder: "Tekle Gebremedhin",
        founderAvatar: "/placeholder.svg?height=40&width=40",
      },
      mentor: {
        name: "Engineer Yonas Tadesse",
        assigned: false,
      },
      tags: ["Solar Energy", "Clean Tech", "B2B", "Sustainability"],
      featured: false,
      lastUpdated: "2024-11-15",
    },
    {
      id: 6,
      name: "LogiTrack Ethiopia",
      tagline: "Smart logistics and supply chain management",
      description:
        "Optimizing supply chain operations for Ethiopian businesses through AI-powered logistics management and real-time tracking.",
      sector: "Logistics",
      stage: "Seed",
      founded: "2023",
      location: "Addis Ababa, Ethiopia",
      website: "https://logitrack.et",
      logo: "/placeholder.svg?height=60&width=60",
      coverImage: "/placeholder.svg?key=logistics1",
      metrics: {
        revenue: "$400K",
        users: "80+",
        growth: "+160%",
        funding: "$600K",
      },
      team: {
        size: 18,
        founder: "Biniam Haile",
        founderAvatar: "/placeholder.svg?height=40&width=40",
      },
      mentor: {
        name: "Logistics Expert",
        assigned: false,
      },
      tags: ["Logistics", "Supply Chain", "AI", "B2B"],
      featured: false,
      lastUpdated: "2024-11-10",
    },
  ]

  const sectors = ["All", "FinTech", "EdTech", "HealthTech", "AgTech", "CleanTech", "Logistics", "E-commerce"]
  const stages = ["All", "Ideation", "MVP", "Early Traction", "Seed", "Series A", "Series B", "Growth"]
  const mentors = ["All", "Assigned", "Unassigned"]

  const filteredStartups = startups.filter((startup) => {
    const matchesSearch =
      startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesSector = selectedSector === "all" || startup.sector === selectedSector
    const matchesStage = selectedStage === "all" || startup.stage === selectedStage
    const matchesMentor =
      selectedMentor === "all" ||
      (selectedMentor === "Assigned" && startup.mentor.assigned) ||
      (selectedMentor === "Unassigned" && !startup.mentor.assigned)

    return matchesSearch && matchesSector && matchesStage && matchesMentor
  })

  const sortedStartups = [...filteredStartups].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      case "oldest":
        return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
      case "name":
        return a.name.localeCompare(b.name)
      case "funding":
        return (
          Number.parseFloat(b.metrics.funding.replace(/[$MK,]/g, "")) -
          Number.parseFloat(a.metrics.funding.replace(/[$MK,]/g, ""))
        )
      default:
        return 0
    }
  })

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-muted/30 py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold">Startup Directory</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover innovative startups from the AAU ecosystem. Connect with entrepreneurs, explore opportunities,
              and track success stories.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-6xl mx-auto space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search startups, sectors, or technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={selectedSector} onValueChange={setSelectedSector}>
                  <SelectTrigger className="w-full sm:w-40 h-12">
                    <SelectValue placeholder="Sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector.toLowerCase()}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStage} onValueChange={setSelectedStage}>
                  <SelectTrigger className="w-full sm:w-40 h-12">
                    <SelectValue placeholder="Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map((stage) => (
                      <SelectItem key={stage} value={stage.toLowerCase()}>
                        {stage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedMentor} onValueChange={setSelectedMentor}>
                  <SelectTrigger className="w-full sm:w-40 h-12">
                    <SelectValue placeholder="Mentor" />
                  </SelectTrigger>
                  <SelectContent>
                    {mentors.map((mentor) => (
                      <SelectItem key={mentor} value={mentor.toLowerCase()}>
                        {mentor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results and Controls */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold">
                {sortedStartups.length} Startup{sortedStartups.length !== 1 ? "s" : ""} Found
              </h2>
              <p className="text-muted-foreground">{searchQuery && `Results for "${searchQuery}"`}</p>
            </div>

            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="funding">Funding Amount</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Featured Startups */}
          {sortedStartups.some((s) => s.featured) && (
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <span className="mr-2">Featured Startups</span>
                <Badge className="bg-aau-gold text-aau-blue">Spotlight</Badge>
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {sortedStartups
                  .filter((s) => s.featured)
                  .map((startup) => (
                    <Card
                      key={startup.id}
                      className="overflow-hidden border-2 border-aau-gold/20 hover:shadow-xl transition-shadow"
                    >
                      <div className="aspect-video relative">
                        <img
                          src={startup.coverImage || "/placeholder.svg"}
                          alt={startup.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-aau-gold text-aau-blue">Featured</Badge>
                        </div>
                        <div className="absolute top-4 right-4 flex gap-2">
                          <Button size="sm" variant="secondary" className="bg-white/90">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="secondary" className="bg-white/90">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={startup.logo || "/placeholder.svg"} alt={startup.name} />
                              <AvatarFallback className="bg-aau-blue text-white">
                                {startup.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-xl">{startup.name}</CardTitle>
                              <CardDescription className="font-medium">{startup.tagline}</CardDescription>
                            </div>
                          </div>
                          <Badge className={getStageColor(startup.stage)}>{startup.stage}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{startup.description}</p>

                        <div className="grid grid-cols-4 gap-4 text-center">
                          <div>
                            <div className="font-semibold text-aau-blue">{startup.metrics.revenue}</div>
                            <div className="text-xs text-muted-foreground">Revenue</div>
                          </div>
                          <div>
                            <div className="font-semibold text-aau-blue">{startup.metrics.users}</div>
                            <div className="text-xs text-muted-foreground">Users</div>
                          </div>
                          <div>
                            <div className="font-semibold text-green-600">{startup.metrics.growth}</div>
                            <div className="text-xs text-muted-foreground">Growth</div>
                          </div>
                          <div>
                            <div className="font-semibold text-aau-blue">{startup.metrics.funding}</div>
                            <div className="text-xs text-muted-foreground">Funding</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {startup.location}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {startup.team.size} team
                            </div>
                          </div>
                          <Button asChild className="bg-aau-blue hover:bg-aau-blue/90">
                            <Link href={`/startups/${startup.id}`}>
                              View Details
                              <ArrowUpRight className="h-4 w-4 ml-2" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}

          {/* All Startups */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">All Startups</h3>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedStartups
                  .filter((s) => !s.featured)
                  .map((startup) => (
                    <Card key={startup.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={startup.logo || "/placeholder.svg"} alt={startup.name} />
                              <AvatarFallback className="bg-aau-blue text-white text-sm">
                                {startup.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                              <CardTitle className="text-lg truncate">{startup.name}</CardTitle>
                              <CardDescription className="text-sm">{startup.sector}</CardDescription>
                            </div>
                          </div>
                          <Badge className={getStageColor(startup.stage)} variant="secondary">
                            {startup.stage}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-2">{startup.tagline}</p>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Revenue</span>
                            <span className="font-medium">{startup.metrics.revenue}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Users</span>
                            <span className="font-medium">{startup.metrics.users}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Growth</span>
                            <span className="font-medium text-green-600">{startup.metrics.growth}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Funding</span>
                            <span className="font-medium">{startup.metrics.funding}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {startup.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {startup.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{startup.tags.length - 3}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            Founded {startup.founded}
                          </div>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/startups/${startup.id}`}>View Profile</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedStartups
                  .filter((s) => !s.featured)
                  .map((startup) => (
                    <Card key={startup.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={startup.logo || "/placeholder.svg"} alt={startup.name} />
                              <AvatarFallback className="bg-aau-blue text-white">
                                {startup.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-3 mb-1">
                                <h3 className="font-semibold text-lg">{startup.name}</h3>
                                <Badge className={getStageColor(startup.stage)} variant="secondary">
                                  {startup.stage}
                                </Badge>
                                <Badge variant="outline">{startup.sector}</Badge>
                              </div>
                              <p className="text-muted-foreground mb-2">{startup.tagline}</p>
                              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {startup.location}
                                </div>
                                <div className="flex items-center">
                                  <Users className="h-3 w-3 mr-1" />
                                  {startup.team.size} team members
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  Founded {startup.founded}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-6">
                            <div className="text-right">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <div className="font-semibold text-aau-blue">{startup.metrics.revenue}</div>
                                  <div className="text-xs text-muted-foreground">Revenue</div>
                                </div>
                                <div>
                                  <div className="font-semibold text-aau-blue">{startup.metrics.users}</div>
                                  <div className="text-xs text-muted-foreground">Users</div>
                                </div>
                                <div>
                                  <div className="font-semibold text-green-600">{startup.metrics.growth}</div>
                                  <div className="text-xs text-muted-foreground">Growth</div>
                                </div>
                                <div>
                                  <div className="font-semibold text-aau-blue">{startup.metrics.funding}</div>
                                  <div className="text-xs text-muted-foreground">Funding</div>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <Button size="sm" asChild className="bg-aau-blue hover:bg-aau-blue/90">
                                <Link href={`/startups/${startup.id}`}>View Profile</Link>
                              </Button>
                              <div className="flex gap-1">
                                <Button size="sm" variant="ghost">
                                  <Heart className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Share2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-2">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button variant="default" className="bg-aau-blue">
                1
              </Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
