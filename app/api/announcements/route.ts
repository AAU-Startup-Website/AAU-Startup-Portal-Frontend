import { NextRequest, NextResponse } from 'next/server'

// Mock data store (replace with your actual database)
const mockAnnouncements = [
  {
    id: '1',
    title: 'Welcome to AAU Startup Portal',
    content: 'We are excited to launch the AAU Startup Portal!',
    created_at: new Date().toISOString(),
  },
]

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const limit = Number(searchParams.get('limit') || 20)
  const from = Number(searchParams.get('from') || 0)

  const data = mockAnnouncements.slice(from, from + limit)
  const count = mockAnnouncements.length

  return NextResponse.json({ data, count })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { title, content } = body || {}
  
  if (!title || !content) {
    return NextResponse.json({ error: 'title and content are required' }, { status: 400 })
  }

  const newAnnouncement = {
    id: String(mockAnnouncements.length + 1),
    title,
    content,
    created_at: new Date().toISOString(),
  }

  mockAnnouncements.unshift(newAnnouncement)

  return NextResponse.json({ data: newAnnouncement }, { status: 201 })
}
