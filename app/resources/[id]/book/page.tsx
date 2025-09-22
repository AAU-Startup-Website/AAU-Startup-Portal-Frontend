"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { BookingCalendar } from "@/components/booking/booking-calendar"
import { ArrowLeft, Calendar, Clock, Users, MapPin, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function BookResourcePage({ params }: { params: { id: string } }) {
  const [selectedDateTime, setSelectedDateTime] = useState<{ date: string; time: string } | null>(null)
  const [bookingDetails, setBookingDetails] = useState({
    purpose: "",
    attendees: "",
    specialRequests: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  // Mock resource data - in real app this would come from API
  const resource = {
    id: params.id,
    name: "Innovation Lab",
    type: "workspace",
    description: "Fully equipped workspace with high-speed internet and collaboration tools",
    capacity: "20 people",
    location: "AAU Innovation Center, Room 201",
    features: ["WiFi", "Projector", "Whiteboard", "Coffee", "Air Conditioning"],
    hourlyRate: "Free for AAU startups",
    rules: [
      "Maximum booking duration: 4 hours",
      "Cancel at least 2 hours in advance",
      "Clean up after use",
      "No food or drinks near equipment",
    ],
  }

  const handleTimeSlotSelect = (date: string, time: string) => {
    setSelectedDateTime({ date, time })
  }

  const handleSubmitBooking = async () => {
    if (!selectedDateTime || !bookingDetails.purpose || !bookingDetails.attendees) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setBookingConfirmed(true)
  }

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-background">
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <Card>
              <CardContent className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold mb-4">Booking Confirmed!</h1>
                <p className="text-muted-foreground mb-6">
                  Your booking for {resource.name} has been successfully confirmed.
                </p>

                <div className="bg-muted/50 rounded-lg p-6 mb-6 text-left">
                  <h3 className="font-semibold mb-4">Booking Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-aau-blue" />
                      <span>
                        {new Date(selectedDateTime!.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-aau-blue" />
                      <span>
                        {selectedDateTime!.time} - {Number.parseInt(selectedDateTime!.time) + 1}:00
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-aau-blue" />
                      <span>{resource.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-aau-blue" />
                      <span>{bookingDetails.attendees} attendees</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/bookings">View My Bookings</Link>
                  </Button>
                  <Button className="bg-aau-blue hover:bg-aau-blue/90" asChild>
                    <Link href="/resources">Book Another Resource</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-muted/30 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="outline" asChild>
              <Link href="/resources">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Resources
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold mb-2">Book {resource.name}</h1>
              <p className="text-muted-foreground mb-4">{resource.description}</p>

              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-aau-blue" />
                  <span>{resource.capacity}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-aau-blue" />
                  <span>{resource.location}</span>
                </div>
                <Badge variant="outline">{resource.type}</Badge>
              </div>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Resource Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {resource.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="text-sm">
                      <span className="font-medium">Rate: </span>
                      <span className="text-aau-blue">{resource.hourlyRate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calendar */}
            <div>
              <BookingCalendar
                resourceId={resource.id}
                resourceName={resource.name}
                onTimeSlotSelect={handleTimeSlotSelect}
              />
            </div>

            {/* Booking Details */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                  <CardDescription>Provide information about your booking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="purpose">Purpose of Booking *</Label>
                    <Textarea
                      id="purpose"
                      placeholder="Describe what you'll be using the space for..."
                      value={bookingDetails.purpose}
                      onChange={(e) => setBookingDetails((prev) => ({ ...prev, purpose: e.target.value }))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="attendees">Number of Attendees *</Label>
                    <Input
                      id="attendees"
                      type="number"
                      placeholder="e.g., 5"
                      min="1"
                      max="20"
                      value={bookingDetails.attendees}
                      onChange={(e) => setBookingDetails((prev) => ({ ...prev, attendees: e.target.value }))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="requests">Special Requests</Label>
                    <Textarea
                      id="requests"
                      placeholder="Any special setup or equipment needs..."
                      value={bookingDetails.specialRequests}
                      onChange={(e) => setBookingDetails((prev) => ({ ...prev, specialRequests: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Booking Summary */}
              {selectedDateTime && (
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Resource</span>
                      <span className="font-medium">{resource.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Date</span>
                      <span className="font-medium">{new Date(selectedDateTime.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Time</span>
                      <span className="font-medium">
                        {selectedDateTime.time} - {Number.parseInt(selectedDateTime.time) + 1}:00
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Duration</span>
                      <span className="font-medium">1 hour</span>
                    </div>
                    <div className="flex items-center justify-between border-t pt-3">
                      <span className="text-sm text-muted-foreground">Cost</span>
                      <span className="font-medium text-aau-blue">{resource.hourlyRate}</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Rules */}
              <Card>
                <CardHeader>
                  <CardTitle>Booking Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {resource.rules.map((rule, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-aau-blue mr-2">•</span>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                className="w-full bg-aau-blue hover:bg-aau-blue/90"
                size="lg"
                disabled={!selectedDateTime || !bookingDetails.purpose || !bookingDetails.attendees || isSubmitting}
                onClick={handleSubmitBooking}
              >
                {isSubmitting ? "Confirming Booking..." : "Confirm Booking"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
