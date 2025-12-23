"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
import { createIdea, updateIdea, getIdea } from "@/lib/api";
import { getToken } from "@/lib/auth";

function ApplyPageContent() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const editId = searchParams.get("edit");
    if (editId) {
      loadIdeaForEditing(parseInt(editId));
    }
  }, [searchParams]);

  const loadIdeaForEditing = async (ideaId: number) => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) {
        alert("Please log in to edit ideas");
        return;
      }

      const idea = await getIdea(token, ideaId);

      // Transform idea data back to form format
      const formData = {
        companyName: idea.title,
        problemStatement: idea.problem_statement,
        targetAudience: idea.target_audience,
        problemSize: idea.problem_scale,
        currentSolutions: idea.existing_solutions,
        urgency: idea.problem_urgency,
        solutionDescription: idea.solution,
        valueProposition: idea.unique_value_proposition,
        productType: idea.product_type,
        technologies: idea.technologies_used
          ? idea.technologies_used.split(", ")
          : [],
        developmentStage: idea.development_stage,
        keyFeatures: idea.key_features,
        marketSize: idea.market_size_estimation,
        targetMarket: idea.target_market,
        marketTrends: idea.market_trend,
        competitors: idea.competitive_landscape,
        customerAcquisition: idea.customer_acquisition_strategy,
        revenueModel: idea.revenue_model,
        pricingStrategy: idea.pricing_strategy,
        teamVision: idea.team_vision,
        teamGaps: idea.hiring_plan,
        teamMembers: [], // This would need to be reconstructed if stored separately
        sectors: idea.industry ? idea.industry.split(", ") : [],
        businessStage: idea.business_stage,
        fundingNeeds: idea.funding_requirements,
        businessModel: idea.business_model,
        currentTraction: idea.current_traction,
        challenges: idea.key_challenges,
        timeline: idea.development_timeline,
      };

      setInitialData(formData);
      setIsEditing(true);
      setEditingId(ideaId);
    } catch (error) {
      console.error("Failed to load idea for editing:", error);
      alert("Failed to load idea for editing");
    } finally {
      setLoading(false);
    }
  };

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
      const token = getToken();
      if (!token) {
        alert("Please log in to submit an idea");
        return;
      }

      // Transform form data to match Idea model
      const ideaData = {
        title: formData.companyName || "Untitled Idea",
        description: formData.solutionDescription || "",
        problem_statement: formData.problemStatement || "",
        target_audience: formData.targetAudience || "",
        problem_scale: formData.problemSize || "",
        existing_solutions: formData.currentSolutions || "",
        problem_urgency: formData.urgency || "",
        solution: formData.solutionDescription || "",
        unique_value_proposition: formData.valueProposition || "",
        product_type: formData.productType || "",
        technologies_used: Array.isArray(formData.technologies)
          ? formData.technologies.join(", ")
          : formData.technologies || "",
        development_stage: formData.developmentStage || "",
        key_features: formData.keyFeatures || "",
        market_size_estimation: formData.marketSize || "",
        target_market: formData.targetMarket || "",
        market_trend: formData.marketTrends || "",
        competitive_landscape: formData.competitors || "",
        customer_acquisition_strategy: formData.customerAcquisition || "",
        revenue_model: formData.revenueModel || "",
        pricing_strategy: formData.pricingStrategy || "",
        team_vision: formData.teamVision || "",
        hiring_plan: formData.teamGaps || "",
        team_size: formData.teamMembers?.length || 0,
        industry: Array.isArray(formData.sectors)
          ? formData.sectors.join(", ")
          : formData.sectors || "",
        business_stage: formData.businessStage || "",
        funding_requirements: formData.fundingNeeds || "",
        business_model: formData.businessModel || "",
        current_traction: formData.currentTraction || "",
        key_challenges: formData.challenges || "",
        development_timeline: formData.timeline || "",
      };

      let result;
      if (isEditing && editingId) {
        // Update existing idea
        result = await updateIdea(token, editingId, ideaData);
      } else {
        // Create new idea
        result = await createIdea(token, ideaData);
      }

      console.log("Idea saved successfully:", result);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert(
        `Failed to ${isEditing ? "update" : "submit"} idea: ${
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
                Idea {isEditing ? "Updated" : "Submitted"} Successfully!
              </CardTitle>
              <CardDescription className="text-lg">
                Thank you for{" "}
                {isEditing ? "updating your idea" : "submitting your idea"} to
                the AAU Startups Portal.{" "}
                {isEditing
                  ? "Your changes have been saved."
                  : "We've received your idea and will review it carefully."}
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
            {isEditing ? "Editing Idea" : "Applications Open"}
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            {isEditing ? "Edit Your Idea" : "Submit Your Idea"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {isEditing
              ? "Update your idea details and resubmit for review."
              : "Share your innovative idea with Ethiopia's premier startup incubation program. Get mentorship, funding, and resources to turn your idea into a successful business."}
          </p>
        </div>

        {/* Application Form */}
        {loading ? (
          <div className="text-center py-8">Loading idea data...</div>
        ) : (
          <MultiStepForm
            steps={steps}
            onSubmit={handleSubmit}
            initialData={initialData}
          />
        )}
      </div>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background py-16 px-4 flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ApplyPageContent />
    </Suspense>
  );
}
