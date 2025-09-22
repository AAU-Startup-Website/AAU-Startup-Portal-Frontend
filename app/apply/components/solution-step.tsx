"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TagInput } from "@/components/forms/tag-input"

interface SolutionStepProps {
  data: any
  updateData: (data: any) => void
  errors: string[]
}

export function SolutionStep({ data, updateData, errors }: SolutionStepProps) {
  const handleChange = (field: string, value: string) => {
    updateData({ [field]: value })
  }

  const handleTagsChange = (field: string, tags: string[]) => {
    updateData({ [field]: tags })
  }

  const technologySuggestions = [
    "Mobile App",
    "Web Platform",
    "AI/ML",
    "Blockchain",
    "IoT",
    "Cloud Computing",
    "Data Analytics",
    "API Integration",
    "Mobile Payment",
    "E-commerce",
    "SaaS",
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="solutionDescription">Solution Description *</Label>
        <Textarea
          id="solutionDescription"
          placeholder="Describe your proposed solution. How does it address the problem you identified?"
          value={data.solutionDescription || ""}
          onChange={(e) => handleChange("solutionDescription", e.target.value)}
          className="min-h-[120px]"
        />
        <p className="text-sm text-muted-foreground">
          Explain your approach and how it solves the problem better than existing solutions.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="valueProposition">Unique Value Proposition *</Label>
        <Textarea
          id="valueProposition"
          placeholder="What makes your solution unique? Why would customers choose you over alternatives?"
          value={data.valueProposition || ""}
          onChange={(e) => handleChange("valueProposition", e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="productType">Product Type *</Label>
        <Select value={data.productType || ""} onValueChange={(value) => handleChange("productType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select your product type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mobile-app">Mobile Application</SelectItem>
            <SelectItem value="web-platform">Web Platform</SelectItem>
            <SelectItem value="physical-product">Physical Product</SelectItem>
            <SelectItem value="service">Service</SelectItem>
            <SelectItem value="marketplace">Marketplace</SelectItem>
            <SelectItem value="saas">Software as a Service (SaaS)</SelectItem>
            <SelectItem value="hardware">Hardware Solution</SelectItem>
            <SelectItem value="hybrid">Hybrid Solution</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Technologies Used</Label>
        <TagInput
          tags={data.technologies || []}
          onTagsChange={(tags) => handleTagsChange("technologies", tags)}
          placeholder="Add technologies (e.g., React, Python, AWS)"
          suggestions={technologySuggestions}
          maxTags={8}
        />
        <p className="text-sm text-muted-foreground">List the key technologies or tools you plan to use.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="developmentStage">Development Stage *</Label>
        <Select value={data.developmentStage || ""} onValueChange={(value) => handleChange("developmentStage", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Current development stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="idea">Idea Stage</SelectItem>
            <SelectItem value="prototype">Prototype/MVP</SelectItem>
            <SelectItem value="beta">Beta Testing</SelectItem>
            <SelectItem value="launched">Launched Product</SelectItem>
            <SelectItem value="scaling">Scaling</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="keyFeatures">Key Features</Label>
        <Textarea
          id="keyFeatures"
          placeholder="List the main features of your solution (3-5 key features)"
          value={data.keyFeatures || ""}
          onChange={(e) => handleChange("keyFeatures", e.target.value)}
          className="min-h-[100px]"
        />
      </div>
    </div>
  )
}
