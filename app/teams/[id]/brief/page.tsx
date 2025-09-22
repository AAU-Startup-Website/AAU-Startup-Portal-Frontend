"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Users, LinkIcon, FileText, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TeamBriefPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [progress, setProgress] = useState(0)

  const [briefData, setBriefData] = useState({
    teamMembers: [{ name: "", role: "", bio: "", linkedin: "", email: "" }],
    companyDescription: "",
    missionStatement: "",
    visionStatement: "",
    keyAchievements: "",
    futureGoals: "",
    websiteUrl: "",
    socialLinks: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
    },
  })

  const startupInfo = {
    id: params.id,
    name: "EthioPay",
    sector: "FinTech",
    stage: "MVP",
    approvalDate: "2024-01-15",
    deadline: "2024-02-15",
  }

  const addTeamMember = () => {
    setBriefData((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: "", role: "", bio: "", linkedin: "", email: "" }],
    }))
  }

  const updateTeamMember = (index: number, field: string, value: string) => {
    setBriefData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) => (i === index ? { ...member, [field]: value } : member)),
    }))
  }

  const removeTeamMember = (index: number) => {
    if (briefData.teamMembers.length > 1) {
      setBriefData((prev) => ({
        ...prev,
        teamMembers: prev.teamMembers.filter((_, i) => i !== index),
      }))
    }
  }

  const calculateProgress = () => {
    const fields = [
      briefData.companyDescription,
      briefData.missionStatement,
      briefData.visionStatement,
      briefData.keyAchievements,
      briefData.futureGoals,
      briefData.websiteUrl,
    ]
    const teamComplete = briefData.teamMembers.every(
      (member) => member.name && member.role && member.bio && member.email,
    )
    const fieldsComplete = fields.filter((field) => field.trim()).length
    const totalFields = fields.length + (teamComplete ? 1 : 0)
    return Math.round((fieldsComplete / (fields.length + 1)) * 100)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    for (let i = 0; i <= 100; i += 10) {
      setProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    toast({
      title: "Brief Submitted Successfully!",
      description: "Your team brief has been submitted and will be reviewed before publication.",
    })

    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
  }

  const currentProgress = calculateProgress()

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-aau-deep-blue mb-2">Team Brief Submission</h1>
            <p className="text-stone">Complete your startup profile for public listing</p>
          </div>
          <Badge variant="secondary" className="text-sm">
            <Clock className="mr-1 h-3 w-3" />
            Due: Feb 15, 2024
          </Badge>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Completion Progress</span>
              <span className="text-sm text-stone">{currentProgress}%</span>
            </div>
            <Progress value={currentProgress} className="h-2" />
          </CardContent>
        </Card>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Congratulations! Your startup "{startupInfo.name}" has been approved. Please complete this brief within 30
            days to have your startup listed publicly on the portal.
          </AlertDescription>
        </Alert>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Startup Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Startup Information
            </CardTitle>
            <CardDescription>Provide detailed information about your startup</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-aau-light-blue rounded-lg">
              <div>
                <Label className="text-sm font-medium text-stone">Startup Name</Label>
                <p className="font-semibold">{startupInfo.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-stone">Sector</Label>
                <p className="font-semibold">{startupInfo.sector}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-stone">Stage</Label>
                <p className="font-semibold">{startupInfo.stage}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-stone">Approval Date</Label>
                <p className="font-semibold">{startupInfo.approvalDate}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyDescription">Company Description *</Label>
              <Textarea
                id="companyDescription"
                value={briefData.companyDescription}
                onChange={(e) => setBriefData((prev) => ({ ...prev, companyDescription: e.target.value }))}
                placeholder="Provide a comprehensive description of your startup, what you do, and the problem you solve..."
                rows={4}
                required
              />
              <p className="text-xs text-stone">Maximum 500 characters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="missionStatement">Mission Statement *</Label>
                <Textarea
                  id="missionStatement"
                  value={briefData.missionStatement}
                  onChange={(e) => setBriefData((prev) => ({ ...prev, missionStatement: e.target.value }))}
                  placeholder="What is your startup's mission?"
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="visionStatement">Vision Statement *</Label>
                <Textarea
                  id="visionStatement"
                  value={briefData.visionStatement}
                  onChange={(e) => setBriefData((prev) => ({ ...prev, visionStatement: e.target.value }))}
                  placeholder="What is your long-term vision?"
                  rows={3}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keyAchievements">Key Achievements *</Label>
              <Textarea
                id="keyAchievements"
                value={briefData.keyAchievements}
                onChange={(e) => setBriefData((prev) => ({ ...prev, keyAchievements: e.target.value }))}
                placeholder="List your major achievements, milestones, awards, or recognition..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="futureGoals">Future Goals *</Label>
              <Textarea
                id="futureGoals"
                value={briefData.futureGoals}
                onChange={(e) => setBriefData((prev) => ({ ...prev, futureGoals: e.target.value }))}
                placeholder="What are your goals for the next 1-2 years?"
                rows={3}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Team Members
                </CardTitle>
                <CardDescription>Add information about your core team members</CardDescription>
              </div>
              <Button type="button" variant="outline" onClick={addTeamMember}>
                Add Member
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {briefData.teamMembers.map((member, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Team Member {index + 1}</h4>
                  {briefData.teamMembers.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTeamMember(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input
                      value={member.name}
                      onChange={(e) => updateTeamMember(index, "name", e.target.value)}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role/Position *</Label>
                    <Input
                      value={member.role}
                      onChange={(e) => updateTeamMember(index, "role", e.target.value)}
                      placeholder="e.g., CEO, CTO, Co-founder"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      value={member.email}
                      onChange={(e) => updateTeamMember(index, "email", e.target.value)}
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>LinkedIn Profile</Label>
                    <Input
                      value={member.linkedin}
                      onChange={(e) => updateTeamMember(index, "linkedin", e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Bio *</Label>
                  <Textarea
                    value={member.bio}
                    onChange={(e) => updateTeamMember(index, "bio", e.target.value)}
                    placeholder="Brief bio highlighting experience, skills, and role in the startup..."
                    rows={3}
                    required
                  />
                  <p className="text-xs text-stone">Maximum 200 characters</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Links & Social Media */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LinkIcon className="mr-2 h-5 w-5" />
              Links & Social Media
            </CardTitle>
            <CardDescription>Add your website and social media links</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="websiteUrl">Website URL *</Label>
              <Input
                id="websiteUrl"
                type="url"
                value={briefData.websiteUrl}
                onChange={(e) => setBriefData((prev) => ({ ...prev, websiteUrl: e.target.value }))}
                placeholder="https://yourwebsite.com"
                required
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-semibold">Social Media Links (Optional)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>LinkedIn</Label>
                  <Input
                    value={briefData.socialLinks.linkedin}
                    onChange={(e) =>
                      setBriefData((prev) => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, linkedin: e.target.value },
                      }))
                    }
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Twitter</Label>
                  <Input
                    value={briefData.socialLinks.twitter}
                    onChange={(e) =>
                      setBriefData((prev) => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, twitter: e.target.value },
                      }))
                    }
                    placeholder="https://twitter.com/yourcompany"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Facebook</Label>
                  <Input
                    value={briefData.socialLinks.facebook}
                    onChange={(e) =>
                      setBriefData((prev) => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, facebook: e.target.value },
                      }))
                    }
                    placeholder="https://facebook.com/yourcompany"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Instagram</Label>
                  <Input
                    value={briefData.socialLinks.instagram}
                    onChange={(e) =>
                      setBriefData((prev) => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, instagram: e.target.value },
                      }))
                    }
                    placeholder="https://instagram.com/yourcompany"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submission */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Ready to Submit?</h3>
                <p className="text-sm text-stone">
                  Please review all information before submitting. You can edit this later if needed.
                </p>
              </div>
              <div className="flex space-x-3">
                <Button type="button" variant="outline">
                  Save Draft
                </Button>
                <Button type="submit" disabled={isSubmitting || currentProgress < 80} className="min-w-[120px]">
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </div>
                  ) : (
                    "Submit Brief"
                  )}
                </Button>
              </div>
            </div>

            {isSubmitting && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Submitting your brief...</span>
                  <span className="text-sm">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
