import { NextRequest, NextResponse } from "next/server";

// Mock data store
const mockApplications: any[] = [];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit") || 20);
  const from = Number(searchParams.get("from") || 0);
  const userId = searchParams.get("user_id");
  const status = searchParams.get("status");

  let filtered = mockApplications;
  
  if (userId) {
    filtered = filtered.filter(app => app.user_id === userId);
  }
  if (status) {
    filtered = filtered.filter(app => app.status === status);
  }

  const data = filtered.slice(from, from + limit);
  const count = filtered.length;
  
  return NextResponse.json({ data, count });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      problemStatement,
      targetAudience,
      problemSize,
      urgency,
      currentSolutions,
      solutionDescription,
      valueProposition,
      productType,
      developmentStage,
      marketSize,
      targetMarket,
      competitors,
      customerAcquisition,
      revenueModel,
      teamVision,
      teamMembers,
      teamGaps,
      companyName,
      sectors,
      businessStage,
      businessModel,
      fundingNeeds,
      traction,
      challenges,
      timeline,
      documents,
      additionalInfo,
      agreements,
      userId,
    } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "User authentication required" },
        { status: 401 }
      );
    }

    if (
      !companyName?.trim() ||
      !problemStatement?.trim() ||
      !solutionDescription?.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: company name, problem statement, and solution description are required",
        },
        { status: 400 }
      );
    }

    if (
      !teamMembers ||
      !Array.isArray(teamMembers) ||
      teamMembers.length === 0
    ) {
      return NextResponse.json(
        { error: "At least one team member is required" },
        { status: 400 }
      );
    }

    const existingAppIndex = mockApplications.findIndex(
      app => app.user_id === userId
    );

    const applicationData = {
      id: existingAppIndex >= 0 ? mockApplications[existingAppIndex].id : String(mockApplications.length + 1),
      user_id: userId,
      status: "submitted",
      problem_statement: problemStatement,
      target_audience: targetAudience,
      problem_size: problemSize,
      urgency,
      current_solutions: currentSolutions,
      solution_description: solutionDescription,
      value_proposition: valueProposition,
      product_type: productType,
      development_stage: developmentStage,
      market_size: marketSize,
      target_market: targetMarket,
      competitors,
      customer_acquisition: customerAcquisition,
      revenue_model: revenueModel,
      team_vision: teamVision,
      team_members: teamMembers,
      team_gaps: teamGaps,
      company_name: companyName,
      sectors,
      business_stage: businessStage,
      business_model: businessModel,
      funding_needs: fundingNeeds,
      traction,
      challenges,
      timeline,
      additional_info: additionalInfo,
      agreements,
      submitted_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    let result;
    if (existingAppIndex >= 0) {
      mockApplications[existingAppIndex] = applicationData;
      result = { data: applicationData, message: "Application updated successfully" };
    } else {
      mockApplications.push(applicationData);
      result = { data: applicationData, message: "Application submitted successfully" };
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
