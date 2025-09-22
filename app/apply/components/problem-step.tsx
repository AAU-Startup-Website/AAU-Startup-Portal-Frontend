"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProblemStepProps {
  data: any
  updateData: (data: any) => void
  errors: string[]
}

export function ProblemStep({ data, updateData, errors }: ProblemStepProps) {
  const handleChange = (field: string, value: string) => {
    updateData({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="problemStatement">Problem Statement *</Label>
        <Textarea
          id="problemStatement"
          placeholder="Describe the problem your startup aims to solve. Be specific about who faces this problem and why it matters."
          value={data.problemStatement || ""}
          onChange={(e) => handleChange("problemStatement", e.target.value)}
          className="min-h-[120px]"
        />
        <p className="text-sm text-muted-foreground">
          Clearly articulate the pain point or challenge your target audience faces.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetAudience">Target Audience *</Label>
        <Input
          id="targetAudience"
          placeholder="e.g., Small business owners in Ethiopia, University students, Rural farmers"
          value={data.targetAudience || ""}
          onChange={(e) => handleChange("targetAudience", e.target.value)}
        />
        <p className="text-sm text-muted-foreground">Who specifically experiences this problem?</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="problemSize">Problem Scale *</Label>
        <Select value={data.problemSize || ""} onValueChange={(value) => handleChange("problemSize", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select the scale of the problem" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="local">Local (City/Region)</SelectItem>
            <SelectItem value="national">National (Ethiopia)</SelectItem>
            <SelectItem value="regional">Regional (East Africa)</SelectItem>
            <SelectItem value="continental">Continental (Africa)</SelectItem>
            <SelectItem value="global">Global</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentSolutions">Existing Solutions</Label>
        <Textarea
          id="currentSolutions"
          placeholder="What solutions currently exist for this problem? What are their limitations?"
          value={data.currentSolutions || ""}
          onChange={(e) => handleChange("currentSolutions", e.target.value)}
          className="min-h-[100px]"
        />
        <p className="text-sm text-muted-foreground">Describe current alternatives and why they fall short.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="urgency">Problem Urgency *</Label>
        <Select value={data.urgency || ""} onValueChange={(value) => handleChange("urgency", value)}>
          <SelectTrigger>
            <SelectValue placeholder="How urgent is solving this problem?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="critical">Critical - Immediate need</SelectItem>
            <SelectItem value="high">High - Important to solve soon</SelectItem>
            <SelectItem value="medium">Medium - Moderate priority</SelectItem>
            <SelectItem value="low">Low - Nice to have solution</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
