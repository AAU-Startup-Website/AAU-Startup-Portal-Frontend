import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Users, ExternalLink, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Startup Pitch Night 2024",
      description: "Present your startup idea to a panel of investors and industry experts",
      date: "2024-12-15",
      time: "18:00",
      location: "AAU Main Auditorium",
      type: "Competition",
      capacity: 200,
      registered: 156,
      speaker: "Dr. Alemayehu Geda",
      speakerTitle: "Investment Director",
      speakerAvatar: "/placeholder.svg?height=40&width=40",
      image: "/startup-pitch-presentation-business.jpg",
    },
    {
      id: 2,
      title: "Entrepreneurship Masterclass",
      description: "Learn the fundamentals of building and scaling a successful startup",
      date: "2024-12-20",
      time: "14:00",
      location: "Innovation Hub",
      type: "Workshop",
      capacity: 50,
      registered: 32,
      speaker: "Sarah Johnson",
      speakerTitle: "Serial Entrepreneur",
      speakerAvatar: "/placeholder.svg?height=40&width=40",
      image: "/business-workshop-entrepreneurship-training.jpg",
    },
    {
      id: 3,
      title: "Tech Startup Networking Mixer",
      description: "Connect with fellow entrepreneurs, mentors, and potential co-founders",
      date: "2024-12-22",
      time: "17:30",
      location: "AAU Student Center",
      type: "Networking",
      capacity: 100,
      registered: 78,
      speaker: "Multiple Speakers",
      speakerTitle: "Industry Leaders",
      speakerAvatar: "/placeholder.svg?height=40&width=40",
      image: "/networking-event-business-professionals.jpg",
    },
  ]

  const pastEvents = [
    {
      id: 4,
      title: "FinTech Innovation Summit",
      description: "Exploring the future of financial technology in Ethiopia",
      date: "2024-11-10",
      attendees: 180,
      recordings: true,
      highlights: ["5 startup presentations", "2 panel discussions", "Networking session"],
    },
    {
      id: 5,
      title: "Women in Tech Leadership Forum",
      description: "Empowering female entrepreneurs in the technology sector",
      date: "2024-10-25",
      attendees: 120,
      recordings: true,
      highlights: ["Keynote by tech leaders", "Mentorship matching", "Skill workshops"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-muted/30 py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold">Events & Workshops</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our community events, workshops, and networking sessions to accelerate your entrepreneurial journey
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search events..." className="pl-10 h-12" />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="workshop">Workshops</SelectItem>
                  <SelectItem value="networking">Networking</SelectItem>
                  <SelectItem value="competition">Competitions</SelectItem>
                </SelectContent>
              </Select>
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
          <Tabs defaultValue="upcoming" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>

            {/* Upcoming Events */}
            <TabsContent value="upcoming" className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Upcoming Events</h2>
                  <p className="text-muted-foreground">{upcomingEvents.length} events scheduled</p>
                </div>
                <Button variant="outline">Suggest an Event</Button>
              </div>

              <div className="space-y-6">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{event.type}</Badge>
                                <Badge
                                  variant="secondary"
                                  className={
                                    event.registered >= event.capacity * 0.9
                                      ? "bg-red-100 text-red-800"
                                      : "bg-green-100 text-green-800"
                                  }
                                >
                                  {event.capacity - event.registered} spots left
                                </Badge>
                              </div>
                              <h3 className="text-xl font-bold">{event.title}</h3>
                              <p className="text-muted-foreground">{event.description}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-2" />
                              {new Date(event.date).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="h-4 w-4 mr-2" />
                              {event.time}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-2" />
                              {event.location}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={event.speakerAvatar || "/placeholder.svg"} alt={event.speaker} />
                                <AvatarFallback className="bg-aau-blue text-white">
                                  {event.speaker
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{event.speaker}</p>
                                <p className="text-sm text-muted-foreground">{event.speakerTitle}</p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Users className="h-4 w-4 mr-1" />
                                  {event.registered}/{event.capacity}
                                </div>
                                <div className="text-xs text-muted-foreground">registered</div>
                              </div>
                              <Button
                                className="bg-aau-blue hover:bg-aau-blue/90"
                                disabled={event.registered >= event.capacity}
                              >
                                {event.registered >= event.capacity ? "Full" : "Register"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Past Events */}
            <TabsContent value="past" className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Past Events</h2>
                  <p className="text-muted-foreground">Access recordings and resources from previous events</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pastEvents.map((event) => (
                  <Card key={event.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">Past Event</Badge>
                        <div className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString()}</div>
                      </div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription>{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Users className="h-4 w-4 mr-2" />
                          {event.attendees} attendees
                        </div>
                        {event.recordings && <Badge className="bg-green-100 text-green-800">Recording Available</Badge>}
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Event Highlights:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {event.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-center">
                              <span className="w-1 h-1 bg-aau-blue rounded-full mr-2"></span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-2 pt-2">
                        {event.recordings && (
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <ExternalLink className="h-3 w-3 mr-2" />
                            Watch Recording
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          View Resources
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

      {/* Newsletter Signup */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <Card className="max-w-2xl mx-auto text-center p-8">
            <CardHeader>
              <CardTitle className="text-2xl">Stay Updated</CardTitle>
              <CardDescription>
                Get notified about upcoming events, workshops, and networking opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input placeholder="Enter your email address" type="email" className="flex-1" />
                <Button className="bg-aau-blue hover:bg-aau-blue/90">Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">We'll never spam you. Unsubscribe at any time.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
