import Link from "next/link";
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
import {
  CalendarDays,
  ExternalLink,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react";

export default function StoriesPage() {
  const stories = [
    {
      id: 1,
      title: "From Classroom to $1M Revenue: The EthioPay Journey",
      excerpt:
        "How three AAU computer science students built Ethiopia's leading mobile payment platform",
      company: "EthioPay Solutions",
      founder: "Meron Tadesse",
      founderAvatar: "/placeholder.svg?height=40&width=40",
      category: "FinTech",
      publishDate: "2024-11-15",
      readTime: "8 min read",
      metrics: {
        revenue: "$1.2M",
        employees: "25",
        funding: "Series A",
      },
      image: "/fintech-mobile-payment-app.jpg",
    },
    {
      id: 2,
      title: "Revolutionizing Agriculture with AI: AgriSmart's Success Story",
      excerpt:
        "Helping Ethiopian farmers increase crop yields by 40% using machine learning and IoT",
      company: "AgriSmart Technologies",
      founder: "Daniel Bekele",
      founderAvatar: "/placeholder.svg?height=40&width=40",
      category: "AgTech",
      publishDate: "2024-11-10",
      readTime: "6 min read",
      metrics: {
        revenue: "$500K",
        employees: "15",
        funding: "Seed",
      },
      image: "/agriculture-technology-farming-ai.jpg",
    },
    {
      id: 3,
      title: "Building Ethiopia's First EdTech Unicorn: LearnHub's Rise",
      excerpt:
        "Transforming education access across Africa with innovative online learning platform",
      company: "LearnHub Africa",
      founder: "Sara Mohammed",
      founderAvatar: "/placeholder.svg?height=40&width=40",
      category: "EdTech",
      publishDate: "2024-11-05",
      readTime: "10 min read",
      metrics: {
        revenue: "$2.5M",
        employees: "50",
        funding: "Series B",
      },
      image: "/education-technology-online-learning-platform.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Featured Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Featured Story</h2>
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={stories[0].image || "/placeholder.svg"}
                    alt={stories[0].company}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={stories[0].founderAvatar || "/placeholder.svg"}
                          alt={stories[0].founder}
                        />
                        <AvatarFallback className="bg-aau-blue text-white">
                          {stories[0].founder
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{stories[0].founder}</p>
                        <p className="text-sm text-muted-foreground">
                          Founder, {stories[0].company}
                        </p>
                      </div>
                    </div>

                    <div>
                      <Badge variant="outline" className="mb-3">
                        {stories[0].category}
                      </Badge>
                      <h2 className="text-2xl font-bold mb-3">
                        {stories[0].title}
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        {stories[0].excerpt}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 py-4 border-y">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <DollarSign className="h-4 w-4 text-aau-gold" />
                        </div>
                        <div className="font-semibold">
                          {stories[0].metrics.revenue}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Revenue
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Users className="h-4 w-4 text-aau-blue" />
                        </div>
                        <div className="font-semibold">
                          {stories[0].metrics.employees}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Employees
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="font-semibold">
                          {stories[0].metrics.funding}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Funding
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4 mr-2" />
                        {new Date(
                          stories[0].publishDate
                        ).toLocaleDateString()}{" "}
                        • {stories[0].readTime}
                      </div>
                      <Button className="bg-aau-blue hover:bg-aau-blue/90">
                        Read Full Story
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* More Stories */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">More Success Stories</h2>
              <p className="text-muted-foreground">
                Get inspired by our entrepreneur community
              </p>
            </div>
            <Button variant="outline">View All Stories</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stories.slice(1).map((story) => (
              <Card
                key={story.id}
                className="hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="aspect-video">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.company}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline">{story.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarDays className="h-3 w-3 mr-1" />
                      {new Date(story.publishDate).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{story.title}</CardTitle>
                  <CardDescription>{story.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={story.founderAvatar || "/placeholder.svg"}
                          alt={story.founder}
                        />
                        <AvatarFallback className="bg-aau-blue text-white text-xs">
                          {story.founder
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{story.founder}</p>
                        <p className="text-xs text-muted-foreground">
                          {story.company}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-aau-blue text-white">
        <div className="container mx-auto max-w-7xl text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl opacity-90">
              Join hundreds of entrepreneurs who have transformed their ideas
              into successful businesses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="bg-aau-gold text-aau-blue hover:bg-aau-gold/90"
              >
                <Link href="/apply">Apply Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white text-white hover:text-aau-blue bg-transparent"
              >
                <Link href="/cofounders">Find Co-founders</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
