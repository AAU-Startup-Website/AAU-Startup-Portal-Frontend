import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Download,
  Search,
  Filter,
  Clock,
  Star,
  Eye,
  FileText,
  Video,
  Headphones,
  HelpCircle,
} from "lucide-react";

export default function LibraryPage() {
  const guides = [
    {
      id: 1,
      title: "Complete Startup Guide for Ethiopian Entrepreneurs",
      description:
        "Comprehensive guide covering everything from idea validation to scaling your business in the Ethiopian market",
      category: "Business Fundamentals",
      type: "PDF",
      readTime: "45 min",
      downloads: 2340,
      rating: 4.8,
      author: "Dr. Alemayehu Geda",
      publishDate: "2024-10-15",
      featured: true,
    },
    {
      id: 2,
      title: "Funding Landscape in Ethiopia",
      description:
        "Navigate the funding ecosystem, from angel investors to venture capital and government grants",
      category: "Funding",
      type: "PDF",
      readTime: "30 min",
      downloads: 1890,
      rating: 4.6,
      author: "Sarah Johnson",
      publishDate: "2024-11-01",
      featured: false,
    },
    {
      id: 3,
      title: "Legal Framework for Startups",
      description:
        "Understanding business registration, intellectual property, and compliance requirements",
      category: "Legal",
      type: "PDF",
      readTime: "25 min",
      downloads: 1560,
      rating: 4.7,
      author: "Legal Team",
      publishDate: "2024-09-20",
      featured: false,
    },
  ];

  const videos = [
    {
      id: 1,
      title: "Building Your MVP: A Step-by-Step Guide",
      description:
        "Learn how to build a minimum viable product that validates your business idea",
      duration: "32 min",
      views: 5600,
      category: "Product Development",
      instructor: "Michael Chen",
      thumbnail: "/mvp-development-startup-product.jpg",
    },
    {
      id: 2,
      title: "Pitch Deck Masterclass",
      description:
        "Create compelling presentations that capture investor attention",
      duration: "28 min",
      views: 4200,
      category: "Fundraising",
      instructor: "Aisha Mohammed",
      thumbnail: "/pitch-deck-presentation-business.jpg",
    },
  ];

  const faqs = [
    {
      question: "How do I apply to the AAU Startups Portal?",
      answer:
        "You can apply through our online application form. The process includes submitting your business idea, team information, and answering questions about your market and business model.",
      category: "Applications",
    },
    {
      question: "What support do you provide to startups?",
      answer:
        "We provide mentorship, workspace access, funding opportunities, legal support, and networking events. Each startup gets assigned a dedicated mentor and access to our resource library.",
      category: "Support",
    },
    {
      question: "Is there a fee to join the program?",
      answer:
        "No, the AAU Startups Portal program is completely free for accepted startups. We believe in removing financial barriers to entrepreneurship.",
      category: "Program",
    },
    {
      question: "How long is the incubation program?",
      answer:
        "Our standard incubation program runs for 6 months, with the possibility of extension based on progress and needs. We also offer ongoing alumni support.",
      category: "Program",
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-4 w-4" />;
      case "Video":
        return <Video className="h-4 w-4" />;
      case "Audio":
        return <Headphones className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    // Background: White #FFFFFF, Text: Dark Charcoal #21282D
    <div className="min-h-screen bg-white text-[#21282D] font-sans">
      {/* Header Section - Background: Light Gray-Blue #CAD6DE (with opacity) */}
      <section className="bg-[#CAD6DE]/30 py-16 px-4 border-b border-[#CAD6DE]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-8">
            {/* Primary Blue #005081 */}
            <h1 className="text-4xl font-bold text-[#005081] tracking-tight">
              Knowledge Library
            </h1>
            {/* Muted Gray #7D818B */}
            <p className="text-xl text-[#7D818B] max-w-2xl mx-auto">
              Access comprehensive guides, tutorials, and resources to
              accelerate your entrepreneurial journey.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-[#7D818B]" />
                <Input
                  placeholder="Search guides, videos, FAQs..."
                  className="pl-10 h-12 border-[#005081]/20 focus-visible:ring-[#005081]"
                />
              </div>
              {/* Button: Primary Blue #005081 */}
              <Button className="h-12 px-6 bg-[#005081] hover:bg-[#015384] text-white transition-colors">
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
          <Tabs defaultValue="guides" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 bg-[#CAD6DE]/20 p-1 rounded-lg">
              {/* Tabs styling handles active state, usually via Shadcn defaults, 
                  but we ensure text contrast is high */}
              <TabsTrigger
                value="guides"
                className="data-[state=active]:bg-white data-[state=active]:text-[#005081] data-[state=active]:shadow-sm text-[#7D818B]"
              >
                Guides & Documents
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="data-[state=active]:bg-white data-[state=active]:text-[#005081] data-[state=active]:shadow-sm text-[#7D818B]"
              >
                Video Tutorials
              </TabsTrigger>
              <TabsTrigger
                value="faqs"
                className="data-[state=active]:bg-white data-[state=active]:text-[#005081] data-[state=active]:shadow-sm text-[#7D818B]"
              >
                FAQs
              </TabsTrigger>
            </TabsList>

            {/* Guides */}
            <TabsContent value="guides" className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-[#21282D]">
                    Guides & Documents
                  </h2>
                  <p className="text-[#7D818B]">
                    Comprehensive resources for every stage of your startup
                    journey
                  </p>
                </div>
                <Select>
                  <SelectTrigger className="w-48 border-[#CAD6DE]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="business">
                      Business Fundamentals
                    </SelectItem>
                    <SelectItem value="funding">Funding</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Featured Guide */}
              {guides
                .filter((guide) => guide.featured)
                .map((guide) => (
                  <Card
                    key={guide.id}
                    // Border: Primary Blue #005081 with opacity, Gradient bg
                    className="border-2 border-[#005081]/20 bg-gradient-to-r from-[#005081]/5 to-transparent"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          {/* Accent: AAU Red #E63946 for Featured status */}
                          <Badge className="bg-[#E63946] hover:bg-[#E63946]/90 text-white border-none">
                            Featured Guide
                          </Badge>
                          <CardTitle className="text-xl text-[#005081]">
                            {guide.title}
                          </CardTitle>
                          <CardDescription className="text-base text-[#21282D]">
                            {guide.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center text-sm text-[#7D818B]">
                          {getTypeIcon(guide.type)}
                          <span className="ml-2">{guide.type}</span>
                        </div>
                        <div className="flex items-center text-sm text-[#7D818B]">
                          <Clock className="h-4 w-4 mr-2" />
                          {guide.readTime}
                        </div>
                        <div className="flex items-center text-sm text-[#7D818B]">
                          <Download className="h-4 w-4 mr-2" />
                          {guide.downloads.toLocaleString()}
                        </div>
                        <div className="flex items-center text-sm text-[#7D818B]">
                          <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
                          {guide.rating}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-[#21282D]">
                            By {guide.author}
                          </p>
                          <p className="text-xs text-[#7D818B]">
                            Published{" "}
                            {new Date(guide.publishDate).toLocaleDateString()}
                          </p>
                        </div>
                        {/* Primary Button */}
                        <Button className="bg-[#005081] hover:bg-[#015384] text-white">
                          <Download className="h-4 w-4 mr-2" />
                          Download Guide
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

              {/* Other Guides */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guides
                  .filter((guide) => !guide.featured)
                  .map((guide) => (
                    <Card
                      key={guide.id}
                      className="hover:shadow-lg transition-shadow border-[#CAD6DE]"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            {/* Secondary Blue Badge */}
                            <Badge
                              variant="outline"
                              className="text-[#005081] border-[#005081]/30 bg-[#005081]/5"
                            >
                              {guide.category}
                            </Badge>
                            <CardTitle className="text-lg text-[#21282D]">
                              {guide.title}
                            </CardTitle>
                            <CardDescription className="text-[#7D818B]">
                              {guide.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm text-[#7D818B]">
                          <div className="flex items-center">
                            {getTypeIcon(guide.type)}
                            <span className="ml-2">{guide.type}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            {guide.readTime}
                          </div>
                          <div className="flex items-center">
                            <Download className="h-4 w-4 mr-2" />
                            {guide.downloads.toLocaleString()}
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
                            {guide.rating}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-[#CAD6DE]">
                          <div>
                            <p className="text-sm font-medium text-[#21282D]">
                              By {guide.author}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            className="bg-[#005081] hover:bg-[#015384] text-white"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            {/* Videos */}
            <TabsContent value="videos" className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-[#21282D]">
                    Video Tutorials
                  </h2>
                  <p className="text-[#7D818B]">
                    Learn through engaging video content from industry experts
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <Card
                    key={video.id}
                    className="hover:shadow-lg transition-shadow overflow-hidden border-[#CAD6DE]"
                  >
                    <div className="relative overflow-hidden h-40 md:h-44 lg:h-48 bg-[#21282D]">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105 opacity-90"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Button
                          size="lg"
                          className="rounded-full bg-white/90 text-[#005081] hover:bg-white hover:text-[#015384]"
                        >
                          <Video className="h-6 w-6" />
                        </Button>
                      </div>
                      <Badge className="absolute top-2 right-2 bg-[#21282D]/80 text-white">
                        {video.duration}
                      </Badge>
                    </div>
                    <CardHeader>
                      <Badge
                        variant="outline"
                        className="w-fit border-[#005081]/30 text-[#005081]"
                      >
                        {video.category}
                      </Badge>
                      <CardTitle className="text-lg text-[#21282D]">
                        {video.title}
                      </CardTitle>
                      <CardDescription className="text-[#7D818B]">
                        {video.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-[#21282D]">
                            {video.instructor}
                          </p>
                          <div className="flex items-center text-sm text-[#7D818B]">
                            <Eye className="h-3 w-3 mr-1" />
                            {video.views.toLocaleString()} views
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-[#005081] hover:bg-[#015384] text-white"
                        >
                          Watch Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* FAQs */}
            <TabsContent value="faqs" className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-[#21282D]">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-[#7D818B]">
                    Find answers to common questions about our program
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="border-[#005081] text-[#005081] hover:bg-[#005081]/5"
                >
                  Ask a Question
                </Button>
              </div>

              <div className="max-w-4xl mx-auto space-y-4">
                {faqs.map((faq, i) => (
                  <Card
                    key={i}
                    className="hover:shadow-lg transition-shadow border-[#CAD6DE]"
                  >
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        {/* Icon Container: Light Blue Background */}
                        <div className="h-8 w-8 rounded-full bg-[#005081]/10 flex items-center justify-center flex-shrink-0">
                          <HelpCircle className="h-4 w-4 text-[#005081]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <Badge
                              variant="outline"
                              className="text-[#7D818B] border-[#CAD6DE]"
                            >
                              {faq.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg text-[#21282D]">
                            {faq.question}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed ml-12 text-[#7D818B]">
                        {faq.answer}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button variant="outline" size="lg" className="text-[#21282D]">
                  Load More FAQs
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Help Section - Background: Light Gray-Blue #CAD6DE (with opacity) */}
      <section className="py-16 px-4 bg-[#CAD6DE]/30 border-t border-[#CAD6DE]">
        <div className="container mx-auto max-w-7xl">
          <Card className="max-w-2xl mx-auto text-center p-8 bg-white border-[#005081]/10 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-[#005081]">
                Need More Help?
              </CardTitle>
              <CardDescription className="text-[#7D818B]">
                Can't find what you're looking for? Our support team is here to
                help
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#005081] hover:bg-[#015384] text-white">
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  className="border-[#005081] text-[#005081] hover:bg-[#005081]/5"
                >
                  Schedule a Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
