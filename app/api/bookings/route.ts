import { NextRequest, NextResponse } from 'next/server'

// Mock data store
const mockBookings: any[] = []

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const limit = Number(searchParams.get('limit') || 20)
  const from = Number(searchParams.get('from') || 0)
  const userId = searchParams.get('user_id')
  const resourceId = searchParams.get('resource_id')
  const status = searchParams.get('status')
  const fromTime = searchParams.get('from_time')
  const toTime = searchParams.get('to_time')

  let filtered = mockBookings

  if (userId) filtered = filtered.filter(b => b.user_id === userId)
  if (resourceId) filtered = filtered.filter(b => b.resource_id === resourceId)
  if (status) filtered = filtered.filter(b => b.status === status)
  if (fromTime) filtered = filtered.filter(b => new Date(b.start_time) >= new Date(fromTime))
  if (toTime) filtered = filtered.filter(b => new Date(b.end_time) <= new Date(toTime))

  const data = filtered.slice(from, from + limit)
  const count = filtered.length
  
  return NextResponse.json({ data, count })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { resource_id, user_id, start_time, end_time, status } = body || {}

  if (!resource_id || !user_id || !start_time || !end_time) {
    return NextResponse.json({ error: 'resource_id, user_id, start_time, end_time are required' }, { status: 400 })
  }

  const start = new Date(start_time)
  const end = new Date(end_time)
  if (!(start instanceof Date) || isNaN(start.getTime()) || !(end instanceof Date) || isNaN(end.getTime()) || end <= start) {
    return NextResponse.json({ error: 'Invalid time range' }, { status: 400 })
  }

  // Check for overlaps
  const overlaps = mockBookings.filter(b => 
    b.resource_id === resource_id &&
    b.status !== 'cancelled' &&
    new Date(b.start_time) <= end &&
    new Date(b.end_time) >= start
  )

  if (overlaps.length > 0) {
    return NextResponse.json({ error: 'Time slot overlaps with an existing booking' }, { status: 409 })
  }

  const newBooking = {
    id: String(mockBookings.length + 1),
    resource_id,
    user_id,
    start_time,
    end_time,
    status: status || 'Pending',
    created_at: new Date().toISOString(),
  }

  mockBookings.push(newBooking)

  return NextResponse.json({ data: newBooking }, { status: 201 })
}
