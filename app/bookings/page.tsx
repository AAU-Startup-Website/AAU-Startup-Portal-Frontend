"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, User, CheckCircle, XCircle, AlertCircle, RefreshCcw } from "lucide-react"

type Booking = {
  id: string
  resource_id: string
  user_id: string
  start_time: string
  end_time: string
  status: string | null
  created_at: string
  updated_at: string
  // Optional enrichment fields for UI; not from base table
  resource?: string | null
  location?: string | null
  attendees?: number | null
  purpose?: string | null
}

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const loadBookings = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/bookings')
      if (!res.ok) throw new Error(await res.text())
      const json = await res.json()
      setBookings(json.data || [])
    } catch (e: any) {
      setError(e.message || 'Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBookings()
  }, [])

  const now = useMemo(() => new Date(), [bookings.length])
  const upcomingBookings = useMemo(() => bookings.filter(b => new Date(b.start_time) >= now), [bookings, now])
  const pastBookings = useMemo(() => bookings.filter(b => new Date(b.start_time) < now), [bookings, now])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-muted/30 py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Bookings</h1>
              <p className="text-xl text-muted-foreground">Manage your resource reservations and booking history</p>
            </div>
            <Button className="bg-aau-blue hover:bg-aau-blue/90" asChild>
              <a href="/resources">
                <Calendar className="h-4 w-4 mr-2" />
                Book New Resource
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
              <TabsTrigger value="past">Past Bookings ({pastBookings.length})</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>

            {/* Upcoming Bookings */}
            <TabsContent value="upcoming" className="space-y-6">
              {loading && (
                <div className="text-center py-12 text-muted-foreground">Loading bookings...</div>
              )}
              {error && !loading && (
                <div className="text-center py-12 text-red-600 text-sm">{error}</div>
              )}
              {!loading && !error && upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <Card key={booking.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl">{booking.resource || 'Resource'}</CardTitle>
                            {booking.purpose && <CardDescription className="mt-1">{booking.purpose}</CardDescription>}
                          </div>
                          <Badge className={`${getStatusColor((booking.status || 'pending').toLowerCase())} flex items-center gap-1`}>
                            {getStatusIcon((booking.status || 'pending').toLowerCase())}
                            {(booking.status || 'pending').charAt(0).toUpperCase() + (booking.status || 'pending').slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-sm">
                            <Calendar className="h-4 w-4 text-aau-blue" />
                            <span>{new Date(booking.start_time).toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock className="h-4 w-4 text-aau-blue" />
                            <span>
                              {new Date(booking.start_time).toLocaleTimeString()} - {new Date(booking.end_time).toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <User className="h-4 w-4 text-aau-blue" />
                            {booking.attendees !== undefined && booking.attendees !== null ? (
                              <span>{booking.attendees} attendees</span>
                            ) : (
                              <span>—</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                          <MapPin className="h-4 w-4" />
                          <span>{booking.location || '—'}</span>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          {(booking.status || '').toLowerCase() === "confirmed" && (
                            <Button variant="outline" size="sm">
                              Modify Booking
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No upcoming bookings</h3>
                    <p className="text-muted-foreground mb-4">You don't have any upcoming resource bookings.</p>
                    <Button className="bg-aau-blue hover:bg-aau-blue/90" asChild>
                      <a href="/resources">Browse Resources</a>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Past Bookings */}
            <TabsContent value="past" className="space-y-6">
              {!loading && !error && pastBookings.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No past bookings</h3>
                    <p className="text-muted-foreground">Your completed and previous bookings will appear here.</p>
                  </CardContent>
                </Card>
              )}
              <div className="space-y-4">
                {pastBookings.map((booking) => (
                  <Card key={booking.id} className="opacity-75">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{booking.resource || 'Resource'}</CardTitle>
                          {booking.purpose && <CardDescription className="mt-1">{booking.purpose}</CardDescription>}
                        </div>
                        <Badge className={getStatusColor((booking.status || 'completed').toLowerCase())}>
                          {(booking.status || 'completed').charAt(0).toUpperCase() + (booking.status || 'completed').slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(booking.start_time).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(booking.start_time).toLocaleTimeString()} - {new Date(booking.end_time).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {booking.attendees !== undefined && booking.attendees !== null ? (
                            <span>{booking.attendees} attendees</span>
                          ) : (
                            <span>—</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{booking.location || '—'}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Calendar View */}
            <TabsContent value="calendar" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Calendar View</CardTitle>
                  <CardDescription>View all your bookings in a calendar format</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Calendar Integration</h3>
                    <p className="text-muted-foreground">
                      Calendar view will be available in the next update. For now, use the list views above.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <div className="flex justify-center mt-6">
            <Button variant="outline" onClick={loadBookings} disabled={loading}>
              <RefreshCcw className="h-4 w-4 mr-2" /> Refresh
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
