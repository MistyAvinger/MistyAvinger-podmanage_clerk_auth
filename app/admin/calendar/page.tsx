"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { CalendarIcon, Upload, Edit, Clock, FileCheck, Users } from "lucide-react"

export default function CalendarPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedProject, setSelectedProject] = useState<string>("all")
  const [selectedUser, setSelectedUser] = useState<string>("all")
  const [view, setView] = useState<"month" | "week" | "day">("month")
  const [eventType, setEventType] = useState<string>("all")

  // Mock projects for filter
  const projects = [
    { id: "1", name: "Tech Talk", owner: "John Doe" },
    { id: "2", name: "Health & Wellness", owner: "Jane Smith" },
    { id: "3", name: "Business Insights", owner: "Robert Johnson" },
    { id: "4", name: "Creative Writing", owner: "Emily Wilson" },
    { id: "5", name: "Science Explained", owner: "Michael Brown" },
  ]

  // Mock users for filter
  const users = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Robert Johnson" },
    { id: "4", name: "Emily Wilson" },
    { id: "5", name: "Michael Brown" },
  ]

  // Mock events data
  const events = [
    {
      id: 1,
      title: "Tech Talk - Episode Release",
      project: "Tech Talk",
      projectId: "1",
      userId: "1",
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      type: "release",
      description: "Episode 'The Future of AI' scheduled for release",
    },
    {
      id: 2,
      title: "Health & Wellness - Editing Due",
      project: "Health & Wellness",
      projectId: "2",
      userId: "2",
      date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      type: "editing",
      description: "Editing deadline for 'Nutrition Myths Debunked'",
    },
    {
      id: 3,
      title: "Business Insights - Feedback Due",
      project: "Business Insights",
      projectId: "3",
      userId: "3",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      type: "feedback",
      description: "Client feedback due for 'Startup Funding Strategies'",
    },
    {
      id: 4,
      title: "Creative Writing - Upload New Episode",
      project: "Creative Writing",
      projectId: "4",
      userId: "4",
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      type: "upload",
      description: "Client scheduled to upload new raw episode",
    },
    {
      id: 5,
      title: "Science Explained - Review Edit",
      project: "Science Explained",
      projectId: "5",
      userId: "5",
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      type: "review",
      description: "Admin review of 'The Mystery of Black Holes' edit",
    },
  ]

  // Filter events based on selected filters
  const filteredEvents = events.filter((event) => {
    if (selectedProject !== "all" && event.projectId !== selectedProject) return false
    if (selectedUser !== "all" && event.userId !== selectedUser) return false
    if (eventType !== "all" && event.type !== eventType) return false
    return true
  })

  // Function to check if a date has an event
  const hasEvent = (day: Date) => {
    return filteredEvents.some((event) => event.date.toDateString() === day.toDateString())
  }

  // Function to get event details for a date
  const getEventDetails = (day: Date) => {
    return filteredEvents.filter((event) => event.date.toDateString() === day.toDateString())
  }

  // Handle event click
  const handleEventClick = (event: any) => {
    if (event.type === "release" || event.type === "editing" || event.type === "review") {
      // Navigate to the project page
      router.push(`/admin/projects/${event.projectId}`)
    } else {
      toast({
        title: "Event Selected",
        description: `Viewing details for "${event.title}"`,
      })
    }
  }

  // Type badge component
  const TypeBadge = ({ type }: { type: string }) => {
    switch (type) {
      case "release":
        return (
          <Badge className="bg-green-500 flex items-center gap-1">
            <CalendarIcon className="h-3 w-3" />
            Release
          </Badge>
        )
      case "editing":
        return (
          <Badge className="bg-blue-500 flex items-center gap-1">
            <Edit className="h-3 w-3" />
            Editing
          </Badge>
        )
      case "feedback":
        return (
          <Badge className="bg-purple-500 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Feedback
          </Badge>
        )
      case "upload":
        return (
          <Badge className="bg-orange-500 flex items-center gap-1">
            <Upload className="h-3 w-3" />
            Upload
          </Badge>
        )
      case "review":
        return (
          <Badge className="bg-yellow-500 flex items-center gap-1">
            <FileCheck className="h-3 w-3" />
            Review
          </Badge>
        )
      default:
        return <Badge>{type}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <Button className="bg-podmanage-orange hover:bg-podmanage-orange/90">Add Event</Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <div className="w-full md:w-auto">
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-auto">
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-auto">
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Event Types</SelectItem>
                <SelectItem value="release">Release</SelectItem>
                <SelectItem value="editing">Editing</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
                <SelectItem value="upload">Upload</SelectItem>
                <SelectItem value="review">Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Tabs value={view} onValueChange={(v) => setView(v as "month" | "week" | "day")} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="day">Day</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Production Calendar</CardTitle>
          <CardDescription>View all podcast production events across projects</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 p-4 border-b lg:border-b-0 lg:border-r">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border w-full max-w-full"
                modifiers={{
                  event: (date) => hasEvent(date),
                }}
                modifiersClassNames={{
                  event: "bg-[#FF6600] text-white rounded-full",
                }}
                classNames={{
                  root: "w-full",
                  table: "w-full",
                  head_cell: "text-center",
                  cell: "text-center h-10 w-10 lg:h-14 lg:w-14 p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-10 w-10 lg:h-14 lg:w-14 p-0 font-normal aria-selected:opacity-100",
                  day_selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                  day_outside: "text-muted-foreground opacity-50",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible",
                  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  caption: "text-sm font-medium",
                }}
              />
            </div>

            <div className="w-full lg:w-1/2 p-4 max-h-[600px] overflow-y-auto">
              <h3 className="font-medium mb-4">
                Events for {date?.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
              </h3>

              {date && hasEvent(date) ? (
                <div className="space-y-3">
                  {getEventDetails(date).map((event) => (
                    <div
                      key={event.id}
                      className="rounded-md border p-3 hover:border-podmanage-orange/50 transition-colors cursor-pointer"
                      onClick={() => handleEventClick(event)}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <TypeBadge type={event.type} />
                          <span className="text-xs text-muted-foreground">{event.project}</span>
                        </div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>{users.find((u) => u.id === event.userId)?.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
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
        </CardContent>
      </Card>
    </div>
  )
}

