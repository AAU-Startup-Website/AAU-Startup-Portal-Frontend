import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
const serverClient = createClient(supabaseUrl, serviceRoleKey);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit") || 20);
  const from = Number(searchParams.get("from") || 0);
  const to = from + limit - 1;
  const location = searchParams.get("location");
  const lookingFor = searchParams.get("looking_for");
  const search = searchParams.get("search");

  try {
    let query = serverClient
      .from("cofounders")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    // Apply filters
    if (location) {
      query = query.eq("location", location);
    }

    if (lookingFor) {
      query = query.eq("looking_for", lookingFor);
    }

    if (search) {
      // Search in name, bio, or skills
      query = query.or(`name.ilike.%${search}%,bio.ilike.%${search}%`);
    }

    const { data, error, count } = await query.range(from, to);

    if (error) {
      console.error("Cofounders fetch error:", error);
      return NextResponse.json(
        { error: `Failed to fetch cofounders: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data || [], count });
  } catch (error) {
    console.error("Cofounders fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
