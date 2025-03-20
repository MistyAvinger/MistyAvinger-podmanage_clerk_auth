"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MiniCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Mock events data for calendar
  const events = [
    { date: new Date(new Date().setDate(new Date().getDate() + 3)), type: "release" },
    { date: new Date(new Date().setDate(new Date().getDate() + 1)), type: "review" },
    { date: new Date(new Date().setDate(new Date().getDate() - 1)), type: "upload" },
  ]

  // Function to check if a date has an event
  const hasEvent = (day: Date) => {
    return events.some(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear(),
    )
  }

  return (
    <Card className="card-gradient overflow-hidden transition-all duration-300 hover:shadow-card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-heading">Calendar</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md"
          modifiers={{
            event: (date) => hasEvent(date),
          }}
          modifiersClassNames={{
            event: "bg-podmanage-orange text-white rounded-full",
          }}
        />
      </CardContent>
    </Card>
  )
}

