"use client"

import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Download, Play, Pause } from "lucide-react"

interface Event {
  date: Date
  title: string
  type: "release" | "editing" | "upload"
  details?: string
  coverArt?: string
}

export function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(195) // 3:15 in seconds

  // Mock events - in a real app, these would come from your API
  useEffect(() => {
    const mockEvents = [
      {
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        title: "Episode Release: Tech Trends",
        type: "release" as const,
        details: "Your episode will be published to all platforms automatically.",
        coverArt: "/placeholder.svg?height=100&width=100&text=Tech+Trends",
      },
      {
        date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        title: "Editing Complete: Interview with Expert",
        type: "editing" as const,
        details: "Your episode has been edited and is ready for your review.",
        coverArt: "/placeholder.svg?height=100&width=100&text=Interview",
      },
      {
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        title: "Episode Upload: Product Review",
        type: "upload" as const,
        details: "You uploaded this episode and it's currently being edited.",
        coverArt: "/placeholder.svg?height=100&width=100&text=Review",
      },
    ]

    setEvents(mockEvents)
  }, [])

  // Function to check if a date has an event
  const hasEvent = (day: Date) => {
    return events.some((event) => event.date.toDateString() === day.toDateString())
  }

  // Function to get event details for a date
  const getEventDetails = (day: Date) => {
    return events.find((event) => event.date.toDateString() === day.toDateString())
  }

  // Function to get event color based on type
  const getEventColor = (type: string) => {
    switch (type) {
      case "release":
        return "bg-green-500"
      case "editing":
        return "bg-blue-500"
      case "upload":
        return "bg-purple-500"
      default:
        return "bg-podmanage-orange"
    }
  }

  // Helper function to format time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Simulate audio playback for demo purposes
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPlaying, duration])

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            setDate(newDate)
            const event = newDate ? getEventDetails(newDate) : null
            if (event) {
              setSelectedEvent(event)
              setIsDialogOpen(true)
            }
          }}
          className="rounded-md border w-full"
          modifiers={{
            event: (date) => hasEvent(date),
          }}
          modifiersClassNames={{
            event: "relative",
          }}
          components={{
            DayContent: (props) => {
              const event = hasEvent(props.date) ? getEventDetails(props.date) : null
              return (
                <div className="relative w-full h-full flex items-center justify-center">
                  {props.children}
                  {event && (
                    <div
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 rounded-t-sm ${getEventColor(event.type)}`}
                    />
                  )}
                </div>
              )
            },
          }}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Events</h3>
        {date && hasEvent(date) ? (
          <motion.div
            className="rounded-md border p-3 cursor-pointer hover:border-podmanage-orange/50 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              const event = getEventDetails(date)
              if (event) {
                setSelectedEvent(event)
                setIsDialogOpen(true)
              }
            }}
          >
            <div className="flex items-center gap-3">
              {getEventDetails(date)?.coverArt && (
                <div className="w-12 h-12 rounded-md overflow-hidden relative flex-shrink-0">
                  <img
                    src={getEventDetails(date)?.coverArt || "/placeholder.svg"}
                    alt="Episode cover"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <Badge className={getEventColor(getEventDetails(date)?.type || "")}>
                    {getEventDetails(date)?.type === "release"
                      ? "Release"
                      : getEventDetails(date)?.type === "editing"
                        ? "Editing"
                        : "Upload"}
                  </Badge>
                </div>
                <p className="font-medium">{getEventDetails(date)?.title}</p>
                <p className="text-sm text-muted-foreground">{date.toLocaleDateString()}</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <p className="text-sm text-muted-foreground">No events for this date</p>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {selectedEvent?.coverArt && (
                <div className="w-24 h-24 rounded-md overflow-hidden relative flex-shrink-0">
                  <img
                    src={selectedEvent.coverArt || "/placeholder.svg"}
                    alt="Episode cover"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div>
                <Badge className={getEventColor(selectedEvent?.type || "")}>
                  {selectedEvent?.type === "release"
                    ? "Release"
                    : selectedEvent?.type === "editing"
                      ? "Editing"
                      : "Upload"}
                </Badge>
                <p className="text-sm mt-2">{selectedEvent?.details}</p>
                <p className="text-sm text-muted-foreground mt-1">{selectedEvent?.date.toLocaleDateString()}</p>
              </div>
            </div>

            {selectedEvent?.type === "editing" && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Preview Audio</h4>
                <div className="rounded-md border p-3">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <div className="flex-1">
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-podmanage-orange"
                          style={{ width: `${(currentTime / duration) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(currentTime)}/{formatTime(duration)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {selectedEvent?.type === "release" && (
              <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm font-medium text-green-700 dark:text-green-300">
                    Your episode will go live on {selectedEvent.date.toLocaleDateString()}! 🎉
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              {selectedEvent?.type === "editing" && <Button>Review Episode</Button>}
              {selectedEvent?.type === "release" && (
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

