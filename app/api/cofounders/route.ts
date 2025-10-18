import { NextRequest, NextResponse } from "next/server";

// Mock data store
const mockCofounders: any[] = [];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit") || 20);
  const from = Number(searchParams.get("from") || 0);
  const location = searchParams.get("location");
  const lookingFor = searchParams.get("looking_for");
  const search = searchParams.get("search");

  try {
    let filtered = mockCofounders;

    if (location) {
      filtered = filtered.filter(c => c.location === location);
    }

    if (lookingFor) {
      filtered = filtered.filter(c => c.looking_for === lookingFor);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(c => 
        c.name?.toLowerCase().includes(searchLower) ||
        c.bio?.toLowerCase().includes(searchLower)
      );
    }

    const data = filtered.slice(from, from + limit);
    const count = filtered.length;

    return NextResponse.json({ data, count });
  } catch (error) {
    console.error("Cofounders fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
