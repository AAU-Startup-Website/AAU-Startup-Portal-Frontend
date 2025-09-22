"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TagInput } from "@/components/forms/tag-input"
import { Plus, Trash2, User } from "lucide-react"

interface TeamMember {
  name: string
  role: string
  email: string
  experience: string
  skills: string[]
  linkedIn?: string
  commitment: string
}

interface TeamStepProps {
  data: any
  updateData: (data: any) => void
  errors: string[]
}

export function TeamStep({ data, updateData, errors }: TeamStepProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(
    data.teamMembers || [{ name: "", role: "", email: "", experience: "", skills: [], linkedIn: "", commitment: "" }],
  )

  const skillSuggestions = [
    "Software Development",
    "Product Management",
    "Marketing",
    "Sales",
    "Finance",
    "Operations",
    "UI/UX Design",
    "Data Science",
    "Business Development",
    "Strategy",
    "Legal",
    "HR",
  ]

  const updateTeamMember = (index: number, field: string, value: any) => {
    const updatedMembers = [...teamMembers]
    updatedMembers[index] = { ...updatedMembers[index], [field]: value }
    setTeamMembers(updatedMembers)
    updateData({ teamMembers: updatedMembers })
  }

  const addTeamMember = () => {
    const newMember: TeamMember = {
      name: "",
      role: "",
      email: "",
      experience: "",
      skills: [],
      linkedIn: "",
      commitment: "",
    }
    const updatedMembers = [...teamMembers, newMember]
    setTeamMembers(updatedMembers)
    updateData({ teamMembers: updatedMembers })
  }

  const removeTeamMember = (index: number) => {
    if (teamMembers.length > 1) {
      const updatedMembers = teamMembers.filter((_, i) => i !== index)
      setTeamMembers(updatedMembers)
      updateData({ teamMembers: updatedMembers })
    }
  }

  const handleChange = (field: string, value: string) => {
    updateData({ [field]: value })
  }

  return (
    <div className="space-y-6">
      {/* Team Overview */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="teamVision">Team Vision & Culture *</Label>
          <Textarea
            id="teamVision"
            placeholder="Describe your team's vision, working style, and culture. What makes your team unique?"
            value={data.teamVision || ""}
            onChange={(e) => handleChange("teamVision", e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="teamGaps">Skill Gaps & Hiring Plans</Label>
          <Textarea
            id="teamGaps"
            placeholder="What skills or roles are missing from your current team? Do you have plans to hire or find co-founders?"
            value={data.teamGaps || ""}
            onChange={(e) => handleChange("teamGaps", e.target.value)}
            className="min-h-[80px]"
          />
        </div>
      </div>

      {/* Team Members */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Team Members</h3>
          <Button onClick={addTeamMember} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>

        {teamMembers.map((member, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-lg">
                  <User className="h-5 w-5 mr-2" />
                  Team Member {index + 1}
                  {index === 0 && (
                    <span className="ml-2 text-sm font-normal text-muted-foreground">(Founder/Lead)</span>
                  )}
                </CardTitle>
                {teamMembers.length > 1 && (
                  <Button
                    onClick={() => removeTeamMember(index)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`name-${index}`}>Full Name *</Label>
                  <Input
                    id={`name-${index}`}
                    placeholder="John Doe"
                    value={member.name}
                    onChange={(e) => updateTeamMember(index, "name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`email-${index}`}>Email *</Label>
                  <Input
                    id={`email-${index}`}
                    type="email"
                    placeholder="john@example.com"
                    value={member.email}
                    onChange={(e) => updateTeamMember(index, "email", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`role-${index}`}>Role/Title *</Label>
                  <Input
                    id={`role-${index}`}
                    placeholder="CEO, CTO, Head of Marketing, etc."
                    value={member.role}
                    onChange={(e) => updateTeamMember(index, "role", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`commitment-${index}`}>Commitment Level *</Label>
                  <Select
                    value={member.commitment}
                    onValueChange={(value) => updateTeamMember(index, "commitment", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select commitment level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="advisor">Advisor</SelectItem>
                      <SelectItem value="consultant">Consultant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`experience-${index}`}>Experience & Background *</Label>
                <Textarea
                  id={`experience-${index}`}
                  placeholder="Describe relevant experience, education, and achievements"
                  value={member.experience}
                  onChange={(e) => updateTeamMember(index, "experience", e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Skills & Expertise</Label>
                <TagInput
                  tags={member.skills}
                  onTagsChange={(skills) => updateTeamMember(index, "skills", skills)}
                  placeholder="Add skills"
                  suggestions={skillSuggestions}
                  maxTags={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`linkedin-${index}`}>LinkedIn Profile (Optional)</Label>
                <Input
                  id={`linkedin-${index}`}
                  placeholder="https://linkedin.com/in/username"
                  value={member.linkedIn}
                  onChange={(e) => updateTeamMember(index, "linkedIn", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
