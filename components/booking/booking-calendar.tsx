"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Clock, Users } from "lucide-react"

interface BookingCalendarProps {
  resourceId: string
  resourceName: string
  onTimeSlotSelect: (date: string, time: string) => void
}

export function BookingCalendar({ resourceId, resourceName, onTimeSlotSelect }: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // Mock availability data - in real app this would come from API
  const availability = {
    "2024-12-15": {
      "09:00": "available",
      "10:00": "available",
      "11:00": "booked",
      "12:00": "available",
      "13:00": "available",
      "14:00": "booked",
      "15:00": "available",
      "16:00": "available",
      "17:00": "available",
    },
    "2024-12-16": {
      "09:00": "available",
      "10:00": "available",
      "11:00": "available",
      "12:00": "available",
      "13:00": "booked",
      "14:00": "booked",
      "15:00": "available",
      "16:00": "available",
      "17:00": "available",
    },
    "2024-12-17": {
      "09:00": "booked",
      "10:00": "available",
      "11:00": "available",
      "12:00": "available",
      "13:00": "available",
      "14:00": "available",
      "15:00": "booked",
      "16:00": "available",
      "17:00": "available",
    },
  }

  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isPastDate = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const hasAvailability = (date: Date) => {
    const dateStr = formatDate(date)
    const dayAvailability = availability[dateStr as keyof typeof availability]
    if (!dayAvailability) return false

    return Object.values(dayAvailability).some((slot) => slot === "available")
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
    setSelectedDate(null)
  }

  const selectDate = (date: Date) => {
    if (isPastDate(date) || !hasAvailability(date)) return
    setSelectedDate(formatDate(date))
  }

  const selectTimeSlot = (time: string) => {
    if (selectedDate) {
      onTimeSlotSelect(selectedDate, time)
    }
  }

  const days = getDaysInMonth(currentDate)
  const monthYear = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Select Date & Time</CardTitle>
          <CardDescription>Choose an available date and time slot for {resourceName}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-lg font-semibold">{monthYear}</h3>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {days.map((date, index) => (
              <div key={index} className="aspect-square">
                {date && (
                  <button
                    onClick={() => selectDate(date)}
                    disabled={isPastDate(date) || !hasAvailability(date)}
                    className={`
                      w-full h-full p-1 text-sm rounded-md transition-colors
                      ${
                        selectedDate === formatDate(date)
                          ? "bg-aau-blue text-white"
                          : isPastDate(date) || !hasAvailability(date)
                            ? "text-muted-foreground cursor-not-allowed"
                            : "hover:bg-muted cursor-pointer"
                      }
                      ${isToday(date) ? "ring-2 ring-aau-blue ring-opacity-50" : ""}
                    `}
                  >
                    <div className="flex flex-col items-center">
                      <span>{date.getDate()}</span>
                      {hasAvailability(date) && !isPastDate(date) && (
                        <div className="w-1 h-1 bg-green-500 rounded-full mt-1" />
                      )}
                    </div>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-aau-blue rounded-full" />
              <span>Selected</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full" />
              <span>Unavailable</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Slots */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Available Time Slots
            </CardTitle>
            <CardDescription>
              {new Date(selectedDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {timeSlots.map((time) => {
                const dayAvailability = availability[selectedDate as keyof typeof availability]
                const slotStatus = dayAvailability?.[time as keyof typeof dayAvailability] || "unavailable"

                return (
                  <Button
                    key={time}
                    variant={slotStatus === "available" ? "outline" : "secondary"}
                    size="sm"
                    disabled={slotStatus !== "available"}
                    onClick={() => selectTimeSlot(time)}
                    className={`
                      ${
                        slotStatus === "available"
                          ? "hover:bg-aau-blue hover:text-white"
                          : "opacity-50 cursor-not-allowed"
                      }
                    `}
                  >
                    {time}
                  </Button>
                )
              })}
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex space-x-4">
                <div className="flex items-center space-x-1">
                  <Badge variant="outline">Available</Badge>
                </div>
                <div className="flex items-center space-x-1">
                  <Badge variant="secondary">Booked</Badge>
                </div>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                <span>1-hour slots</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
