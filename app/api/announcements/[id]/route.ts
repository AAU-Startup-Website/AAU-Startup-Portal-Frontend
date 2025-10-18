import { NextRequest, NextResponse } from 'next/server'

// Mock data store (should match the one in route.ts)
const mockAnnouncements: any[] = []

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const announcement = mockAnnouncements.find(a => a.id === id)
  
  if (!announcement) {
    return NextResponse.json({ error: 'Announcement not found' }, { status: 404 })
  }
  
  return NextResponse.json({ data: announcement })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const body = await req.json()
  
  const index = mockAnnouncements.findIndex(a => a.id === id)
  if (index === -1) {
    return NextResponse.json({ error: 'Announcement not found' }, { status: 404 })
  }
  
  const update: Record<string, any> = {}
  if (body.title !== undefined) update.title = body.title
  if (body.content !== undefined) update.content = body.content
  
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
  }
  
  mockAnnouncements[index] = { ...mockAnnouncements[index], ...update }
  
  return NextResponse.json({ data: mockAnnouncements[index] })
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const index = mockAnnouncements.findIndex(a => a.id === id)
  
  if (index === -1) {
    return NextResponse.json({ error: 'Announcement not found' }, { status: 404 })
  }
  
  mockAnnouncements.splice(index, 1)
  
  return NextResponse.json({ success: true })
}
