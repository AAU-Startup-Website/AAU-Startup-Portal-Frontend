"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TagInput } from "@/components/forms/tag-input"

interface BusinessStepProps {
  data: any
  updateData: (data: any) => void
  errors: string[]
}

export function BusinessStep({ data, updateData, errors }: BusinessStepProps) {
  const handleChange = (field: string, value: string) => {
    updateData({ [field]: value })
  }

  const handleTagsChange = (field: string, tags: string[]) => {
    updateData({ [field]: tags })
  }

  const sectorSuggestions = [
    "FinTech",
    "EdTech",
    "HealthTech",
    "AgTech",
    "E-commerce",
    "Logistics",
    "Energy",
    "CleanTech",
    "PropTech",
    "FoodTech",
    "RetailTech",
    "InsurTech",
    "LegalTech",
    "HRTech",
    "MarketingTech",
    "Entertainment",
    "Gaming",
    "Social Impact",
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="companyName">Company/Startup Name *</Label>
        <Input
          id="companyName"
          placeholder="Enter your startup name"
          value={data.companyName || ""}
          onChange={(e) => handleChange("companyName", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Industry Sector *</Label>
        <TagInput
          tags={data.sectors || []}
          onTagsChange={(tags) => handleTagsChange("sectors", tags)}
          placeholder="Add industry sectors"
          suggestions={sectorSuggestions}
          maxTags={3}
        />
        <p className="text-sm text-muted-foreground">Select up to 3 sectors that best describe your business.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessStage">Business Stage *</Label>
        <Select value={data.businessStage || ""} onValueChange={(value) => handleChange("businessStage", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select your current business stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ideation">Ideation - Concept development</SelectItem>
            <SelectItem value="validation">Validation - Testing assumptions</SelectItem>
            <SelectItem value="mvp">MVP - Building minimum viable product</SelectItem>
            <SelectItem value="early-traction">Early Traction - First customers</SelectItem>
            <SelectItem value="growth">Growth - Scaling operations</SelectItem>
            <SelectItem value="expansion">Expansion - New markets/products</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fundingNeeds">Funding Requirements</Label>
        <Textarea
          id="fundingNeeds"
          placeholder="How much funding do you need? What will you use it for? Include timeline and milestones."
          value={data.fundingNeeds || ""}
          onChange={(e) => handleChange("fundingNeeds", e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessModel">Business Model *</Label>
        <Textarea
          id="businessModel"
          placeholder="Describe how your business creates, delivers, and captures value. How do you make money?"
          value={data.businessModel || ""}
          onChange={(e) => handleChange("businessModel", e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="traction">Current Traction</Label>
        <Textarea
          id="traction"
          placeholder="Share any metrics, achievements, or progress you've made (users, revenue, partnerships, etc.)"
          value={data.traction || ""}
          onChange={(e) => handleChange("traction", e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="challenges">Key Challenges</Label>
        <Textarea
          id="challenges"
          placeholder="What are the main challenges you face or expect to face? How do you plan to address them?"
          value={data.challenges || ""}
          onChange={(e) => handleChange("challenges", e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeline">Development Timeline</Label>
        <Textarea
          id="timeline"
          placeholder="What are your key milestones for the next 6-12 months?"
          value={data.timeline || ""}
          onChange={(e) => handleChange("timeline", e.target.value)}
          className="min-h-[80px]"
        />
      </div>
    </div>
  )
}
