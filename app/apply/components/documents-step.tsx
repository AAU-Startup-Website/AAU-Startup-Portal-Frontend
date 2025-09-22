"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "@/components/forms/file-uploader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Presentation, ImageIcon } from "lucide-react"

interface DocumentsStepProps {
  data: any
  updateData: (data: any) => void
  errors: string[]
}

export function DocumentsStep({ data, updateData, errors }: DocumentsStepProps) {
  const handleFilesChange = (files: File[]) => {
    updateData({ documents: files })
  }

  const handleChange = (field: string, value: string) => {
    updateData({ [field]: value })
  }

  const documentTypes = [
    {
      title: "Business Plan",
      description: "Comprehensive business plan document",
      icon: <FileText className="h-5 w-5" />,
      badge: "Recommended",
    },
    {
      title: "Pitch Deck",
      description: "Presentation slides for your startup",
      icon: <Presentation className="h-5 w-5" />,
      badge: "Recommended",
    },
    {
      title: "Financial Projections",
      description: "Revenue and expense forecasts",
      icon: <FileText className="h-5 w-5" />,
      badge: "Optional",
    },
    {
      title: "Product Mockups",
      description: "Screenshots, wireframes, or prototypes",
      icon: <ImageIcon className="h-5 w-5" />,
      badge: "Optional",
    },
    {
      title: "Market Research",
      description: "Research data and analysis",
      icon: <FileText className="h-5 w-5" />,
      badge: "Optional",
    },
    {
      title: "Team CVs",
      description: "Resumes of key team members",
      icon: <FileText className="h-5 w-5" />,
      badge: "Optional",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Document Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Document Guidelines</CardTitle>
          <CardDescription>
            Upload supporting documents to strengthen your application. While most documents are optional, they help us
            better understand your startup and make informed decisions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documentTypes.map((docType, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="text-aau-blue">{docType.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-sm">{docType.title}</h4>
                    <Badge
                      variant={docType.badge === "Recommended" ? "default" : "secondary"}
                      className={docType.badge === "Recommended" ? "bg-aau-gold text-aau-blue" : ""}
                    >
                      {docType.badge}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{docType.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* File Upload */}
      <div className="space-y-2">
        <Label>Upload Documents</Label>
        <FileUploader
          onFilesChange={handleFilesChange}
          maxFiles={10}
          maxSize={25}
          acceptedTypes={[".pdf", ".doc", ".docx", ".ppt", ".pptx", ".jpg", ".jpeg", ".png", ".xlsx", ".xls"]}
          existingFiles={data.documents || []}
        />
        <p className="text-sm text-muted-foreground">
          Accepted formats: PDF, Word, PowerPoint, Excel, Images. Maximum 25MB per file, 10 files total.
        </p>
      </div>

      {/* Additional Information */}
      <div className="space-y-2">
        <Label htmlFor="additionalInfo">Additional Information</Label>
        <Textarea
          id="additionalInfo"
          placeholder="Is there anything else you'd like us to know about your startup? Any special circumstances, achievements, or context we should consider?"
          value={data.additionalInfo || ""}
          onChange={(e) => handleChange("additionalInfo", e.target.value)}
          className="min-h-[120px]"
        />
        <p className="text-sm text-muted-foreground">
          Use this space to share anything not covered in the previous sections.
        </p>
      </div>

      {/* Consent and Agreements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Important Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>• All information provided will be kept confidential and used only for evaluation purposes.</p>
          <p>• You may be contacted for additional information or clarification during the review process.</p>
          <p>• The review process typically takes 2-4 weeks. You will be notified of the decision via email.</p>
          <p>
            • Successful applicants will receive detailed information about the next steps and program requirements.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
