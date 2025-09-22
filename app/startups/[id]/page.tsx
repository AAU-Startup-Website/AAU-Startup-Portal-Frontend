import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// This would typically come from a database or API
async function getStartup(id: string) {
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
        { name: "African Development Bank", type: "Institution", amount: "$1.5M" },
        { name: "Catalyst Fund", type: "VC", amount: "$800K" },
        { name: "Ethiopian Investment Holdings", type: "Local", amount: "$200K" },
      ],
      milestones: [
        { date: "2024-11", title: "Reached 50K users", status: "completed" },
        { date: "2024-09", title: "Series A funding closed", status: "completed" },
        { date: "2024-06", title: "Partnership with Commercial Bank of Ethiopia", status: "completed" },
        { date: "2024-03", title: "Launched in 5 rural regions", status: "completed" },
        { date: "2025-02", title: "Launch merchant payment system", status: "upcoming" },
        { date: "2025-06", title: "Expand to Kenya and Uganda", status: "upcoming" },
      ],
      tags: ["Mobile Payments", "Financial Inclusion", "Rural Banking", "B2C", "USSD", "SMS Banking"],
      socialLinks: {
        twitter: "https://twitter.com/ethiopay",
        linkedin: "https://linkedin.com/company/ethiopay",
        facebook: "https://facebook.com/ethiopay",
      },
      awards: [
        { name: "Best Fintech Startup 2024", organization: "African Fintech Awards" },
        { name: "Innovation in Financial Inclusion", organization: "World Bank Group" },
      ],
      press: [
        {
          title: "EthioPay Raises $2.5M to Expand Rural Payment Services",
          publication: "TechCrunch",
          date: "2024-09-15",
        },
        { title: "How Ethiopian Startup is Banking the Unbanked", publication: "Forbes Africa", date: "2024-08-20" },
      ],
      featured: true,
      lastUpdated: "2024-12-01",
    },
  ]

  return startups.find((s) => s.id === Number.parseInt(id))
}

