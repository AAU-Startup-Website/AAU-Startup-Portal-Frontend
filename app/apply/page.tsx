"use client";

import { useState } from "react";
import { MultiStepForm } from "@/components/forms/multi-step-form";
import { ProblemStep } from "./components/problem-step";
import { SolutionStep } from "./components/solution-step";
import { MarketStep } from "./components/market-step";
import { TeamStep } from "./components/team-step";
import { BusinessStep } from "./components/business-step";
import { DocumentsStep } from "./components/documents-step";
import { ReviewStep } from "./components/review-step";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Users, Target } from "lucide-react";

export default function ApplyPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = [
    {
      id: "problem",
      title: "Problem Definition",
      description: "Define the problem you're solving and who faces it",
      component: ProblemStep,
      validation: (data: any) => {
        const errors: string[] = [];
        if (!data.problemStatement?.trim())
          errors.push("Problem statement is required");
        if (!data.targetAudience?.trim())
          errors.push("Target audience is required");
        if (!data.problemSize) errors.push("Problem scale is required");
        if (!data.urgency) errors.push("Problem urgency is required");
        return errors;
      },
    },
    {
      id: "solution",
      title: "Solution & Product",
      description: "Describe your solution and how it addresses the problem",
      component: SolutionStep,
      validation: (data: any) => {
        const errors: string[] = [];
        if (!data.solutionDescription?.trim())
          errors.push("Solution description is required");
        if (!data.valueProposition?.trim())
          errors.push("Value proposition is required");
        if (!data.productType) errors.push("Product type is required");
        if (!data.developmentStage)
          errors.push("Development stage is required");
        return errors;
      },
    },
    {
      id: "market",
      title: "Market Analysis",
      description: "Analyze your market opportunity and competitive landscape",
      component: MarketStep,
      validation: (data: any) => {
        const errors: string[] = [];
        if (!data.marketSize?.trim())
          errors.push("Market size estimation is required");
        if (!data.targetMarket?.trim())
          errors.push("Target market is required");
        if (!data.competitors?.trim())
          errors.push("Competitive analysis is required");
        if (!data.customerAcquisition?.trim())
          errors.push("Customer acquisition strategy is required");
        if (!data.revenueModel) errors.push("Revenue model is required");
        return errors;
      },
    },
    {
      id: "team",
      title: "Team & Expertise",
      description: "Introduce your team and their qualifications",
      component: TeamStep,
      validation: (data: any) => {
        const errors: string[] = [];
        if (!data.teamVision?.trim()) errors.push("Team vision is required");
        if (!data.teamMembers || data.teamMembers.length === 0) {
          errors.push("At least one team member is required");
        } else {
          data.teamMembers.forEach((member: any, index: number) => {
            if (!member.name?.trim())
              errors.push(`Team member ${index + 1}: Name is required`);
            if (!member.role?.trim())
              errors.push(`Team member ${index + 1}: Role is required`);
            if (!member.email?.trim())
              errors.push(`Team member ${index + 1}: Email is required`);
            if (!member.experience?.trim())
              errors.push(`Team member ${index + 1}: Experience is required`);
            if (!member.commitment)
              errors.push(
                `Team member ${index + 1}: Commitment level is required`
              );
          });
        }
        return errors;
      },
    },
    {
      id: "business",
      title: "Business Details",
      description: "Provide business model and strategic information",
      component: BusinessStep,
      validation: (data: any) => {
        const errors: string[] = [];
        if (!data.companyName?.trim()) errors.push("Company name is required");
        if (!data.sectors || data.sectors.length === 0)
          errors.push("At least one industry sector is required");
        if (!data.businessStage) errors.push("Business stage is required");
        if (!data.businessModel?.trim())
          errors.push("Business model is required");
        return errors;
      },
    },
    {
      id: "documents",
      title: "Documents & Additional Info",
      description: "Upload supporting documents and provide additional context",
      component: DocumentsStep,
      validation: (data: any) => {
        // Documents are optional, so no validation errors
        return [];
      },
    },
    {
      id: "review",
      title: "Review & Submit",
      description: "Review your application and submit",
      component: ReviewStep,
      validation: (data: any) => {
        const errors: string[] = [];
        if (!data.agreements?.accuracy)
          errors.push("Please confirm information accuracy");
        if (!data.agreements?.terms)
          errors.push("Please accept the terms of service");
        if (!data.agreements?.privacy)
          errors.push("Please accept the privacy policy");
        if (!data.agreements?.communication)
          errors.push("Please consent to communications");
        return errors;
      },
    },
  ];

  const handleSubmit = async (formData: any) => {
    try {
      // Get current user from localStorage (mock implementation)
      const storedUser = localStorage.getItem("auth_user");
      if (!storedUser) {
        alert("Please log in to submit an application");
        return;
      }

      const user = JSON.parse(storedUser);

      // Prepare submission data
      const submissionData = {
        ...formData,
        userId: user.id,
      };

      // Submit to API
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit application");
      }

      const result = await response.json();
      console.log("Application submitted successfully:", result);

      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert(
        `Failed to submit application: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">
                Application Submitted Successfully!
              </CardTitle>
              <CardDescription className="text-lg">
                Thank you for applying to the AAU Startups Portal. We've
                received your application and will review it carefully.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <div className="mx-auto w-10 h-10 bg-aau-blue/10 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-aau-blue" />
                  </div>
                  <h3 className="font-medium">Review Process</h3>
                  <p className="text-sm text-muted-foreground">2-4 weeks</p>
                </div>
                <div className="space-y-2">
                  <div className="mx-auto w-10 h-10 bg-aau-blue/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-aau-blue" />
                  </div>
                  <h3 className="font-medium">Expert Review</h3>
                  <p className="text-sm text-muted-foreground">
                    Industry mentors
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="mx-auto w-10 h-10 bg-aau-blue/10 rounded-full flex items-center justify-center">
                    <Target className="h-5 w-5 text-aau-blue" />
                  </div>
                  <h3 className="font-medium">Next Steps</h3>
                  <p className="text-sm text-muted-foreground">
                    Email notification
                  </p>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg text-left">
                <h4 className="font-medium mb-2">What happens next?</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• You'll receive a confirmation email within 24 hours</li>
                  <li>• Our review committee will evaluate your application</li>
                  <li>• We may contact you for additional information</li>
                  <li>• You'll be notified of the decision via email</li>
                  <li>
                    • Successful applicants will receive onboarding information
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => (window.location.href = "/")}
                  className="px-6 py-2 bg-aau-blue text-white rounded-md hover:bg-aau-blue/90 transition-colors"
                >
                  Return to Home
                </button>
                <button
                  onClick={() => (window.location.href = "/startups")}
                  className="px-6 py-2 border border-aau-blue text-aau-blue rounded-md hover:bg-aau-blue/5 transition-colors"
                >
                  Browse Startups
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-aau-gold text-aau-blue mb-4">
            Applications Open
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            Apply to AAU Startups Portal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join Ethiopia's premier startup incubation program. Get mentorship,
            funding, and resources to turn your idea into a successful business.
          </p>
        </div>

        {/* Application Form */}
        <MultiStepForm steps={steps} onSubmit={handleSubmit} initialData={{}} />
      </div>
    </div>
  );
}
