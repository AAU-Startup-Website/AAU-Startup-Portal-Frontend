"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  ExternalLink,
  Calendar,
  DollarSign,
  MapPin,
  Building,
  Clock,
  Target,
  Award,
  Users,
} from "lucide-react";

export default function OpportunitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);

  const opportunities = [
    {
      id: "FUND-001",
      title: "African Development Bank Innovation Fund",
      organization: "African Development Bank",
      type: "Grant",
      amount: "$50,000 - $200,000",
      stage: ["Seed", "Early"],
      sectors: ["FinTech", "AgriTech", "HealthTech"],
      location: "Africa-wide",
      deadline: "2024-03-15",
      description:
        "Supporting innovative startups across Africa with focus on financial inclusion and agricultural technology.",
      requirements: [
        "African-based startup",
        "Minimum viable product",
        "Clear business model",
      ],
      website: "https://afdb.org/innovation-fund",
      status: "open",
      applicants: 156,
      successRate: 15,
    },
    {
      id: "FUND-002",
      title: "Ethiopian Innovation Challenge",
      organization: "Ministry of Innovation & Technology",
      type: "Competition",
      amount: "$25,000 - $100,000",
      stage: ["Idea", "MVP"],
      sectors: ["EdTech", "HealthTech", "CleanTech"],
      location: "Ethiopia",
      deadline: "2024-02-28",
      description:
        "National innovation challenge supporting Ethiopian entrepreneurs in solving local problems.",
      requirements: [
        "Ethiopian citizen",
        "Local problem focus",
        "Scalable solution",
      ],
      website: "https://mint.gov.et/innovation-challenge",
      status: "open",
      applicants: 89,
      successRate: 25,
    },
    {
      id: "FUND-003",
      title: "Mastercard Foundation Young Africa Works",
      organization: "Mastercard Foundation",
      type: "Accelerator",
      amount: "$100,000 - $500,000",
      stage: ["Growth", "Scale"],
      sectors: ["FinTech", "EdTech", "Agriculture"],
      location: "East Africa",
      deadline: "2024-04-30",
      description:
        "Accelerator program focused on creating employment opportunities for young Africans.",
      requirements: [
        "Youth employment focus",
        "Proven traction",
        "Scalable business model",
      ],
      website: "https://mastercardfdn.org/young-africa-works",
      status: "open",
      applicants: 234,
      successRate: 12,
    },
    {
      id: "FUND-004",
      title: "Google for Startups Black Founders Fund",
      organization: "Google",
      type: "Equity-free",
      amount: "$50,000 - $100,000",
      stage: ["Seed", "Early"],
      sectors: ["Tech", "AI", "Mobile"],
      location: "Global",
      deadline: "2024-05-15",
      description:
        "Supporting Black-led startups with equity-free funding and mentorship.",
      requirements: [
        "Black founder/co-founder",
        "Technology startup",
        "Revenue generating",
      ],
      website: "https://startup.google.com/black-founders-fund",
      status: "open",
      applicants: 445,
      successRate: 8,
    },
    {
      id: "FUND-005",
      title: "USAID Development Innovation Ventures",
      organization: "USAID",
      type: "Grant",
      amount: "$100,000 - $1,500,000",
      stage: ["MVP", "Growth"],
      sectors: ["HealthTech", "EdTech", "Agriculture", "CleanTech"],
      location: "Developing Countries",
      deadline: "2024-06-30",
      description:
        "Supporting breakthrough solutions to global development challenges.",
      requirements: [
        "Development impact focus",
        "Evidence of effectiveness",
        "Cost-effective solution",
      ],
      website: "https://usaid.gov/div",
      status: "open",
      applicants: 178,
      successRate: 18,
    },
    {
      id: "FUND-006",
      title: "Seedstars Africa Ventures",
      organization: "Seedstars",
      type: "Venture Capital",
      amount: "$250,000 - $2,000,000",
      stage: ["Series A", "Growth"],
      sectors: ["FinTech", "E-commerce", "HealthTech"],
      location: "Africa",
      deadline: "Rolling",
      description:
        "Venture capital fund investing in high-growth African startups.",
      requirements: ["Proven business model", "Strong team", "Market traction"],
      website: "https://seedstars.com/africa-ventures",
      status: "open",
      applicants: 67,
      successRate: 5,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800";
      case "closing_soon":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Grant":
        return "bg-blue-100 text-blue-800";
      case "Competition":
        return "bg-purple-100 text-purple-800";
      case "Accelerator":
        return "bg-orange-100 text-orange-800";
      case "Venture Capital":
        return "bg-green-100 text-green-800";
      case "Equity-free":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.sectors.some((sector) =>
        sector.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesType = typeFilter === "all" || opp.type === typeFilter;
    const matchesStage =
      stageFilter === "all" || opp.stage.includes(stageFilter);
    return matchesSearch && matchesType && matchesStage;
  });

  const handleApply = (opportunityId: string) => {
    // Apply logic here
  };

  const stats = {
    totalOpportunities: opportunities.length,
    openOpportunities: opportunities.filter((opp) => opp.status === "open")
      .length,
    totalFunding: opportunities.reduce((acc, opp) => {
      const max = Number.parseInt(
        opp.amount.split(" - $")[1]?.replace(/[,$]/g, "") || "0"
      );
      return acc + max;
    }, 0),
    avgSuccessRate:
      opportunities.reduce((acc, opp) => acc + opp.successRate, 0) /
      opportunities.length,
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-aau-deep-blue mb-2">
          Funding Opportunities
        </h1>
        <p className="text-stone">
          Discover grants, competitions, and investment opportunities for your
          startup
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone">
                  Total Opportunities
                </p>
                <p className="text-2xl font-bold">{stats.totalOpportunities}</p>
              </div>
              <Target className="h-8 w-8 text-aau-deep-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone">Currently Open</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.openOpportunities}
                </p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone">Total Funding</p>
                <p className="text-2xl font-bold text-aau-gold">
                  ${(stats.totalFunding / 1000000).toFixed(1)}M
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-aau-gold" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone">
                  Avg Success Rate
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.avgSuccessRate.toFixed(0)}%
                </p>
              </div>
              <Award className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="opportunities" className="space-y-6">
        <TabsList>
          <TabsTrigger value="opportunities">All Opportunities</TabsTrigger>
          <TabsTrigger value="grants">Grants</TabsTrigger>
          <TabsTrigger value="competitions">Competitions</TabsTrigger>
          <TabsTrigger value="accelerators">Accelerators</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-stone" />
                    <Input
                      placeholder="Search opportunities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Grant">Grants</SelectItem>
                    <SelectItem value="Competition">Competitions</SelectItem>
                    <SelectItem value="Accelerator">Accelerators</SelectItem>
                    <SelectItem value="Venture Capital">VC</SelectItem>
                    <SelectItem value="Equity-free">Equity-free</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={stageFilter} onValueChange={setStageFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    <SelectItem value="Idea">Idea</SelectItem>
                    <SelectItem value="MVP">MVP</SelectItem>
                    <SelectItem value="Seed">Seed</SelectItem>
                    <SelectItem value="Early">Early</SelectItem>
                    <SelectItem value="Growth">Growth</SelectItem>
                    <SelectItem value="Scale">Scale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opportunity) => (
              <Card
                key={opportunity.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">
                        {opportunity.title}
                      </CardTitle>
                      <CardDescription className="flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        {opportunity.organization}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(opportunity.status)}>
                      {opportunity.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className={getTypeColor(opportunity.type)}>
                      {opportunity.type}
                    </Badge>
                    <span className="font-semibold text-aau-deep-blue">
                      {opportunity.amount}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-stone">
                      <MapPin className="h-4 w-4 mr-1" />
                      {opportunity.location}
                    </div>
                    <div className="flex items-center text-sm text-stone">
                      <Calendar className="h-4 w-4 mr-1" />
                      Deadline: {opportunity.deadline}
                    </div>
                    <div className="flex items-center text-sm text-stone">
                      <Users className="h-4 w-4 mr-1" />
                      {opportunity.applicants} applicants •{" "}
                      {opportunity.successRate}% success rate
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {opportunity.sectors.slice(0, 3).map((sector) => (
                      <Badge key={sector} variant="outline" className="text-xs">
                        {sector}
                      </Badge>
                    ))}
                    {opportunity.sectors.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{opportunity.sectors.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-stone line-clamp-2">
                    {opportunity.description}
                  </p>

                  <div className="flex space-x-2 pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex-1 bg-transparent"
                          onClick={() => setSelectedOpportunity(opportunity)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{opportunity.title}</DialogTitle>
                          <DialogDescription>
                            {opportunity.organization}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedOpportunity && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Funding Amount
                                </h4>
                                <p className="text-lg font-bold text-aau-deep-blue">
                                  {selectedOpportunity.amount}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Type</h4>
                                <Badge
                                  className={getTypeColor(
                                    selectedOpportunity.type
                                  )}
                                >
                                  {selectedOpportunity.type}
                                </Badge>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Deadline</h4>
                                <p>{selectedOpportunity.deadline}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Location</h4>
                                <p>{selectedOpportunity.location}</p>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2">
                                Description
                              </h4>
                              <p>{selectedOpportunity.description}</p>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2">
                                Target Stages
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedOpportunity.stage.map(
                                  (stage: string) => (
                                    <Badge key={stage} variant="outline">
                                      {stage}
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2">Sectors</h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedOpportunity.sectors.map(
                                  (sector: string) => (
                                    <Badge key={sector} variant="outline">
                                      {sector}
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2">
                                Requirements
                              </h4>
                              <ul className="list-disc list-inside space-y-1">
                                {selectedOpportunity.requirements.map(
                                  (req: string, index: number) => (
                                    <li key={index} className="text-sm">
                                      {req}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>

                            <div className="flex space-x-2">
                              <Button
                                onClick={() =>
                                  handleApply(selectedOpportunity.id)
                                }
                                className="flex-1"
                              >
                                Apply Now
                              </Button>
                              <Button variant="outline" asChild>
                                <a
                                  href={selectedOpportunity.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Visit Website
                                </a>
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button
                      onClick={() => handleApply(opportunity.id)}
                      className="flex-1"
                    >
                      Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Other tab contents would filter by type */}
        <TabsContent value="grants">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities
              .filter((opp) => opp.type === "Grant")
              .map((opportunity) => (
                <Card
                  key={opportunity.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  {/* Same card structure as above */}
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {opportunity.title}
                    </CardTitle>
                    <CardDescription>
                      {opportunity.organization}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-aau-deep-blue mb-2">
                      {opportunity.amount}
                    </p>
                    <p className="text-sm text-stone mb-4">
                      {opportunity.description}
                    </p>
                    <Button
                      className="w-full"
                      onClick={() => handleApply(opportunity.id)}
                    >
                      Apply for Grant
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="competitions">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities
              .filter((opp) => opp.type === "Competition")
              .map((opportunity) => (
                <Card
                  key={opportunity.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {opportunity.title}
                    </CardTitle>
                    <CardDescription>
                      {opportunity.organization}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-aau-deep-blue mb-2">
                      {opportunity.amount}
                    </p>
                    <p className="text-sm text-stone mb-4">
                      {opportunity.description}
                    </p>
                    <Button
                      className="w-full"
                      onClick={() => handleApply(opportunity.id)}
                    >
                      Enter Competition
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="accelerators">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities
              .filter((opp) => opp.type === "Accelerator")
              .map((opportunity) => (
                <Card
                  key={opportunity.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {opportunity.title}
                    </CardTitle>
                    <CardDescription>
                      {opportunity.organization}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-aau-deep-blue mb-2">
                      {opportunity.amount}
                    </p>
                    <p className="text-sm text-stone mb-4">
                      {opportunity.description}
                    </p>
                    <Button
                      className="w-full"
                      onClick={() => handleApply(opportunity.id)}
                    >
                      Apply to Accelerator
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
