import { NextRequest, NextResponse } from 'next/server'

// Mock data store
const mockBookings: any[] = []

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const booking = mockBookings.find(b => b.id === id)
  
  if (!booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  }
  
  return NextResponse.json({ data: booking })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const body = await req.json()
  
  const index = mockBookings.findIndex(b => b.id === id)
  if (index === -1) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  }

  const update: Record<string, any> = {}
  if (body.resource_id !== undefined) update.resource_id = body.resource_id
  if (body.user_id !== undefined) update.user_id = body.user_id
  if (body.start_time !== undefined) update.start_time = body.start_time
  if (body.end_time !== undefined) update.end_time = body.end_time
  if (body.status !== undefined) update.status = body.status
  
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
  }

  // Overlap check if updating times
  if (update.resource_id || update.start_time || update.end_time) {
    const existing = mockBookings[index]
    const resource_id = update.resource_id || existing.resource_id
    const start = new Date(update.start_time || existing.start_time)
    const end = new Date(update.end_time || existing.end_time)
    
    const overlaps = mockBookings.filter(b => 
      b.id !== id &&
      b.resource_id === resource_id &&
      b.status !== 'cancelled' &&
      new Date(b.start_time) <= end &&
      new Date(b.end_time) >= start
    )
    
    if (overlaps.length > 0) {
      return NextResponse.json({ error: 'Time slot overlaps with an existing booking' }, { status: 409 })
    }
  }

  mockBookings[index] = { ...mockBookings[index], ...update }
  
  return NextResponse.json({ data: mockBookings[index] })
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const index = mockBookings.findIndex(b => b.id === id)
  
  if (index === -1) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  }
  
  mockBookings.splice(index, 1)
  
  return NextResponse.json({ success: true })
}
