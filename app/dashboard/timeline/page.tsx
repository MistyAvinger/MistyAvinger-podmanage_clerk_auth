"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { EpisodeTimelineCard, type Episode, type EpisodeStatus } from "@/components/dashboard/episode-timeline-card"

// Sample data for the timeline
const SAMPLE_EPISODES: Episode[] = [
  {
    id: "1",
    title: "Tech Trends in 2023",
    date: "October 26, 2023",
    time: "10:00 AM",
    description: "Discussing the latest technology trends that will shape the industry.",
    duration: "45 minutes",
    status: "scheduled",
    completed: true,
  },
  {
    id: "2",
    title: "Interview with Industry Expert",
    date: "October 27, 2023",
    time: "2:00 PM",
    description: "An in-depth conversation with a leading expert in the field.",
    duration: "60 minutes",
    status: "review",
  },
  {
    id: "3",
    title: "Product Review Special",
    date: "October 28, 2023",
    time: "4:00 PM",
    description: "Reviewing the latest products that have hit the market.",
    duration: "30 minutes",
    status: "editing",
    estimatedDelivery: "October 30, 2023",
  },
  {
    id: "4",
    title: "Future of AI Discussion",
    date: "October 29, 2023",
    time: "11:00 AM",
    description: "Exploring how artificial intelligence will change our lives.",
    duration: "75 minutes",
    status: "upload",
  },
  {
    id: "5",
    title: "Startup Success Stories",
    date: "October 30, 2023",
    time: "1:00 PM",
    description: "Learning from entrepreneurs who built successful startups.",
    duration: "90 minutes",
    status: "upload",
  },
]

export default function TimelinePage() {
  const router = useRouter()
  const [currentMonth, setCurrentMonth] = useState("March 2025")
  const [completedItems, setCompletedItems] = useState<Set<string>>(
    new Set(
      SAMPLE_EPISODES.filter((episode) => episode.status === "scheduled" || episode.completed).map(
        (episode) => episode.id,
      ),
    ),
  )
  const [episodes, setEpisodes] = useState(SAMPLE_EPISODES)

  // Handle item completion
  const handleItemComplete = (episode: Episode) => {
    setCompletedItems((prev) => {
      const next = new Set(prev)
      next.add(episode.id)
      return next
    })

    // Update episode status based on completion
    setEpisodes((prev) =>
      prev.map((ep) => {
        if (ep.id === episode.id) {
          // If editing is completed, change to review
          if (ep.status === "editing") {
            return { ...ep, status: "review" as EpisodeStatus }
          }
          // Otherwise mark as completed
          return { ...ep, completed: true }
        }
        return ep
      }),
    )
  }

  // Handle click on timeline item
  const handleItemClick = (episode: Episode) => {
    switch (episode.status) {
      case "upload":
        router.push("/dashboard/production")
        // Auto-complete upload tasks when clicked (simulating upload completion)
        if (!completedItems.has(episode.id)) {
          handleItemComplete(episode)
        }
        break
      case "review":
        router.push(`/dashboard/production?episodeId=${episode.id}`)
        // Auto-complete review tasks when clicked (simulating review submission)
        if (!completedItems.has(episode.id)) {
          handleItemComplete(episode)
        }
        break
      case "editing":
        // Stay on current page, info is shown in the card
        // Editing tasks don't auto-complete, they change to review when editing is done
        break
      case "scheduled":
        router.push("/dashboard/scheduled-episodes")
        // Scheduled tasks are always completed
        if (!completedItems.has(episode.id)) {
          handleItemComplete(episode)
        }
        break
    }
  }

  // Sort episodes by status priority and completion
  const sortedEpisodes = [...episodes].sort((a, b) => {
    // Completed items always go to the end
    if (completedItems.has(a.id) && !completedItems.has(b.id)) return 1
    if (!completedItems.has(a.id) && completedItems.has(b.id)) return -1

    // Sort by priority if completion status is the same
    const getPriority = (status: EpisodeStatus) => {
      switch (status) {
        case "upload":
          return 0
        case "review":
          return 1
        case "editing":
          return 2
        case "scheduled":
          return 3
      }
    }

    return getPriority(a.status) - getPriority(b.status)
  })

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Timeline</h1>

      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Episode Timeline</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span>{currentMonth}</span>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedEpisodes.map((episode) => (
              <EpisodeTimelineCard
                key={episode.id}
                episode={episode}
                isCompleted={completedItems.has(episode.id) || episode.status === "scheduled"}
                onClick={handleItemClick}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

