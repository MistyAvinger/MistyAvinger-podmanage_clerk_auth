"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

// Define the status types
export type EpisodeStatus = "upload" | "review" | "editing" | "scheduled"

// Status configuration
export const STATUS_CONFIG: Record<
  EpisodeStatus,
  {
    label: string
    color: string
    priority: number
    description: string
  }
> = {
  upload: {
    label: "Upload Required",
    color: "bg-red-500 text-white border-red-700",
    priority: 0,
    description: "Upload your episode by the deadline for production.",
  },
  review: {
    label: "Ready for Review",
    color: "bg-orange-500 text-white border-orange-700",
    priority: 1,
    description: "Review your edited episode and provide feedback.",
  },
  editing: {
    label: "In Production",
    color: "bg-violet-500 text-white border-violet-700",
    priority: 2,
    description: "Your episode is being edited by our production team.",
  },
  scheduled: {
    label: "Scheduled",
    color: "bg-green-500 text-white border-green-700",
    priority: 3,
    description: "Your episode is complete and scheduled for release.",
  },
}

// Episode interface
export interface Episode {
  id: string
  title: string
  date: string
  time: string
  description: string
  duration: string
  status: EpisodeStatus
  completed?: boolean
  estimatedDelivery?: string
}

interface EpisodeTimelineCardProps {
  episode: Episode
  isCompleted: boolean
  onClick: (episode: Episode) => void
}

export function EpisodeTimelineCard({ episode, isCompleted, onClick }: EpisodeTimelineCardProps) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className={cn("relative overflow-hidden", isCompleted && "border-green-500")}>
        {isCompleted && <div className="absolute inset-0 bg-green-500/10 animate-pulse-glow pointer-events-none z-0" />}
        <div className="p-6 space-y-4 relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">{episode.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {episode.date} • {episode.time}
              </p>
            </div>
            <Badge className={STATUS_CONFIG[episode.status].color}>{STATUS_CONFIG[episode.status].label}</Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">{episode.description}</p>

          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            Duration: {episode.duration}
          </div>

          {episode.status === "editing" && episode.estimatedDelivery && (
            <p className="text-sm text-blue-400">Estimated delivery: {episode.estimatedDelivery}</p>
          )}

          <Button className="w-full mt-2" onClick={() => onClick(episode)}>
            View Details
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