export default async function StartupProfilePage({ params }: { params: { id: string } }) {
  const startup = await getStartup(params.id)

  if (!startup) {
    notFound()
  }

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
      {/* Hero Section */}
      <section className="relative">
        <div className="aspect-[3/1] relative">
          <img
            src={startup.coverImage || "/placeholder.svg"}
            alt={startup.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Back Button */}
          <div className="absolute top-6 left-6">
            <Button variant="secondary" asChild className="bg-white/90">
              <Link href="/startups">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Directory
              </Link>
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-6 right-6 flex gap-2">
            <Button size="sm" variant="secondary" className="bg-white/90">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="secondary" className="bg-white/90">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Startup Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto max-w-7xl">
              <div className="flex items-end justify-between">
                <div className="flex items-end space-x-6">
                  <Avatar className="h-20 w-20 border-4 border-white">
                    <AvatarImage src={startup.logo || "/placeholder.svg"} alt={startup.name} />
                    <AvatarFallback className="bg-aau-blue text-white text-xl">
                      {startup.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-4xl font-bold mb-2">{startup.name}</h1>
                    <p className="text-xl opacity-90 mb-3">{startup.tagline}</p>
                    <div className="flex items-center space-x-4">
                      <Badge className={`${getStageColor(startup.stage)} border-white`}>{startup.stage}</Badge>
                      <Badge variant="outline" className="border-white text-white">
                        {startup.sector}
                      </Badge>
                      <div className="flex items-center text-sm opacity-75">
                        <MapPin className="h-4 w-4 mr-1" />
                        {startup.location}
                      </div>
                      <div className="flex items-center text-sm opacity-75">
                        <Calendar className="h-4 w-4 mr-1" />
                        Founded {startup.founded}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" asChild>
                    <Link href={startup.website} target="_blank">
                      <Globe className="h-4 w-4 mr-2" />
                      Visit Website
                    </Link>
                  </Button>
                  <Button className="bg-aau-blue hover:bg-aau-blue/90">
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
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="milestones">Milestones</TabsTrigger>
                  <TabsTrigger value="updates">Updates</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About {startup.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">{startup.fullDescription}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div>
                          <h4 className="font-semibold mb-3">Key Features</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center">
                              <ChevronRight className="h-4 w-4 mr-2 text-aau-blue" />
                              USSD-based transactions for feature phones
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="h-4 w-4 mr-2 text-aau-blue" />
                              SMS notifications and confirmations
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="h-4 w-4 mr-2 text-aau-blue" />
                              Multi-language support (Amharic, Oromo, Tigrinya)
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="h-4 w-4 mr-2 text-aau-blue" />
                              Integration with local banks and MFIs
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Market Impact</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center">
                              <ChevronRight className="h-4 w-4 mr-2 text-aau-blue" />
                              Serving 5 rural regions across Ethiopia
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="h-4 w-4 mr-2 text-aau-blue" />
                              85% of users previously unbanked
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="h-4 w-4 mr-2 text-aau-blue" />
                              Average transaction cost 60% lower than alternatives
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="h-4 w-4 mr-2 text-aau-blue" />
                              Supporting 200+ local merchants
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Awards & Recognition</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {startup.awards.map((award, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-aau-gold/10 rounded-full flex items-center justify-center">
                              <Award className="h-5 w-5 text-aau-gold" />
                            </div>
                            <div>
                              <h4 className="font-medium">{award.name}</h4>
                              <p className="text-sm text-muted-foreground">{award.organization}</p>
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
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <DollarSign className="h-5 w-5 mr-2 text-aau-blue" />
                          Financial Metrics
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-2xl font-bold text-aau-blue">{startup.metrics.revenue}</div>
                            <div className="text-sm text-muted-foreground">Annual Revenue</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-aau-blue">{startup.metrics.funding}</div>
                            <div className="text-sm text-muted-foreground">Total Funding</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-aau-blue">
                              {startup.metrics.monthlyTransactions}
                            </div>
                            <div className="text-sm text-muted-foreground">Monthly Transactions</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-aau-blue">
                              {startup.metrics.averageTransactionValue}
                            </div>
                            <div className="text-sm text-muted-foreground">Avg Transaction</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                          Growth Metrics
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-2xl font-bold text-green-600">{startup.metrics.growth}</div>
                            <div className="text-sm text-muted-foreground">YoY Growth</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-green-600">{startup.metrics.users}</div>
                            <div className="text-sm text-muted-foreground">Active Users</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-green-600">{startup.metrics.customerRetention}</div>
                            <div className="text-sm text-muted-foreground">Retention Rate</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-green-600">{startup.metrics.marketShare}</div>
                            <div className="text-sm text-muted-foreground">Market Share</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Funding History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {startup.investors.map((investor, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 bg-aau-blue/10 rounded-full flex items-center justify-center">
                                <Building className="h-5 w-5 text-aau-blue" />
                              </div>
                              <div>
                                <h4 className="font-medium">{investor.name}</h4>
                                <p className="text-sm text-muted-foreground">{investor.type}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">{investor.amount}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Team Tab */}
                <TabsContent value="team" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Leadership Team</CardTitle>
                      <CardDescription>Meet the founders and key team members</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Founder */}
                      <div className="p-6 border rounded-lg">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage
                              src={startup.team.founder.avatar || "/placeholder.svg"}
                              alt={startup.team.founder.name}
                            />
                            <AvatarFallback className="bg-aau-blue text-white">
                              {startup.team.founder.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-semibold">{startup.team.founder.name}</h3>
                                <p className="text-muted-foreground">{startup.team.founder.role}</p>
                              </div>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={startup.team.founder.linkedin || "#"} target="_blank">
                                  <Linkedin className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground">{startup.team.founder.bio}</p>
                          </div>
                        </div>
                      </div>

                      {/* Co-founders */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {startup.team.coFounders.map((coFounder, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-start space-x-3">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={coFounder.avatar || "/placeholder.svg"} alt={coFounder.name} />
                                <AvatarFallback className="bg-aau-blue text-white">
                                  {coFounder.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h4 className="font-medium">{coFounder.name}</h4>
                                <p className="text-sm text-muted-foreground mb-2">{coFounder.role}</p>
                                <p className="text-xs text-muted-foreground">{coFounder.bio}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Users className="h-5 w-5 text-aau-blue" />
                          <div>
                            <h4 className="font-medium">Team Size</h4>
                            <p className="text-sm text-muted-foreground">Total employees across all departments</p>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-aau-blue">{startup.team.size}</div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Milestones Tab */}
                <TabsContent value="milestones" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Company Milestones</CardTitle>
                      <CardDescription>Key achievements and upcoming goals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {startup.milestones.map((milestone, index) => (
                          <div key={index} className="flex items-start space-x-4">
                            <div
                              className={`h-3 w-3 rounded-full mt-2 ${
                                milestone.status === "completed" ? "bg-green-500" : "bg-aau-blue"
                              }`}
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{milestone.title}</h4>
                                <Badge variant={milestone.status === "completed" ? "default" : "secondary"}>
                                  {milestone.status === "completed" ? "Completed" : "Upcoming"}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{milestone.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Updates Tab */}
                <TabsContent value="updates" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Press & Updates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {startup.press.map((article, index) => (
                          <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium mb-1">{article.title}</h4>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                  <span>{article.publication}</span>
                                  <span>{new Date(article.date).toLocaleDateString()}</span>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
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
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <Link href={startup.website} target="_blank" className="text-sm hover:underline">
                        {startup.website}
                      </Link>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{startup.location}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex space-x-2">
                      {startup.socialLinks.twitter && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={startup.socialLinks.twitter} target="_blank">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                      {startup.socialLinks.linkedin && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={startup.socialLinks.linkedin} target="_blank">
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
                <Card>
                  <CardHeader>
                    <CardTitle>Assigned Mentor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={startup.mentor.avatar || "/placeholder.svg"} alt={startup.mentor.name} />
                        <AvatarFallback className="bg-aau-blue text-white">
                          {startup.mentor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">{startup.mentor.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{startup.mentor.role}</p>
                        <p className="text-xs text-muted-foreground">{startup.mentor.bio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Technologies & Keywords</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {startup.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Founded</span>
                    <span className="text-sm font-medium">{startup.founded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Team Size</span>
                    <span className="text-sm font-medium">{startup.team.size} people</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Updated</span>
                    <span className="text-sm font-medium">{new Date(startup.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
