"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

// Define the status types and their properties
const STATUS_TYPES = {
  upload: {
    label: "Upload Required",
    color: "bg-red-500/10 text-red-600 border-red-200 dark:border-red-800 dark:text-red-400",
    priority: 0,
  },
  review: {
    label: "Ready for Review",
    color: "bg-orange-500/10 text-orange-600 border-orange-200 dark:border-orange-800 dark:text-orange-400",
    priority: 1,
  },
  editing: {
    label: "In Production",
    color: "bg-violet-500/10 text-violet-600 border-violet-200 dark:border-violet-800 dark:text-violet-400",
    priority: 2,
  },
  scheduled: {
    label: "Scheduled",
    color: "bg-green-500/10 text-green-600 border-green-200 dark:border-green-800 dark:text-green-400",
    priority: 3,
  },
  completed: {
    label: "Completed",
    color: "bg-green-500/10 text-green-600 border-green-200 dark:border-green-800 dark:text-green-400",
    priority: 4,
  },
} as const

interface TimelineItem {
  id: string
  title: string
  date: string
  time: string
  description: string
  duration: string
  status: keyof typeof STATUS_TYPES
  completed?: boolean
  estimatedDelivery?: string
}

interface TimelineViewProps {
  items: TimelineItem[]
  onItemComplete?: (id: string, status: keyof typeof STATUS_TYPES) => void
}

export function TimelineView({ items, onItemComplete }: TimelineViewProps) {
  const router = useRouter()
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set())

  // Initialize completed items based on status
  useEffect(() => {
    const initialCompleted = new Set<string>()
    items.forEach((item) => {
      if (item.status === "scheduled" || item.completed) {
        initialCompleted.add(item.id)
      }
    })
    setCompletedItems(initialCompleted)
  }, [items])

  // Handle click on timeline item
  const handleItemClick = (item: TimelineItem) => {
    if (item.status === "upload") {
      router.push("/dashboard/production")
      // Auto-complete upload tasks when clicked (simulating upload completion)
      if (onItemComplete && !completedItems.has(item.id)) {
        onItemComplete(item.id, "upload")
        setCompletedItems((prev) => new Set(prev).add(item.id))
      }
    } else if (item.status === "review") {
      router.push("/dashboard/episode-management")
      // Auto-complete review tasks when clicked (simulating review submission)
      if (onItemComplete && !completedItems.has(item.id)) {
        onItemComplete(item.id, "review")
        setCompletedItems((prev) => new Set(prev).add(item.id))
      }
    } else if (item.status === "editing") {
      // Stay on current page, info is shown in the card
      // Editing tasks don't auto-complete, they change to review when editing is done
    } else if (item.status === "scheduled") {
      router.push("/dashboard/scheduled-episodes")
      // Scheduled tasks are always completed
      if (onItemComplete && !completedItems.has(item.id)) {
        onItemComplete(item.id, "scheduled")
        setCompletedItems((prev) => new Set(prev).add(item.id))
      }
    }
  }

  // Sort items by status priority and completion
  const sortedItems = [...items].sort((a, b) => {
    // Completed items always go to the end
    if (completedItems.has(a.id) && !completedItems.has(b.id)) return 1
    if (!completedItems.has(a.id) && completedItems.has(b.id)) return -1

    // Sort by priority if completion status is the same
    return STATUS_TYPES[a.status].priority - STATUS_TYPES[b.status].priority
  })

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sortedItems.map((item) => {
        const isCompleted = completedItems.has(item.id) || item.status === "scheduled" || item.status === "completed"
        const status = STATUS_TYPES[item.status]

        return (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              className={cn(
                "relative overflow-hidden dark:bg-gray-900/60 hover:shadow-lg transition-all duration-300",
                isCompleted && "border-green-500",
              )}
            >
              {isCompleted && (
                <div
                  className="absolute inset-0 bg-green-500/10 animate-pulse-glow pointer-events-none"
                  style={{ boxShadow: "0px 0px 15px rgba(0, 255, 0, 0.6)" }}
                />
              )}
              <div className="p-6 space-y-4 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground">
                      {item.date} • {item.time}
                    </p>
                  </div>
                  <Badge variant="outline" className={status.color}>
                    {status.label}
                  </Badge>
                </div>

                <p className="text-muted-foreground line-clamp-2">{item.description}</p>

                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  Duration: {item.duration}
                </div>

                {item.status === "editing" && item.estimatedDelivery && (
                  <p className="text-sm text-blue-400">Estimated delivery: {item.estimatedDelivery}</p>
                )}

                <Button className="w-full" onClick={() => handleItemClick(item)}>
                  View Details
                </Button>
              </div>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}

