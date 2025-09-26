import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as
  | string
  | undefined;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const serverClient = createClient(supabaseUrl, serviceRoleKey || anonKey);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit") || 20);
  const from = Number(searchParams.get("from") || 0);
  const to = from + limit - 1;
  const userId = searchParams.get("user_id");
  const status = searchParams.get("status");

  let query = serverClient
    .from("applications")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (userId) query = query.eq("user_id", userId);
  if (status) query = query.eq("status", status);

  const { data, error, count } = await query.range(from, to);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data, count });
}

export async function POST(req: NextRequest) {
  if (!serviceRoleKey) {
    return NextResponse.json(
      { error: "Write operations not enabled (missing service role key)." },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const {
      // Problem step
      problemStatement,
      targetAudience,
      problemSize,
      urgency,
      currentSolutions,
      // Solution step
      solutionDescription,
      valueProposition,
      productType,
      developmentStage,
      // Market step
      marketSize,
      targetMarket,
      competitors,
      customerAcquisition,
      revenueModel,
      // Team step
      teamVision,
      teamMembers,
      teamGaps,
      // Business step
      companyName,
      sectors,
      businessStage,
      businessModel,
      fundingNeeds,
      traction,
      challenges,
      timeline,
      // Documents step
      documents,
      additionalInfo,
      // Agreements
      agreements,
      // User info (from auth)
      userId,
    } = body;

    // Validate required userId
    if (!userId) {
      return NextResponse.json(
        { error: "User authentication required" },
        { status: 401 }
      );
    }

    // Check if user exists in users table, create if not
    let userExists;
    try {
      const userResult = await serverClient
        .from("users")
        .select("id, email, first_name, last_name")
        .eq("id", userId)
        .single();

      userExists = userResult.data;
    } catch (error) {
      // Table might not exist yet
      console.log("Users table query failed:", error);
    }

    if (!userExists) {
      // Try to get user info from auth.users to create profile
      try {
        const { data: authUser } = await serverClient.auth.admin.getUserById(
          userId
        );

        if (authUser?.user) {
          const userData = {
            id: userId,
            email: authUser.user.email,
            first_name: authUser.user.user_metadata?.first_name || null,
            last_name: authUser.user.user_metadata?.last_name || null,
            role: authUser.user.user_metadata?.role || "Founder",
          };

          try {
            const { data: newUser } = await serverClient
              .from("users")
              .insert(userData)
              .select("id, email, first_name, last_name")
              .single();

            userExists = newUser;
          } catch (insertError) {
            console.log(
              "Failed to create user profile (table might not exist):",
              insertError
            );
            // Continue without user profile for now
          }
        }
      } catch (authError) {
        console.log("Failed to get auth user:", authError);
      }
    }

    // Validate required fields
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

    // Check if user already has an application
    let existingApp = null;
    try {
      const { data: appData } = await serverClient
        .from("applications")
        .select("id, status")
        .eq("user_id", userId)
        .single();

      existingApp = appData;
    } catch (error) {
      // No existing application, continue
      console.log("No existing application found:", error);
    }

    // Prepare application data
    const applicationData = {
      user_id: userId,
      status: "submitted",
      // Problem
      problem_statement: problemStatement,
      target_audience: targetAudience,
      problem_size: problemSize,
      urgency,
      current_solutions: currentSolutions,
      // Solution
      solution_description: solutionDescription,
      value_proposition: valueProposition,
      product_type: productType,
      development_stage: developmentStage,
      // Market
      market_size: marketSize,
      target_market: targetMarket,
      competitors,
      customer_acquisition: customerAcquisition,
      revenue_model: revenueModel,
      // Team
      team_vision: teamVision,
      team_members: teamMembers,
      team_gaps: teamGaps,
      // Business
      company_name: companyName,
      sectors,
      business_stage: businessStage,
      business_model: businessModel,
      funding_needs: fundingNeeds,
      traction,
      challenges,
      timeline,
      // Additional
      additional_info: additionalInfo,
      agreements,
      // Metadata
      submitted_at: new Date().toISOString(),
    };

    let result;
    if (existingApp) {
      // Update existing application
      console.log(
        `Updating existing application ${existingApp.id} for user ${userId}`
      );
      const { data, error } = await serverClient
        .from("applications")
        .update(applicationData)
        .eq("id", existingApp.id)
        .select("*")
        .single();

      if (error) {
        console.error("Application update error:", error);
        return NextResponse.json(
          { error: `Failed to update application: ${error.message}` },
          { status: 500 }
        );
      }

      result = { data, message: "Application updated successfully" };
    } else {
      // Create new application
      console.log(`Creating new application for user ${userId}`);
      const { data, error } = await serverClient
        .from("applications")
        .insert(applicationData)
        .select("*")
        .single();

      if (error) {
        console.error("Application submission error:", error);

        // Check if it's a table doesn't exist error
        if (
          error.message?.includes(
            'relation "public.applications" does not exist'
          )
        ) {
          return NextResponse.json(
            {
              error:
                "Database tables not set up yet. Please run the SQL schema from supabase-applications-schema.sql in your Supabase dashboard.",
              setup_required: true,
            },
            { status: 500 }
          );
        }

        return NextResponse.json(
          { error: `Failed to submit application: ${error.message}` },
          { status: 500 }
        );
      }

      result = { data, message: "Application submitted successfully" };
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
