"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ExternalLink,
  Filter,
  Search,
  Bell,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EventsPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");

  const upcomingEvents = [
    {
      id: 1,
      title: "Startup Pitch Night 2024",
      description:
        "Present your startup idea to a panel of investors and industry experts",
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
      description:
        "Learn the fundamentals of building and scaling a successful startup",
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
      description:
        "Connect with fellow entrepreneurs, mentors, and potential co-founders",
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
  ];

  const pastEvents = [
    {
      id: 4,
      title: "FinTech Innovation Summit",
      description: "Exploring the future of financial technology in Ethiopia",
      date: "2024-11-10",
      attendees: 180,
      recordings: true,
      highlights: [
        "5 startup presentations",
        "2 panel discussions",
        "Networking session",
      ],
    },
    {
      id: 5,
      title: "Women in Tech Leadership Forum",
      description: "Empowering female entrepreneurs in the technology sector",
      date: "2024-10-25",
      attendees: 120,
      recordings: true,
      highlights: [
        "Keynote by tech leaders",
        "Mentorship matching",
        "Skill workshops",
      ],
    },
  ];

  const filteredUpcoming = useMemo(() => {
    const q = query.trim().toLowerCase();
    return upcomingEvents.filter((e) => {
      const matchesQuery =
        !q ||
        e.title.toLowerCase().includes(q) ||
        (e.description && e.description.toLowerCase().includes(q)) ||
        (e.speaker && e.speaker.toLowerCase().includes(q));

      const matchesType =
        type === "all" || e.type.toLowerCase() === type.toLowerCase();

      return matchesQuery && matchesType;
    });
  }, [query, type, upcomingEvents]);

  const filteredPast = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pastEvents.filter((e) => {
      return (
        !q ||
        e.title.toLowerCase().includes(q) ||
        (e.description && e.description.toLowerCase().includes(q))
      );
    });
  }, [query, pastEvents]);

  return (
    // Background: White, Text: Dark Charcoal
    <div className="min-h-screen bg-white text-[#21282D] font-sans">
      {/* Header */}
      <section className="bg-[#CAD6DE]/30 border-b border-[#CAD6DE] py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-3 mb-8">
            {/* Primary Blue Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#005081] tracking-tight">
              Events & Workshops
            </h1>
            {/* Muted Gray Text */}
            <p className="text-lg text-[#7D818B] max-w-2xl mx-auto">
              Join our community events, workshops, and networking sessions to
              accelerate your entrepreneurial journey.
            </p>
          </div>

          {/* Search and Filters - Updated to match LibraryPage style */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-[#7D818B]" />
                <Input
                  placeholder="Search events..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 h-12 bg-white border-[#005081]/20 text-[#21282D] placeholder:text-[#7D818B] focus-visible:ring-[#005081]"
                />
              </div>

              {/* Select Dropdown */}
              <Select value={type} onValueChange={(v) => setType(v)}>
                <SelectTrigger className="w-full md:w-48 h-12 bg-white border-[#005081]/20 text-[#7D818B] focus:ring-[#005081]">
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="workshop">Workshops</SelectItem>
                  <SelectItem value="networking">Networking</SelectItem>
                  <SelectItem value="competition">Competitions</SelectItem>
                </SelectContent>
              </Select>

              {/* Filter Button - Primary Blue */}
              <Button className="h-12 px-8 bg-[#005081] hover:bg-[#015384] text-white font-semibold rounded-lg shadow-sm transition-colors">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <Tabs defaultValue="upcoming" className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#CAD6DE] pb-4">
              {/* Tabs List - Light Background */}
              <TabsList className="bg-[#CAD6DE]/20 p-1 rounded-lg">
                <TabsTrigger
                  value="upcoming"
                  className="px-6 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-[#005081] data-[state=active]:shadow-sm font-medium text-[#7D818B]"
                >
                  Upcoming Events
                </TabsTrigger>
                <TabsTrigger
                  value="past"
                  className="px-6 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-[#005081] data-[state=active]:shadow-sm font-medium text-[#7D818B]"
                >
                  Past Events
                </TabsTrigger>
              </TabsList>
              <Button
                variant="outline"
                className="border-[#005081] text-[#005081] hover:bg-[#005081]/5"
              >
                Suggest an Event
              </Button>
            </div>

            {/* Upcoming Events */}
            <TabsContent
              value="upcoming"
              className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-2 duration-300"
            >
              <div className="space-y-6">
                {filteredUpcoming.map((event) => (
                  <Card
                    key={event.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 border-[#CAD6DE] group bg-white"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3 relative overflow-hidden h-36 md:h-44 bg-[#21282D]">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-90"
                        />
                        <div className="absolute inset-0 bg-[#005081]/10 group-hover:bg-transparent transition-colors duration-500" />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-white/95 text-[#005081] backdrop-blur-sm shadow-sm border-none font-bold px-3 py-1">
                            {event.type}
                          </Badge>
                        </div>
                      </div>

                      <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg md:text-xl font-semibold text-[#21282D] group-hover:text-[#005081] transition-colors mb-2">
                                {event.title}
                              </h3>
                              <p className="text-sm md:text-base text-[#7D818B] line-clamp-2">
                                {event.description}
                              </p>
                            </div>
                            <Badge
                              variant="secondary"
                              className={
                                event.registered >= event.capacity * 0.9
                                  ? "bg-[#E63946]/10 text-[#E63946] border-[#E63946]/20" // Red for high capacity
                                  : "bg-green-50 text-green-700 border-green-100"
                              }
                            >
                              {event.capacity - event.registered} spots left
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-y border-[#CAD6DE]">
                            <div className="flex items-center text-sm text-[#7D818B]">
                              <Calendar className="h-4 w-4 mr-3 text-[#005081]" />
                              <span className="font-medium text-[#21282D]">
                                {new Date(event.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-[#7D818B]">
                              <Clock className="h-4 w-4 mr-3 text-[#005081]" />
                              <span className="font-medium text-[#21282D]">
                                {event.time}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-[#7D818B]">
                              <MapPin className="h-4 w-4 mr-3 text-[#005081]" />
                              <span className="font-medium text-[#21282D]">
                                {event.location}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10 border border-[#CAD6DE]">
                              <AvatarImage
                                src={event.speakerAvatar || "/placeholder.svg"}
                                alt={event.speaker}
                              />
                              <AvatarFallback className="bg-[#005081] text-white font-bold text-xs">
                                {event.speaker
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-[#21282D] text-sm md:text-base">
                                {event.speaker}
                              </p>
                              <p className="text-xs text-[#7D818B]">
                                {event.speakerTitle}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                              <div className="flex items-center text-sm font-semibold text-[#21282D] justify-end">
                                <Users className="h-4 w-4 mr-1.5 text-[#7D818B]" />
                                {event.registered} / {event.capacity}
                              </div>
                              <div className="text-xs text-[#7D818B]">
                                registered
                              </div>
                            </div>
                            <Button
                              className="bg-[#005081] hover:bg-[#015384] text-white font-bold shadow-md px-6 disabled:bg-[#CAD6DE] disabled:text-[#7D818B]"
                              disabled={event.registered >= event.capacity}
                            >
                              {event.registered >= event.capacity
                                ? "Full"
                                : "Register Now"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Past Events */}
            <TabsContent
              value="past"
              className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-2 duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPast.map((event) => (
                  <Card
                    key={event.id}
                    className="hover:shadow-lg transition-shadow border-[#CAD6DE] bg-white"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          variant="outline"
                          className="text-[#7D818B] border-[#CAD6DE]"
                        >
                          Past Event
                        </Badge>
                        <div className="text-sm font-medium text-[#7D818B]">
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                      </div>
                      <CardTitle className="text-xl text-[#005081]">
                        {event.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-[#7D818B]">
                        {event.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <div className="flex items-center justify-between text-sm py-3 border-y border-[#CAD6DE]">
                        <div className="flex items-center text-[#21282D]">
                          <Users className="h-4 w-4 mr-2 text-[#005081]" />
                          <span className="font-semibold">
                            {event.attendees}
                          </span>
                          <span className="ml-1">attendees</span>
                        </div>
                        {event.recordings && (
                          <Badge className="bg-green-50 text-green-700 border-green-100 hover:bg-green-100">
                            Recording Available
                          </Badge>
                        )}
                      </div>

                      <div>
                        <p className="text-xs font-bold text-[#21282D] uppercase tracking-wide mb-3">
                          Event Highlights
                        </p>
                        <ul className="space-y-2">
                          {event.highlights.map((highlight, i) => (
                            <li
                              key={i}
                              className="flex items-center text-sm text-[#7D818B]"
                            >
                              <span className="w-1.5 h-1.5 bg-[#005081] rounded-full mr-2.5"></span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-3 pt-2">
                        {event.recordings && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-[#005081]/20 text-[#005081] hover:bg-[#005081]/5"
                          >
                            <ExternalLink className="h-3.5 w-3.5 mr-2" />
                            Watch Recording
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="flex-1 text-[#7D818B] hover:text-[#005081] hover:bg-[#CAD6DE]/20"
                        >
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
      <section className="py-10 px-4 bg-[#CAD6DE]/30 border-t border-[#CAD6DE]">
        <div className="container mx-auto max-w-7xl">
          <Card className="max-w-3xl mx-auto text-center p-6 bg-white shadow-lg border border-[#005081]/10">
            <CardHeader className="pb-1">
              <div className="mx-auto w-12 h-12 bg-[#005081]/10 rounded-full flex items-center justify-center mb-3">
                <Bell className="h-6 w-6 text-[#005081]" />
              </div>
              <CardTitle className="text-2xl font-bold text-[#005081]">
                Stay Updated
              </CardTitle>
              <CardDescription className="text-base text-[#7D818B] mt-1">
                Get notified about upcoming events, workshops, and networking
                opportunities directly in your inbox.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-4 pb-3">
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  placeholder="Enter your email address"
                  type="email"
                  className="h-12 border-[#CAD6DE] focus-visible:ring-[#005081] text-[#21282D]"
                />
                <Button className="h-12 px-6 bg-[#005081] hover:bg-[#015384] text-white font-bold">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-[#7D818B] mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
