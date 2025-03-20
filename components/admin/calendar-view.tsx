"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"

export function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Mock events data
  const events = [
    {
      id: 1,
      title: "Tech Talk - Episode Release",
      project: "Tech Talk",
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      type: "release",
    },
    {
      id: 2,
      title: "Health & Wellness - Editing Complete",
      project: "Health & Wellness",
      date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      type: "editing",
    },
    {
      id: 3,
      title: "Business Insights - Feedback Due",
      project: "Business Insights",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      type: "feedback",
    },
  ]

  // Function to check if a date has an event
  const hasEvent = (day: Date) => {
    return events.some((event) => event.date.toDateString() === day.toDateString())
  }

  // Function to get event details for a date
  const getEventDetails = (day: Date) => {
    return events.filter((event) => event.date.toDateString() === day.toDateString())
  }

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        modifiers={{
          event: (date) => hasEvent(date),
        }}
        modifiersClassNames={{
          event: "bg-[#FF6600] text-white rounded-full",
        }}
      />

      <div className="space-y-4 md:min-w-[300px]">
        <h3 className="font-medium">
          Events for {date?.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
        </h3>

        {date && hasEvent(date) ? (
          <div className="space-y-3">
            {getEventDetails(date).map((event) => (
              <div key={event.id} className="rounded-md border p-3">
                <div className="space-y-1">
                  <Badge
                    className={
                      event.type === "release"
                        ? "bg-[#FF6600]"
                        : event.type === "editing"
                          ? "bg-blue-500"
                          : "bg-purple-500"
                    }
                  >
                    {event.type}
                  </Badge>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-muted-foreground">{event.project}</p>
                  <p className="text-sm text-muted-foreground">
                    {event.date.toLocaleDateString(undefined, {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No events for this date</p>
        )}
      </div>
    </div>
  )
}

