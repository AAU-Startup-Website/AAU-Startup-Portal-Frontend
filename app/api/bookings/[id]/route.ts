import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string | undefined
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
const serverClient = createClient(supabaseUrl, serviceRoleKey || anonKey)

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const { data, error } = await serverClient
    .from('bookings')
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
  if (body.resource_id !== undefined) update.resource_id = body.resource_id
  if (body.user_id !== undefined) update.user_id = body.user_id
  if (body.start_time !== undefined) update.start_time = body.start_time
  if (body.end_time !== undefined) update.end_time = body.end_time
  if (body.status !== undefined) update.status = body.status
  if (Object.keys(update).length === 0) return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })

  // Optional: if updating times, perform overlap check for the same resource
  if (update.resource_id || update.start_time || update.end_time) {
    const { data: existing, error: exErr } = await serverClient.from('bookings').select('*').eq('id', id).single()
    if (exErr) return NextResponse.json({ error: exErr.message }, { status: 404 })
    const resource_id = update.resource_id || existing.resource_id
    const start = new Date(update.start_time || existing.start_time)
    const end = new Date(update.end_time || existing.end_time)
    const { data: overlaps, error: overlapErr } = await serverClient
      .from('bookings')
      .select('id')
      .eq('resource_id', resource_id)
      .neq('id', id)
      .not('status', 'in', '(cancelled)')
      .or(`and(start_time.lte.${end.toISOString()},end_time.gte.${start.toISOString()})`)
    if (overlapErr) return NextResponse.json({ error: overlapErr.message }, { status: 500 })
    if (overlaps && overlaps.length > 0) return NextResponse.json({ error: 'Time slot overlaps with an existing booking' }, { status: 409 })
  }

  const { data, error } = await serverClient
    .from('bookings')
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
  const { error } = await serverClient.from('bookings').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
