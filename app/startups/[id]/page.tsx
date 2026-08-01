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
  ArrowLeft,
  ExternalLink,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Award,
  MessageCircle,
  Heart,
  Share2,
  Building,
  Globe,
  Linkedin,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Demo content only — the real Startup model (name/description/founder/
// phase) doesn't have the rich fields this page renders (metrics, team,
// investors, milestones, press, mentor, tags). See docs/KNOWN_GAPS.md.
async function getMockStartupProfile(id: string) {
  const startups = [
    {
      id: 1,
      name: "EthioPay Solutions",
      tagline: "Revolutionary mobile payment platform for rural Ethiopia",
      description:
        "EthioPay Solutions is bridging the financial inclusion gap by providing secure, accessible mobile payment solutions tailored specifically for Ethiopia's rural communities. Our platform enables users to send money, pay bills, and access financial services using basic mobile phones, without requiring internet connectivity or smartphones.",
      fullDescription:
        "Founded in 2022, EthioPay Solutions emerged from the recognition that traditional banking services were failing to reach Ethiopia's rural population. Our team of fintech experts and local community leaders developed a comprehensive mobile payment ecosystem that works on any mobile device, including feature phones. The platform uses USSD technology and SMS-based transactions to ensure accessibility even in areas with limited internet infrastructure. We've partnered with local banks, microfinance institutions, and mobile network operators to create a robust financial ecosystem that serves over 50,000 users across rural Ethiopia.",
      sector: "FinTech",
      stage: "Series A",
      founded: "2022",
      location: "Addis Ababa, Ethiopia",
      website: "https://ethiopay.com",
      email: "contact@ethiopay.com",
      phone: "+251-11-123-4567",
      logo: "/placeholder.svg?height=80&width=80",
      coverImage: "/fintech-mobile-payment-app.jpg",
      metrics: {
        revenue: "$1.2M",
        users: "50,000+",
        growth: "+150%",
        funding: "$2.5M",
        monthlyTransactions: "500K+",
        averageTransactionValue: "$25",
        customerRetention: "85%",
        marketShare: "12%",
      },
      team: {
        size: 25,
        founder: {
          name: "Meron Tadesse",
          role: "CEO & Co-Founder",
          avatar: "/placeholder.svg?height=60&width=60",
          bio: "Former Goldman Sachs analyst with 8 years in fintech. MBA from Wharton, passionate about financial inclusion in Africa.",
          linkedin: "https://linkedin.com/in/merontadesse",
        },
        coFounders: [
          {
            name: "Daniel Bekele",
            role: "CTO & Co-Founder",
            avatar: "/placeholder.svg?height=60&width=60",
            bio: "Former Microsoft engineer, expert in mobile technologies and payment systems.",
          },
          {
            name: "Sara Ahmed",
            role: "COO & Co-Founder",
            avatar: "/placeholder.svg?height=60&width=60",
            bio: "Operations expert with 10 years experience in Ethiopian banking sector.",
          },
        ],
      },
      mentor: {
        name: "Dr. Alemayehu Geda",
        role: "Senior Investment Director",
        avatar: "/placeholder.svg?height=50&width=50",
        assigned: true,
        bio: "20+ years in African fintech, former World Bank advisor",
      },
      investors: [
        {
          name: "African Development Bank",
          type: "Institution",
          amount: "$1.5M",
        },
        { name: "Catalyst Fund", type: "VC", amount: "$800K" },
        {
          name: "Ethiopian Investment Holdings",
          type: "Local",
          amount: "$200K",
        },
      ],
      milestones: [
        { date: "2024-11", title: "Reached 50K users", status: "completed" },
        {
          date: "2024-09",
          title: "Series A funding closed",
          status: "completed",
        },
        {
          date: "2024-06",
          title: "Partnership with Commercial Bank of Ethiopia",
          status: "completed",
        },
        {
          date: "2024-03",
          title: "Launched in 5 rural regions",
          status: "completed",
        },
        {
          date: "2025-02",
          title: "Launch merchant payment system",
          status: "upcoming",
        },
        {
          date: "2025-06",
          title: "Expand to Kenya and Uganda",
          status: "upcoming",
        },
      ],
      tags: [
        "Mobile Payments",
        "Financial Inclusion",
        "Rural Banking",
        "B2C",
        "USSD",
        "SMS Banking",
      ],
      socialLinks: {
        twitter: "https://twitter.com/ethiopay",
        linkedin: "https://linkedin.com/company/ethiopay",
        facebook: "https://facebook.com/ethiopay",
      },
      awards: [
        {
          name: "Best Fintech Startup 2024",
          organization: "African Fintech Awards",
        },
        {
          name: "Innovation in Financial Inclusion",
          organization: "World Bank Group",
        },
      ],
      press: [
        {
          title: "EthioPay Raises $2.5M to Expand Rural Payment Services",
          publication: "TechCrunch",
          date: "2024-09-15",
        },
        {
          title: "How Ethiopian Startup is Banking the Unbanked",
          publication: "Forbes Africa",
          date: "2024-08-20",
        },
      ],
      featured: true,
      lastUpdated: "2024-12-01",
    },
  ];

  return startups.find((s) => s.id === Number.parseInt(id));
}

export default async function StartupProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const startup = await getMockStartupProfile(id);

  if (!startup) {
    notFound();
  }

  // Updated Stage Colors to use standard Tailwind classes
  const getStageColor = (stage: string) => {
    const colors = {
      Ideation: "bg-slate-100 text-slate-800",
      MVP: "bg-blue-100 text-primary",
      "Early Traction": "bg-green-100 text-green-800",
      Seed: "bg-yellow-100 text-yellow-800",
      "Series A": "bg-orange-100 text-orange-800",
      "Series B": "bg-red-100 text-red-800",
      Growth: "bg-purple-100 text-purple-800",
    };
    return (
      colors[stage as keyof typeof colors] || "bg-slate-100 text-slate-800"
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative">
        <div className="aspect-[3/1] relative bg-slate-900">
          <img
            src={startup.coverImage || "/placeholder.svg"}
            alt={startup.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />

          {/* Back Button */}
          <div className="absolute top-6 left-6 z-20">
            <Button
              variant="secondary"
              asChild
              className="bg-white/95 hover:bg-white text-primary border-none shadow-sm font-semibold"
            >
              <Link href="/startups/browse">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Directory
              </Link>
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-6 right-6 flex gap-2 z-20">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-primary border-none"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-primary border-none"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Startup Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
            <div className="container mx-auto max-w-7xl">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex items-end space-x-6">
                  <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-white shadow-xl">
                    <AvatarImage
                      src={startup.logo || "/placeholder.svg"}
                      alt={startup.name}
                    />
                    <AvatarFallback className="bg-primary text-white text-xl font-bold">
                      {startup.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="mb-1">
                    <h1 className="text-3xl md:text-5xl font-bold mb-2 tracking-tight">
                      {startup.name}
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 mb-4 max-w-2xl">
                      {startup.tagline}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge
                        className={`${getStageColor(
                          startup.stage
                        )} border-none shadow-sm px-3 py-1`}
                      >
                        {startup.stage}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-white/40 text-white bg-white/10 backdrop-blur-sm px-3 py-1"
                      >
                        {startup.sector}
                      </Badge>
                      <div className="flex items-center text-sm text-blue-100 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        <MapPin className="h-3.5 w-3.5 mr-1.5" />
                        {startup.location}
                      </div>
                      <div className="flex items-center text-sm text-blue-100 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        <Calendar className="h-3.5 w-3.5 mr-1.5" />
                        Founded {startup.founded}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mb-1">
                  <Button
                    variant="outline"
                    className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md"
                    asChild
                  >
                    <Link href={startup.website} target="_blank">
                      <Globe className="h-4 w-4 mr-2" />
                      Visit Website
                    </Link>
                  </Button>
                  <Button className="bg-white text-primary hover:bg-blue-50 font-bold shadow-lg border-none">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Team
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent space-x-6 overflow-x-auto">
                  <TabsTrigger
                    value="overview"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary pb-3 px-1 text-slate-500 hover:text-primary transition-all"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="metrics"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary pb-3 px-1 text-slate-500 hover:text-primary transition-all"
                  >
                    Metrics
                  </TabsTrigger>
                  <TabsTrigger
                    value="team"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary pb-3 px-1 text-slate-500 hover:text-primary transition-all"
                  >
                    Team
                  </TabsTrigger>
                  <TabsTrigger
                    value="milestones"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary pb-3 px-1 text-slate-500 hover:text-primary transition-all"
                  >
                    Milestones
                  </TabsTrigger>
                  <TabsTrigger
                    value="updates"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary pb-3 px-1 text-slate-500 hover:text-primary transition-all"
                  >
                    Updates
                  </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent
                  value="overview"
                  className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-2 duration-300"
                >
                  <Card className="border-slate-200 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-xl text-primary">
                        About {startup.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-slate-600 leading-relaxed text-lg">
                        {startup.fullDescription}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        <div>
                          <h4 className="font-semibold mb-4 text-slate-800 flex items-center">
                            <ChevronRight className="w-4 h-4 mr-2 text-primary" />{" "}
                            Key Features
                          </h4>
                          <ul className="space-y-3 text-sm text-slate-600">
                            <li className="flex items-start">
                              <ChevronRight className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                              USSD-based transactions for feature phones
                            </li>
                            <li className="flex items-start">
                              <ChevronRight className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                              SMS notifications and confirmations
                            </li>
                            <li className="flex items-start">
                              <ChevronRight className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                              Multi-language support (Amharic, Oromo, Tigrinya)
                            </li>
                            <li className="flex items-start">
                              <ChevronRight className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                              Integration with local banks and MFIs
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-4 text-slate-800 flex items-center">
                            <TrendingUp className="w-4 h-4 mr-2 text-primary" />{" "}
                            Market Impact
                          </h4>
                          <ul className="space-y-3 text-sm text-slate-600">
                            <li className="flex items-start">
                              <ChevronRight className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                              Serving 5 rural regions across Ethiopia
                            </li>
                            <li className="flex items-start">
                              <ChevronRight className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                              85% of users previously unbanked
                            </li>
                            <li className="flex items-start">
                              <ChevronRight className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                              Average transaction cost 60% lower than
                              alternatives
                            </li>
                            <li className="flex items-start">
                              <ChevronRight className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                              Supporting 200+ local merchants
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-xl text-primary">
                        Awards & Recognition
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {startup.awards.map((award, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg border border-slate-100"
                          >
                            <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center shrink-0">
                              <Award className="h-5 w-5 text-yellow-700" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-800">
                                {award.name}
                              </h4>
                              <p className="text-sm text-slate-500">
                                {award.organization}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Metrics Tab */}
                <TabsContent value="metrics" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-slate-200 shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center text-primary">
                          <DollarSign className="h-5 w-5 mr-2" />
                          Financial Metrics
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <div className="text-2xl font-bold text-primary">
                              {startup.metrics.revenue}
                            </div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium mt-1">
                              Annual Revenue
                            </div>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <div className="text-2xl font-bold text-primary">
                              {startup.metrics.funding}
                            </div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium mt-1">
                              Total Funding
                            </div>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <div className="text-2xl font-bold text-primary">
                              {startup.metrics.monthlyTransactions}
                            </div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium mt-1">
                              Monthly Transactions
                            </div>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <div className="text-2xl font-bold text-primary">
                              {startup.metrics.averageTransactionValue}
                            </div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium mt-1">
                              Avg Transaction
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-slate-200 shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center text-green-700">
                          <TrendingUp className="h-5 w-5 mr-2" />
                          Growth Metrics
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="p-3 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-700">
                              {startup.metrics.growth}
                            </div>
                            <div className="text-xs text-green-800/70 uppercase tracking-wide font-medium mt-1">
                              YoY Growth
                            </div>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-700">
                              {startup.metrics.users}
                            </div>
                            <div className="text-xs text-green-800/70 uppercase tracking-wide font-medium mt-1">
                              Active Users
                            </div>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-700">
                              {startup.metrics.customerRetention}
                            </div>
                            <div className="text-xs text-green-800/70 uppercase tracking-wide font-medium mt-1">
                              Retention Rate
                            </div>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-700">
                              {startup.metrics.marketShare}
                            </div>
                            <div className="text-xs text-green-800/70 uppercase tracking-wide font-medium mt-1">
                              Market Share
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-slate-200 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-primary">
                        Funding History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {startup.investors.map((investor, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:border-primary/20 transition-colors"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <Building className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-slate-800">
                                  {investor.name}
                                </h4>
                                <p className="text-sm text-slate-500">
                                  {investor.type}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-primary">
                                {investor.amount}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Team Tab */}
                <TabsContent value="team" className="space-y-6">
                  <Card className="border-slate-200 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-primary">
                        Leadership Team
                      </CardTitle>
                      <CardDescription>
                        Meet the founders and key team members
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Founder */}
                      <div className="p-6 border border-slate-200 rounded-xl bg-slate-50/50">
                        <div className="flex items-start space-x-5">
                          <Avatar className="h-20 w-20 border-2 border-white shadow-sm">
                            <AvatarImage
                              src={
                                startup.team.founder.avatar ||
                                "/placeholder.svg"
                              }
                              alt={startup.team.founder.name}
                            />
                            <AvatarFallback className="bg-primary text-white text-lg font-bold">
                              {startup.team.founder.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h3 className="text-xl font-bold text-slate-900">
                                  {startup.team.founder.name}
                                </h3>
                                <p className="text-primary font-medium">
                                  {startup.team.founder.role}
                                </p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="hover:text-primary hover:border-primary/50"
                              >
                                <Link
                                  href={startup.team.founder.linkedin || "#"}
                                  target="_blank"
                                >
                                  <Linkedin className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              {startup.team.founder.bio}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Co-founders */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {startup.team.coFounders.map((coFounder, index) => (
                          <div
                            key={index}
                            className="p-5 border border-slate-100 rounded-xl hover:border-slate-300 transition-colors"
                          >
                            <div className="flex items-start space-x-4">
                              <Avatar className="h-14 w-14 border border-slate-100">
                                <AvatarImage
                                  src={coFounder.avatar || "/placeholder.svg"}
                                  alt={coFounder.name}
                                />
                                <AvatarFallback className="bg-primary text-white">
                                  {coFounder.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h4 className="font-semibold text-slate-900">
                                  {coFounder.name}
                                </h4>
                                <p className="text-sm text-primary mb-2 font-medium">
                                  {coFounder.role}
                                </p>
                                <p className="text-xs text-slate-500">
                                  {coFounder.bio}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between p-5 bg-blue-50/50 border border-blue-100 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-primary/10 rounded-full">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900">
                              Team Size
                            </h4>
                            <p className="text-sm text-slate-500">
                              Total employees across all departments
                            </p>
                          </div>
                        </div>
                        <div className="text-3xl font-bold text-primary">
                          {startup.team.size}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Milestones Tab */}
                <TabsContent value="milestones" className="space-y-6">
                  <Card className="border-slate-200 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-primary">
                        Company Milestones
                      </CardTitle>
                      <CardDescription>
                        Key achievements and upcoming goals
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                        {startup.milestones.map((milestone, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-4 relative"
                          >
                            <div
                              className={`h-4 w-4 rounded-full mt-1.5 shrink-0 z-10 border-2 border-white shadow-sm ${
                                milestone.status === "completed"
                                  ? "bg-green-500"
                                  : "bg-primary"
                              }`}
                            />
                            <div className="flex-1 bg-slate-50 p-4 rounded-lg border border-slate-100">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                                <h4 className="font-semibold text-slate-900">
                                  {milestone.title}
                                </h4>
                                <Badge
                                  variant={
                                    milestone.status === "completed"
                                      ? "default"
                                      : "secondary"
                                  }
                                  className={
                                    milestone.status === "completed"
                                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                                      : "bg-blue-100 text-primary hover:bg-blue-200"
                                  }
                                >
                                  {milestone.status === "completed"
                                    ? "Completed"
                                    : "Upcoming"}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-500 font-medium">
                                {milestone.date}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Updates Tab */}
                <TabsContent value="updates" className="space-y-6">
                  <Card className="border-slate-200 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-primary">
                        Recent Press & Updates
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {startup.press.map((article, index) => (
                          <div
                            key={index}
                            className="p-4 border border-slate-100 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all group"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-slate-900 mb-1 group-hover:text-primary transition-colors">
                                  {article.title}
                                </h4>
                                <div className="flex items-center space-x-4 text-sm text-slate-500">
                                  <span className="font-medium text-slate-700">
                                    {article.publication}
                                  </span>
                                  <span>
                                    {new Date(
                                      article.date
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-slate-400 group-hover:text-primary"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-primary text-lg">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-slate-600">
                      <Globe className="h-4 w-4 text-primary" />
                      <Link
                        href={startup.website}
                        target="_blank"
                        className="text-sm hover:text-primary hover:underline transition-colors"
                      >
                        {startup.website}
                      </Link>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-600">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm">{startup.location}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex space-x-2">
                      {startup.socialLinks.twitter && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="hover:text-primary hover:border-primary/50"
                        >
                          <Link
                            href={startup.socialLinks.twitter}
                            target="_blank"
                          >
                            <span className="sr-only">Twitter</span>
                            <svg
                              className="h-4 w-4 fill-current"
                              viewBox="0 0 24 24"
                            >
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          </Link>
                        </Button>
                      )}
                      {startup.socialLinks.linkedin && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="hover:text-primary hover:border-primary/50"
                        >
                          <Link
                            href={startup.socialLinks.linkedin}
                            target="_blank"
                          >
                            <Linkedin className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Assigned Mentor */}
              {startup.mentor.assigned && (
                <Card className="border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-primary text-lg">
                      Assigned Mentor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12 border border-slate-100">
                        <AvatarImage
                          src={startup.mentor.avatar || "/placeholder.svg"}
                          alt={startup.mentor.name}
                        />
                        <AvatarFallback className="bg-primary text-white">
                          {startup.mentor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900">
                          {startup.mentor.name}
                        </h4>
                        <p className="text-sm text-primary font-medium mb-1">
                          {startup.mentor.role}
                        </p>
                        <p className="text-xs text-slate-500 leading-tight">
                          {startup.mentor.bio}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tags */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-primary text-lg">
                    Technologies & Keywords
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {startup.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs font-normal bg-slate-100 text-slate-600 hover:bg-slate-200"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-slate-200 shadow-sm bg-slate-50/50">
                <CardHeader>
                  <CardTitle className="text-primary text-lg">
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-sm text-slate-500">Founded</span>
                    <span className="text-sm font-semibold text-slate-900">
                      {startup.founded}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-sm text-slate-500">Team Size</span>
                    <span className="text-sm font-semibold text-slate-900">
                      {startup.team.size} people
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Last Updated</span>
                    <span className="text-sm font-semibold text-slate-900">
                      {new Date(startup.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
