import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, Clock, Users, Laptop, Presentation, Coffee, Search, Filter } from "lucide-react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function ResourcesPage() {
  const resources = [
    {
      id: 1,
      name: "Innovation Lab",
      type: "workspace",
      description: "Fully equipped workspace with high-speed internet and collaboration tools",
      capacity: "20 people",
      availability: "Available",
      features: ["WiFi", "Projector", "Whiteboard", "Coffee"],
      bookingUrl: "/resources/1/book",
    },
    {
      id: 2,
      name: "Conference Room A",
      type: "meeting",
      description: "Professional meeting space for presentations and client meetings",
      capacity: "12 people",
      availability: "Booked until 3 PM",
      features: ["Video Conferencing", "Projector", "Sound System"],
      bookingUrl: "/resources/2/book",
    },
    {
      id: 3,
      name: "3D Printer",
      type: "equipment",
      description: "Professional grade 3D printer for prototyping",
      capacity: "1 project at a time",
      availability: "Available",
      features: ["PLA/ABS Support", "High Resolution", "Large Build Volume"],
      bookingUrl: "/resources/3/book",
    },
  ]

  const guides = [
    {
      title: "Startup Fundamentals",
      description: "Essential guide to starting your first business",
      category: "Business",
      readTime: "15 min",
      downloads: 1250,
    },
    {
      title: "Funding Your Startup",
      description: "Complete guide to raising capital in Ethiopia",
      category: "Finance",
      readTime: "25 min",
      downloads: 890,
    },
    {
      title: "Legal Requirements",
      description: "Understanding business registration and compliance",
      category: "Legal",
      readTime: "20 min",
      downloads: 670,
    },
  ]

  return (
    <AuthGuard requiredRoles={["founder", "mentor"]}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-muted/30 py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-4xl font-bold">Resources & Tools</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Access workspaces, equipment, and knowledge resources to accelerate your startup journey
              </p>
            </div>

            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search resources..." className="pl-10 h-12" />
                </div>
                <Button className="h-12 px-6 bg-aau-blue hover:bg-aau-blue/90">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <Tabs defaultValue="physical" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="physical">Physical Resources</TabsTrigger>
                <TabsTrigger value="digital">Digital Tools</TabsTrigger>
                <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
              </TabsList>

              {/* Physical Resources */}
              <TabsContent value="physical" className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Physical Resources</h2>
                    <p className="text-muted-foreground">Workspaces, equipment, and meeting rooms</p>
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Resources</SelectItem>
                      <SelectItem value="workspace">Workspaces</SelectItem>
                      <SelectItem value="meeting">Meeting Rooms</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resources.map((resource) => (
                    <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <CardTitle className="flex items-center gap-2">
                              {resource.type === "workspace" && <Laptop className="h-5 w-5" />}
                              {resource.type === "meeting" && <Presentation className="h-5 w-5" />}
                              {resource.type === "equipment" && <Coffee className="h-5 w-5" />}
                              {resource.name}
                            </CardTitle>
                            <Badge
                              variant={resource.availability === "Available" ? "default" : "secondary"}
                              className={resource.availability === "Available" ? "bg-green-100 text-green-800" : ""}
                            >
                              {resource.availability}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription>{resource.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-2" />
                          {resource.capacity}
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium">Features:</p>
                          <div className="flex flex-wrap gap-1">
                            {resource.features.map((feature) => (
                              <Badge key={feature} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button className="w-full bg-aau-blue hover:bg-aau-blue/90" asChild>
                          <Link href={resource.bookingUrl}>
                            <Calendar className="h-4 w-4 mr-2" />
                            {resource.availability === "Available" ? "Book Now" : "View Schedule"}
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Digital Tools */}
              <TabsContent value="digital" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Digital Tools</h2>
                  <p className="text-muted-foreground">Software and online resources for your startup</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      name: "Business Plan Template",
                      description: "Comprehensive template for creating professional business plans",
                      category: "Planning",
                      access: "Free",
                    },
                    {
                      name: "Financial Model",
                      description: "Excel template for financial projections and modeling",
                      category: "Finance",
                      access: "Premium",
                    },
                    {
                      name: "Pitch Deck Template",
                      description: "PowerPoint template for investor presentations",
                      category: "Presentation",
                      access: "Free",
                    },
                  ].map((tool, i) => (
                    <Card key={i} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {tool.name}
                          <Badge variant={tool.access === "Free" ? "default" : "secondary"}>{tool.access}</Badge>
                        </CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{tool.category}</Badge>
                          <Button size="sm" className="bg-aau-blue hover:bg-aau-blue/90">
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Knowledge Base */}
              <TabsContent value="knowledge" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Knowledge Base</h2>
                  <p className="text-muted-foreground">Guides, tutorials, and educational resources</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {guides.map((guide, i) => (
                    <Card key={i} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{guide.title}</CardTitle>
                        <CardDescription>{guide.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {guide.readTime}
                          </div>
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-1" />
                            {guide.downloads} downloads
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{guide.category}</Badge>
                          <Button size="sm" className="bg-aau-blue hover:bg-aau-blue/90">
                            Read Guide
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </AuthGuard>
  )
}
