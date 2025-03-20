"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

// Define the status types and their properties
const STATUS_TYPES = {
  upload: {
    label: "Upload Required",
    color: "bg-red-500 text-white",
    priority: 0,
  },
  review: {
    label: "Ready for Review",
    color: "bg-orange-500 text-white",
    priority: 1,
  },
  editing: {
    label: "In Production",
    color: "bg-violet-500 text-white",
    priority: 2,
  },
  scheduled: {
    label: "Scheduled",
    color: "bg-green-500 text-white",
    priority: 3,
  },
  completed: {
    label: "Completed",
    color: "bg-green-500 text-white",
    priority: 4,
  },
} as const

// Sample data for the timeline
const SAMPLE_EPISODES = [
  {
    id: "1",
    title: "Tech Trends in 2023",
    date: "October 26, 2023",
    time: "10:00 AM",
    description: "Discussing the latest technology trends that will shape the industry.",
    duration: "45 minutes",
    status: "scheduled" as const,
    completed: true,
  },
  {
    id: "2",
    title: "Interview with Industry Expert",
    date: "October 27, 2023",
    time: "2:00 PM",
    description: "An in-depth conversation with a leading expert in the field.",
    duration: "60 minutes",
    status: "review" as const,
  },
  {
    id: "3",
    title: "Product Review Special",
    date: "October 28, 2023",
    time: "4:00 PM",
    description: "Reviewing the latest products that have hit the market.",
    duration: "30 minutes",
    status: "editing" as const,
    estimatedDelivery: "October 30, 2023",
  },
  {
    id: "4",
    title: "Future of AI Discussion",
    date: "October 29, 2023",
    time: "11:00 AM",
    description: "Exploring how artificial intelligence will change our lives.",
    duration: "75 minutes",
    status: "upload" as const,
  },
  {
    id: "5",
    title: "Startup Success Stories",
    date: "October 30, 2023",
    time: "1:00 PM",
    description: "Learning from entrepreneurs who built successful startups.",
    duration: "90 minutes",
    status: "upload" as const,
  },
]

export function TimelineSection() {
  const router = useRouter()
  const [currentMonth, setCurrentMonth] = useState("March 2025")
  const [tasks, setTasks] = useState(SAMPLE_EPISODES)

  // Function to reorder completed tasks
  const reorderCompletedTasks = () => {
    setTasks((prevTasks) => [...prevTasks].sort((a, b) => (a.completed ? 1 : b.completed ? -1 : 0)))
  }

  // Handle task completion
  const handleComplete = (id: string, status: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed: true, status: "completed" } : task)),
    )
    reorderCompletedTasks()
  }

  // Handle click on timeline item
  const handleItemClick = (item: (typeof tasks)[0]) => {
    if (item.status === "upload") {
      router.push("/dashboard/production")
      // Auto-complete upload tasks when clicked (simulating upload completion)
      handleComplete(item.id, "upload")
    } else if (item.status === "review") {
      router.push("/dashboard/episode-management")
      // Auto-complete review tasks when clicked (simulating review submission)
      handleComplete(item.id, "review")
    } else if (item.status === "editing") {
      // Stay on current page, info is shown in the card
      // Editing tasks don't auto-complete, they change to review when editing is done
    } else if (item.status === "scheduled") {
      router.push("/dashboard/scheduled-episodes")
      // Scheduled tasks are always completed
      handleComplete(item.id, "scheduled")
    }
  }

  return (
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
          {tasks.map((task) => {
            const isCompleted = task.completed || task.status === "scheduled" || task.status === "completed"
            const status = STATUS_TYPES[task.status as keyof typeof STATUS_TYPES]

            return (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  className={cn(
                    "relative overflow-hidden hover:shadow-lg transition-all duration-300",
                    isCompleted && "border-green-500",
                  )}
                >
                  {isCompleted && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ boxShadow: "0px 0px 15px rgba(0, 255, 0, 0.6)" }}
                    />
                  )}
                  <div className="p-6 space-y-4 relative z-10">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold">{task.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {task.date} • {task.time}
                        </p>
                      </div>
                      <Badge className={status.color}>{status.label}</Badge>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>

                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      Duration: {task.duration}
                    </div>

                    {task.status === "editing" && task.estimatedDelivery && (
                      <p className="text-sm text-blue-400">Estimated delivery: {task.estimatedDelivery}</p>
                    )}

                    <Button className="w-full" onClick={() => handleItemClick(task)}>
                      View Details
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

