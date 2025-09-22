import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Server-side Supabase client using service role key for privileged operations (NOT exposed to client)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string | undefined
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

// Fallback to anon key if service role isn't configured (read-only)
const serverClient = createClient(supabaseUrl, serviceRoleKey || anonKey)

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const limit = Number(searchParams.get('limit') || 20)
  const from = Number(searchParams.get('from') || 0)
  const to = from + limit - 1

  const { data, error, count } = await serverClient
    .from('announcements')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data, count })
}

export async function POST(req: NextRequest) {
  // Basic guard: require service role key to be configured
  if (!serviceRoleKey) {
    return NextResponse.json({ error: 'Write operations not enabled (missing service role key).' }, { status: 403 })
  }

  const body = await req.json()
  const { title, content } = body || {}
  if (!title || !content) {
    return NextResponse.json({ error: 'title and content are required' }, { status: 400 })
  }

  const { data, error } = await serverClient
    .from('announcements')
    .insert({ title, content })
    .select('*')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 201 })
}
