import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MapPin, Users, ExternalLink, Heart } from "lucide-react"
import Link from "next/link"

interface StartupCardProps {
  startup: {
    id: number
    name: string
    tagline: string
    description: string
    sector: string
    stage: string
    location: string
    logo: string
    metrics: {
      users: string
      growth: string
      funding: string
    }
    team: {
      size: number
    }
    mentor?: {
      assigned: boolean
      name?: string
    }
    tags: string[]
    featured?: boolean
  }
}

export function StartupCard({ startup }: StartupCardProps) {
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
    <Card
      className={`group hover:shadow-lg transition-all duration-200 ${startup.featured ? "ring-2 ring-aau-gold" : ""}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={startup.logo || "/placeholder.svg"} alt={startup.name} />
              <AvatarFallback className="bg-aau-blue text-white">{startup.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <CardTitle className="text-lg group-hover:text-aau-blue transition-colors">{startup.name}</CardTitle>
                {startup.featured && <Badge className="bg-aau-gold text-aau-blue text-xs">Featured</Badge>}
              </div>
              <CardDescription className="text-sm">{startup.tagline}</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{startup.description}</p>

        <div className="flex items-center space-x-2">
          <Badge className={getStageColor(startup.stage)}>{startup.stage}</Badge>
          <Badge variant="outline">{startup.sector}</Badge>
          {startup.mentor?.assigned && (
            <Badge variant="secondary" className="text-xs">
              Mentored
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 py-3 border-t border-b">
          <div className="text-center">
            <div className="text-sm font-semibold text-aau-blue">{startup.metrics.users}</div>
            <div className="text-xs text-muted-foreground">Users</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-green-600">{startup.metrics.growth}</div>
            <div className="text-xs text-muted-foreground">Growth</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-aau-blue">{startup.metrics.funding}</div>
            <div className="text-xs text-muted-foreground">Funding</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {startup.location}
            </div>
            <div className="flex items-center">
              <Users className="h-3 w-3 mr-1" />
              {startup.team.size}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-wrap gap-1">
            {startup.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {startup.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{startup.tags.length - 2}
              </Badge>
            )}
          </div>
          <Button asChild size="sm" className="bg-aau-blue hover:bg-aau-blue/90">
            <Link href={`/startups/${startup.id}`}>
              View Details
              <ExternalLink className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
