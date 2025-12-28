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
  ArrowRight,
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Featured Story Header */}
      <section className="py-8 px-4 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 space-y-3">
            <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight">
              Success Stories
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover how AAU students and alumni are transforming industries
              and building the future of Ethiopia.
            </p>
          </div>

          {/* Featured Card */}
          <Card className="overflow-hidden shadow-xl border-slate-200 hover:shadow-2xl transition-shadow duration-300">
            <div className="md:flex">
              <div className="md:w-1/2 relative group">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <div className="h-40 md:h-52 lg:h-56 relative overflow-hidden">
                  <img
                    src={stories[0].image || "/placeholder.svg"}
                    alt={stories[0].company}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  {/* Gradient Overlay for Text Clarity if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                  <div className="absolute bottom-4 left-4 z-20">
                    <Badge className="bg-white/90 text-primary hover:bg-white backdrop-blur-md border-none shadow-sm px-3 py-1 text-sm font-bold">
                      Featured
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 p-6 flex flex-col justify-center bg-white">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-14 w-14 border-2 border-slate-100 shadow-sm">
                      <AvatarImage
                        src={stories[0].founderAvatar || "/placeholder.svg"}
                        alt={stories[0].founder}
                      />
                      <AvatarFallback className="bg-primary text-white font-bold">
                        {stories[0].founder
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-lg text-slate-900 leading-none mb-1">
                        {stories[0].founder}
                      </p>
                      <p className="text-sm text-slate-500 font-medium">
                        Founder,{" "}
                        <span className="text-primary">
                          {stories[0].company}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge
                        variant="secondary"
                        className="bg-blue-50 text-primary hover:bg-blue-100 border-none font-medium"
                      >
                        {stories[0].category}
                      </Badge>
                      <span className="text-sm text-slate-400 font-medium">
                        {stories[0].readTime}
                      </span>
                    </div>

                    <h2 className="text-3xl font-bold text-slate-900 mb-3 leading-tight hover:text-primary transition-colors cursor-pointer">
                      <Link href={`/stories/${stories[0].id}`}>
                        {stories[0].title}
                      </Link>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {stories[0].excerpt}
                    </p>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-6 py-5 border-y border-slate-100">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="font-bold text-slate-900 text-lg">
                        {stories[0].metrics.revenue}
                      </div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                        Revenue
                      </div>
                    </div>
                    <div className="text-center border-l border-slate-100">
                      <div className="flex items-center justify-center mb-2">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div className="font-bold text-slate-900 text-lg">
                        {stories[0].metrics.employees}
                      </div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                        Employees
                      </div>
                    </div>
                    <div className="text-center border-l border-slate-100">
                      <div className="flex items-center justify-center mb-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                      </div>
                      <div className="font-bold text-slate-900 text-lg">
                        {stories[0].metrics.funding}
                      </div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                        Funding
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center text-sm text-slate-500 font-medium">
                      <CalendarDays className="h-4 w-4 mr-2 text-slate-400" />
                      {new Date(stories[0].publishDate).toLocaleDateString()}
                    </div>
                    <Button
                      className="bg-primary hover:bg-blue-800 text-white shadow-md font-semibold px-6"
                      asChild
                    >
                      <Link href={`/stories/${stories[0].id}`}>
                        Read Full Story
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* More Stories Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-3">
                More Success Stories
              </h2>
              <p className="text-slate-600 text-lg">
                Get inspired by our thriving entrepreneur community
              </p>
            </div>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5 font-semibold"
            >
              View All Stories
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.slice(1).map((story) => (
              <Card
                key={story.id}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-slate-200 h-full flex flex-col"
              >
                <div className="relative overflow-hidden h-52">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.company}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-primary backdrop-blur-sm shadow-sm border-none font-bold">
                      {story.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-medium">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {new Date(story.publishDate).toLocaleDateString()}
                    <span className="text-slate-300">•</span>
                    <span>{story.readTime}</span>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                    <Link href={`/stories/${story.id}`}>{story.title}</Link>
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col justify-between">
                  <CardDescription className="text-slate-600 mb-6 line-clamp-3">
                    {story.excerpt}
                  </CardDescription>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-9 w-9 border border-slate-100">
                        <AvatarImage
                          src={story.founderAvatar || "/placeholder.svg"}
                          alt={story.founder}
                        />
                        <AvatarFallback className="bg-primary text-white text-xs font-bold">
                          {story.founder.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {story.founder}
                        </p>
                        <p className="text-xs text-slate-500 font-medium truncate max-w-[100px]">
                          {story.company}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-primary hover:text-primary hover:bg-primary/10 font-semibold -mr-2"
                      asChild
                    >
                      <Link href={`/stories/${story.id}`}>
                        Read <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-primary relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>

        <div className="container mx-auto max-w-7xl text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Ready to Write Your Own Success Story?
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed font-light">
              Join hundreds of entrepreneurs who have transformed their ideas
              into successful businesses with AAU Startup Center.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
              <Button
                size="lg"
                asChild
                className="bg-white text-primary hover:bg-blue-50 font-bold px-10 h-14 text-lg shadow-lg border-none"
              >
                <Link href="/apply">Apply Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent font-bold px-10 h-14 text-lg backdrop-blur-sm"
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
