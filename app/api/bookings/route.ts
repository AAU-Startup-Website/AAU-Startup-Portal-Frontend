import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string | undefined
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
const serverClient = createClient(supabaseUrl, serviceRoleKey || anonKey)

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const limit = Number(searchParams.get('limit') || 20)
  const from = Number(searchParams.get('from') || 0)
  const to = from + limit - 1
  const userId = searchParams.get('user_id')
  const resourceId = searchParams.get('resource_id')
  const status = searchParams.get('status')
  const fromTime = searchParams.get('from_time')
  const toTime = searchParams.get('to_time')

  let query = serverClient
    .from('bookings')
    .select('*', { count: 'exact' })
    .order('start_time', { ascending: true })

  if (userId) query = query.eq('user_id', userId)
  if (resourceId) query = query.eq('resource_id', resourceId)
  if (status) query = query.eq('status', status)
  if (fromTime) query = query.gte('start_time', fromTime)
  if (toTime) query = query.lte('end_time', toTime)

  const { data, error, count } = await query.range(from, to)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, count })
}

export async function POST(req: NextRequest) {
  if (!serviceRoleKey) {
    return NextResponse.json({ error: 'Write operations not enabled (missing service role key).' }, { status: 403 })
  }

  const body = await req.json()
  const { resource_id, user_id, start_time, end_time, status } = body || {}

  if (!resource_id || !user_id || !start_time || !end_time) {
    return NextResponse.json({ error: 'resource_id, user_id, start_time, end_time are required' }, { status: 400 })
  }

  // Validate time range
  const start = new Date(start_time)
  const end = new Date(end_time)
  if (!(start instanceof Date) || isNaN(start.getTime()) || !(end instanceof Date) || isNaN(end.getTime()) || end <= start) {
    return NextResponse.json({ error: 'Invalid time range' }, { status: 400 })
  }

  // Overlap check for same resource
  const { data: overlaps, error: overlapErr } = await serverClient
    .from('bookings')
    .select('id')
    .eq('resource_id', resource_id)
    .not('status', 'in', '(cancelled)')
    .or(`and(start_time.lte.${end.toISOString()},end_time.gte.${start.toISOString()})`)

  if (overlapErr) {
    return NextResponse.json({ error: overlapErr.message }, { status: 500 })
  }
  if (overlaps && overlaps.length > 0) {
    return NextResponse.json({ error: 'Time slot overlaps with an existing booking' }, { status: 409 })
  }

  const { data, error } = await serverClient
    .from('bookings')
    .insert({ resource_id, user_id, start_time, end_time, status: status || 'Pending' })
    .select('*')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data }, { status: 201 })
}
