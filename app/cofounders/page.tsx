import { AuthGuard } from "@/components/auth/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Briefcase, GraduationCap, MessageCircle, Filter } from "lucide-react"

export default function CoFoundersPage() {
  const coFounders = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Full-Stack Developer",
      location: "Addis Ababa",
      skills: ["React", "Node.js", "Python"],
      experience: "3 years",
      lookingFor: "Technical Co-founder",
      bio: "Passionate about fintech solutions for emerging markets",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Business Development",
      location: "Addis Ababa",
      skills: ["Marketing", "Sales", "Strategy"],
      experience: "5 years",
      lookingFor: "Technical Co-founder",
      bio: "Expert in scaling startups across African markets",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Aisha Mohammed",
      title: "Product Designer",
      location: "Addis Ababa",
      skills: ["UI/UX", "Figma", "Research"],
      experience: "4 years",
      lookingFor: "Business Co-founder",
      bio: "Designing inclusive products for diverse communities",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <AuthGuard requiredRoles={["founder", "mentor"]}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-muted/30 py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-4xl font-bold">Find Your Co-Founder</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Connect with talented individuals who share your entrepreneurial vision
              </p>
            </div>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Input placeholder="Search by skills, experience, or interests..." className="h-12" />
                </div>
                <Select>
                  <SelectTrigger className="w-full md:w-48 h-12">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="addis-ababa">Addis Ababa</SelectItem>
                    <SelectItem value="dire-dawa">Dire Dawa</SelectItem>
                    <SelectItem value="bahir-dar">Bahir Dar</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full md:w-48 h-12">
                    <SelectValue placeholder="Looking For" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Co-founder</SelectItem>
                    <SelectItem value="business">Business Co-founder</SelectItem>
                    <SelectItem value="marketing">Marketing Co-founder</SelectItem>
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

        {/* Co-founders Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold">Available Co-Founders</h2>
                <p className="text-muted-foreground">{coFounders.length} potential matches found</p>
              </div>
              <Button variant="outline">Post Your Profile</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coFounders.map((person) => (
                <Card key={person.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                        <AvatarFallback className="bg-aau-blue text-white">
                          {person.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg">{person.name}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Briefcase className="h-3 w-3 mr-1" />
                          {person.title}
                        </CardDescription>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {person.location}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{person.bio}</p>

                    <div>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <GraduationCap className="h-3 w-3 mr-1" />
                        {person.experience} experience
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {person.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium mb-3">Looking for: {person.lookingFor}</p>
                      <Button className="w-full bg-aau-blue hover:bg-aau-blue/90">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Profiles
              </Button>
            </div>
          </div>
        </section>
      </div>
    </AuthGuard>
  )
}
