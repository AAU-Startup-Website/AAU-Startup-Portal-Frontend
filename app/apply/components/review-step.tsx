"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { Building, Users, Lightbulb, TrendingUp, FileText, CheckCircle, AlertCircle, Edit } from "lucide-react"

interface ReviewStepProps {
  data: any
  updateData: (data: any) => void
  errors: string[]
}

export function ReviewStep({ data, updateData, errors }: ReviewStepProps) {
  const [agreements, setAgreements] = useState({
    accuracy: false,
    terms: false,
    privacy: false,
    communication: false,
  })

  const handleAgreementChange = (field: string, checked: boolean) => {
    const newAgreements = { ...agreements, [field]: checked }
    setAgreements(newAgreements)
    updateData({ agreements: newAgreements })
  }

  const allAgreementsChecked = Object.values(agreements).every(Boolean)

  const sections = [
    {
      title: "Problem & Solution",
      icon: <Lightbulb className="h-5 w-5" />,
      items: [
        { label: "Problem Statement", value: data.problemStatement },
        { label: "Target Audience", value: data.targetAudience },
        { label: "Solution Description", value: data.solutionDescription },
        { label: "Value Proposition", value: data.valueProposition },
        { label: "Product Type", value: data.productType },
        { label: "Development Stage", value: data.developmentStage },
      ],
    },
    {
      title: "Market & Business",
      icon: <TrendingUp className="h-5 w-5" />,
      items: [
        { label: "Market Size", value: data.marketSize },
        { label: "Target Market", value: data.targetMarket },
        { label: "Revenue Model", value: data.revenueModel },
        { label: "Business Model", value: data.businessModel },
        { label: "Customer Acquisition", value: data.customerAcquisition },
      ],
    },
    {
      title: "Company Details",
      icon: <Building className="h-5 w-5" />,
      items: [
        { label: "Company Name", value: data.companyName },
        { label: "Business Stage", value: data.businessStage },
        { label: "Industry Sectors", value: data.sectors?.join(", ") },
        { label: "Technologies", value: data.technologies?.join(", ") },
      ],
    },
    {
      title: "Team Information",
      icon: <Users className="h-5 w-5" />,
      items: [
        { label: "Team Size", value: data.teamMembers?.length || 0 },
        { label: "Team Vision", value: data.teamVision },
      ],
    },
  ]

  const getCompletionStatus = (items: any[]) => {
    const completed = items.filter((item) => item.value && item.value.toString().trim()).length
    return { completed, total: items.length, percentage: Math.round((completed / items.length) * 100) }
  }

  return (
    <div className="space-y-6">
      {/* Application Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Application Summary
          </CardTitle>
          <CardDescription>
            Review your application details before submission. You can go back to edit any section.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Section Reviews */}
      {sections.map((section, index) => {
        const status = getCompletionStatus(section.items)
        return (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  {section.icon}
                  {section.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={status.percentage >= 80 ? "default" : "secondary"}
                    className={status.percentage >= 80 ? "bg-green-100 text-green-800" : ""}
                  >
                    {status.completed}/{status.total} Complete
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.value ? (
                          typeof item.value === "string" && item.value.length > 100 ? (
                            `${item.value.substring(0, 100)}...`
                          ) : (
                            item.value.toString()
                          )
                        ) : (
                          <span className="text-destructive">Not provided</span>
                        )}
                      </p>
                    </div>
                    <div className="ml-4">
                      {item.value ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}

      {/* Team Members Detail */}
      {data.teamMembers && data.teamMembers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Members ({data.teamMembers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.teamMembers.map((member: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{member.name || "Name not provided"}</h4>
                      <p className="text-sm text-muted-foreground">{member.role || "Role not specified"}</p>
                    </div>
                    <Badge variant="outline">{member.commitment || "Commitment not specified"}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {member.experience
                      ? member.experience.length > 150
                        ? `${member.experience.substring(0, 150)}...`
                        : member.experience
                      : "Experience not provided"}
                  </p>
                  {member.skills && member.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {member.skills.slice(0, 5).map((skill: string, skillIndex: number) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {member.skills.length > 5 && (
                        <Badge variant="secondary" className="text-xs">
                          +{member.skills.length - 5} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documents */}
      {data.documents && data.documents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Uploaded Documents ({data.documents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.documents.map((file: File, index: number) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Terms and Agreements */}
      <Card>
        <CardHeader>
          <CardTitle>Terms and Agreements</CardTitle>
          <CardDescription>
            Please review and accept the following terms before submitting your application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="accuracy"
              checked={agreements.accuracy}
              onCheckedChange={(checked) => handleAgreementChange("accuracy", checked as boolean)}
            />
            <div className="space-y-1 leading-none">
              <label htmlFor="accuracy" className="text-sm font-medium cursor-pointer">
                Information Accuracy
              </label>
              <p className="text-xs text-muted-foreground">
                I confirm that all information provided in this application is accurate and complete to the best of my
                knowledge.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={agreements.terms}
              onCheckedChange={(checked) => handleAgreementChange("terms", checked as boolean)}
            />
            <div className="space-y-1 leading-none">
              <label htmlFor="terms" className="text-sm font-medium cursor-pointer">
                Terms of Service
              </label>
              <p className="text-xs text-muted-foreground">
                I agree to the AAU Startups Portal Terms of Service and Program Guidelines.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="privacy"
              checked={agreements.privacy}
              onCheckedChange={(checked) => handleAgreementChange("privacy", checked as boolean)}
            />
            <div className="space-y-1 leading-none">
              <label htmlFor="privacy" className="text-sm font-medium cursor-pointer">
                Privacy Policy
              </label>
              <p className="text-xs text-muted-foreground">
                I understand how my personal and business information will be used as outlined in the Privacy Policy.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="communication"
              checked={agreements.communication}
              onCheckedChange={(checked) => handleAgreementChange("communication", checked as boolean)}
            />
            <div className="space-y-1 leading-none">
              <label htmlFor="communication" className="text-sm font-medium cursor-pointer">
                Communication Consent
              </label>
              <p className="text-xs text-muted-foreground">
                I consent to receive communications regarding my application and program updates via email.
              </p>
            </div>
          </div>

          {!allAgreementsChecked && (
            <div className="flex items-center space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                Please accept all terms and agreements to submit your application.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
