import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string | undefined
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
const serverClient = createClient(supabaseUrl, serviceRoleKey || anonKey)

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const { data, error } = await serverClient
    .from('announcements')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json({ data })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!serviceRoleKey) {
    return NextResponse.json({ error: 'Write operations not enabled (missing service role key).' }, { status: 403 })
  }
  const { id } = params
  const body = await req.json()
  const update: Record<string, any> = {}
  if (body.title !== undefined) update.title = body.title
  if (body.content !== undefined) update.content = body.content
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
  }
  const { data, error } = await serverClient
    .from('announcements')
    .update(update)
    .eq('id', id)
    .select('*')
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!serviceRoleKey) {
    return NextResponse.json({ error: 'Write operations not enabled (missing service role key).' }, { status: 403 })
  }
  const { id } = params
  const { error } = await serverClient.from('announcements').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
