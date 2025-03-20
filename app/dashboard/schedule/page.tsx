"use client"

import { useState } from "react"
import { format, parseISO } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { CheckCircle, AlertCircle, Eye, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import confetti from "canvas-confetti"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Update the status types to remove "in production" and ensure consistency
type EpisodeStatus = "upload" | "editing" | "review" | "scheduled" | "completed"
type EpisodeStage = "upload" | "editing" | "review" | "final" | "released"

interface Episode {
  id: string
  title: string
  date: string
  time: string
  description: string
  duration: string
  status: EpisodeStatus
  completed?: boolean
  estimatedDelivery?: string
  coverArt?: string
  uploadDate?: string
  reviewDate?: string
  editingDate?: string
  finalDate?: string
  releaseDate?: string
  currentStage?: EpisodeStage
  progress?: number
  actionRequired?: string
  dueDate?: string
  participants?: string
}

// Update the sample data to fix inconsistencies
const episodesData: Episode[] = [
  {
    id: "1",
    title: "Tech Trends in 2023",
    date: "2023-10-26",
    time: "10:00 AM",
    description: "Discussing the latest technology trends that will shape the industry.",
    duration: "45 minutes",
    status: "scheduled",
    completed: true,
    coverArt: "/placeholder.svg?height=100&width=100&text=Tech+Trends",
    uploadDate: "2023-03-01",
    editingDate: "2023-03-05",
    reviewDate: "2023-03-08",
    finalDate: "2023-03-12",
    releaseDate: "2023-03-15",
    currentStage: "released",
    progress: 100,
    dueDate: "2023-03-10",
    participants: "John Doe, Jane Smith",
  },
  {
    id: "2",
    title: "Interview with Industry Expert",
    date: "2023-10-27",
    time: "2:00 PM",
    description: "An in-depth conversation with a leading expert in the field.",
    duration: "60 minutes",
    status: "review",
    coverArt: "/placeholder.svg?height=100&width=100&text=Interview",
    uploadDate: "2023-03-10",
    editingDate: "2023-03-15",
    reviewDate: "2023-03-18",
    finalDate: "2023-03-22",
    releaseDate: "2023-03-25",
    currentStage: "review",
    progress: 75,
    dueDate: "2023-03-22",
    participants: "Alice Johnson",
    actionRequired: "Review edits and provide feedback",
  },
  {
    id: "3",
    title: "Product Review Special",
    date: "2023-10-28",
    time: "4:00 PM",
    description: "Reviewing the latest products that have hit the market.",
    duration: "30 minutes",
    status: "editing",
    estimatedDelivery: "2023-10-30",
    coverArt: "/placeholder.svg?height=100&width=100&text=Review",
    uploadDate: "2023-03-20",
    editingDate: "2023-03-24",
    reviewDate: "2023-03-28",
    finalDate: "2023-04-02",
    releaseDate: "2023-04-05",
    currentStage: "editing",
    progress: 45,
    dueDate: "2023-03-28",
    participants: "Bob Williams",
  },
  {
    id: "4",
    title: "Future of AI Discussion",
    date: "2023-10-29",
    time: "11:00 AM",
    description: "Exploring how artificial intelligence will change our lives.",
    duration: "75 minutes",
    status: "upload",
    coverArt: "/placeholder.svg?height=100&width=100&text=AI+Future",
    uploadDate: "2023-03-25",
    editingDate: null,
    reviewDate: null,
    finalDate: null,
    releaseDate: "2023-04-10",
    currentStage: "upload",
    progress: 0,
    dueDate: "2023-04-01",
    participants: "Charlie Brown",
    actionRequired: "Upload raw audio files",
  },
]

export default function TimelinePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [filter, setFilter] = useState<string>("all")
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [currentMonth, setCurrentMonth] = useState("March 2025")
  const [episodeDetailsOpen, setEpisodeDetailsOpen] = useState(false)
  const [episodes, setEpisodes] = useState<Episode[]>(episodesData)

  // Filter episodes based on status
  const filteredEpisodes = episodes.filter((episode) => {
    if (filter === "all") return true
    return episode.status === filter
  })

  // Function to get stage color
  const getStageColor = (stage: EpisodeStage) => {
    switch (stage) {
      case "upload":
        return "bg-red-500"
      case "editing":
        return "bg-yellow-500"
      case "review":
        return "bg-blue-500"
      case "final":
        return "bg-purple-500"
      case "released":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  // Function to get status color
  const getStatusColor = (status: EpisodeStatus) => {
    switch (status) {
      case "upload":
        return "bg-red-500"
      case "editing":
        return "bg-yellow-500"
      case "review":
        return "bg-orange-500"
      case "scheduled":
        return "bg-green-500"
      case "completed":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  // Update the status text function to use correct terminology
  const getStatusText = (status: EpisodeStatus) => {
    switch (status) {
      case "upload":
        return "Upload Required"
      case "editing":
        return "Editing"
      case "review":
        return "Ready for Review"
      case "scheduled":
        return "Scheduled"
      case "completed":
        return "Completed"
    }
  }

  // Function to handle view details
  const handleViewDetails = (episode: Episode) => {
    setSelectedEpisode(episode)
    setEpisodeDetailsOpen(true)
  }

  // Function to trigger confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  // Function to handle button actions based on episode stage
  const handleActionButton = (episode: Episode) => {
    setEpisodeDetailsOpen(false)

    switch (episode.currentStage) {
      case "upload":
        router.push(`/dashboard/production?episodeId=${episode.id}`)
        toast({
          title: "Redirecting to Production",
          description: "You can upload your files on the production page.",
        })
        break
      case "review":
        router.push(`/dashboard/production?episodeId=${episode.id}`)
        toast({
          title: "Redirecting to Review",
          description: "You can review your edited episode on the production page.",
        })
        break
      case "final":
        triggerConfetti()
        setShowCelebration(true)
        setEpisodes((prevEpisodes) => prevEpisodes.filter((ep) => ep.id !== episode.id))
        break
      case "editing":
        router.push(`/dashboard/production?episodeId=${episode.id}`)
        toast({
          title: "Checking Progress",
          description: "You can check the editing progress on the production page.",
        })
        break
      default:
        break
    }
  }

  // Function to get action button text based on episode stage
  const getActionButtonText = (stage: EpisodeStage) => {
    switch (stage) {
      case "upload":
        return "Upload Files"
      case "editing":
        return "Check Progress"
      case "review":
        return "Review Edited Episode"
      case "final":
        return "Mark as Final"
      default:
        return ""
    }
  }

  // Function to get action button icon based on episode stage
  const getActionButtonIcon = (stage: EpisodeStage) => {
    switch (stage) {
      case "upload":
        return <Upload className="mr-2 h-4 w-4" />
      case "editing":
        return <Clock className="mr-2 h-4 w-4" />
      case "review":
        return <Eye className="mr-2 h-4 w-4" />
      case "final":
        return <CheckCircle className="mr-2 h-4 w-4" />
      default:
        return null
    }
  }

  // Function to handle navigation to scheduled episodes
  const handleViewScheduledEpisodes = () => {
    setShowCelebration(false)
    router.push("/dashboard/scheduled-episodes")
  }

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Timeline</h1>
        <p className="text-muted-foreground">Manage your podcast episodes timeline.</p>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Episode Timeline</h2>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const [month, year] = currentMonth.split(" ")
                  const date = new Date(`${month} 1, ${year}`)
                  date.setMonth(date.getMonth() - 1)
                  setCurrentMonth(format(date, "MMMM yyyy"))
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[120px] text-center">{currentMonth}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const [month, year] = currentMonth.split(" ")
                  const date = new Date(`${month} 1, ${year}`)
                  date.setMonth(date.getMonth() + 1)
                  setCurrentMonth(format(date, "MMMM yyyy"))
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Episodes</SelectItem>
                <SelectItem value="upload">Upload Required</SelectItem>
                <SelectItem value="review">Ready for Review</SelectItem>
                <SelectItem value="editing">Editing</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredEpisodes.map((episode) => (
            <motion.div
              key={episode.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={cn(
                  "rounded-lg border p-4 hover:shadow-lg transition-shadow cursor-pointer",
                  episode.status === "upload" && "bg-red-500/10 border-red-500",
                  episode.status === "editing" && "bg-yellow-500/10 border-yellow-500",
                  episode.status === "review" && "bg-orange-500/10 border-orange-500",
                  episode.status === "scheduled" && "bg-green-500/10 border-green-500",
                  episode.status === "completed" && "bg-green-500/10 border-green-500",
                )}
                onClick={() => handleViewDetails(episode)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{episode.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(parseISO(episode.date), "PPP")} • {episode.time}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      episode.status === "upload" && "bg-red-500 text-white",
                      episode.status === "editing" && "bg-yellow-500 text-white",
                      episode.status === "review" && "bg-orange-500 text-white",
                      episode.status === "scheduled" && "bg-green-500 text-white",
                      episode.status === "completed" && "bg-green-500 text-white",
                    )}
                  >
                    {getStatusText(episode.status)}
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{episode.description}</p>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  {episode.duration}
                </div>
                {episode.status === "editing" && episode.estimatedDelivery && (
                  <p className="mt-2 text-sm text-blue-400">Estimated delivery: {episode.estimatedDelivery}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Episode Details Dialog */}
      <Dialog open={episodeDetailsOpen} onOpenChange={setEpisodeDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Badge className={getStageColor(selectedEpisode?.currentStage || "upload")}>
                {selectedEpisode?.currentStage && getStatusText(selectedEpisode.status)}
              </Badge>
              {selectedEpisode?.title}
            </DialogTitle>
            <DialogDescription>{selectedEpisode?.description}</DialogDescription>
          </DialogHeader>

          {selectedEpisode && (
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded-md overflow-hidden relative flex-shrink-0">
                  <img
                    src={selectedEpisode.coverArt || "/placeholder.svg"}
                    alt={selectedEpisode.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-3">
                    {selectedEpisode.uploadDate && (
                      <div>
                        <p className="text-sm text-muted-foreground">Upload Date</p>
                        <p className="font-medium">{format(new Date(selectedEpisode.uploadDate), "MMM d, yyyy")}</p>
                      </div>
                    )}
                    {selectedEpisode.releaseDate && (
                      <div>
                        <p className="text-sm text-muted-foreground">Release Date</p>
                        <p className="font-medium">{format(new Date(selectedEpisode.releaseDate), "MMM d, yyyy")}</p>
                      </div>
                    )}
                    {selectedEpisode.dueDate && (
                      <div>
                        <p className="text-sm text-muted-foreground">Due Date</p>
                        <p className="font-medium">{format(new Date(selectedEpisode.dueDate), "MMM d, yyyy")}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge className={getStatusColor(selectedEpisode.status)}>
                        {getStatusText(selectedEpisode.status)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {selectedEpisode.progress !== undefined && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{selectedEpisode.progress}%</span>
                  </div>
                  <Progress value={selectedEpisode.progress} className="h-2" />
                </div>
              )}

              {/* Production Timeline */}
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-3">Production Timeline</h4>
                <div className="relative">
                  {/* Timeline bar */}
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2" />

                  {/* Timeline stages */}
                  <div className="relative flex justify-between">
                    {["upload", "editing", "review", "final", "released"].map((stage, index) => {
                      const currentStageIndex = ["upload", "editing", "review", "final", "released"].indexOf(
                        selectedEpisode.currentStage || "upload",
                      )
                      const isCompleted = index < currentStageIndex
                      const isCurrent = index === currentStageIndex

                      return (
                        <div key={stage} className="flex flex-col items-center z-10">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isCompleted
                                ? "bg-green-100 dark:bg-green-900/30 text-green-500"
                                : isCurrent
                                  ? "bg-podmanage-orange text-white"
                                  : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              getActionButtonIcon(stage as EpisodeStage)
                            )}
                          </div>
                          <span
                            className={`text-xs mt-2 font-medium ${
                              isCompleted
                                ? "text-green-500"
                                : isCurrent
                                  ? "text-podmanage-orange"
                                  : "text-muted-foreground"
                            }`}
                          >
                            {stage.charAt(0).toUpperCase() + stage.slice(1)}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Schedule Details */}
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-3">Schedule Details</h4>
                <div className="space-y-2">
                  {selectedEpisode.uploadDate && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-red-500`}></div>
                        Upload
                      </span>
                      <span>{format(new Date(selectedEpisode.uploadDate), "MMM d, yyyy")}</span>
                    </div>
                  )}
                  {selectedEpisode.editingDate && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-yellow-500`}></div>
                        Editing
                      </span>
                      <span>{format(new Date(selectedEpisode.editingDate), "MMM d, yyyy")}</span>
                    </div>
                  )}
                  {selectedEpisode.reviewDate && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-blue-500`}></div>
                        Review
                      </span>
                      <span>{format(new Date(selectedEpisode.reviewDate), "MMM d, yyyy")}</span>
                    </div>
                  )}
                  {selectedEpisode.finalDate && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-purple-500`}></div>
                        Final
                      </span>
                      <span>{format(new Date(selectedEpisode.finalDate), "MMM d, yyyy")}</span>
                    </div>
                  )}
                  {selectedEpisode.releaseDate && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-green-500`}></div>
                        Release
                      </span>
                      <span>{format(new Date(selectedEpisode.releaseDate), "MMM d, yyyy")}</span>
                    </div>
                  )}
                </div>
              </div>

              {selectedEpisode.actionRequired && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-800 dark:text-red-300">Action Required</p>
                      <p className="text-sm text-red-700 dark:text-red-400">{selectedEpisode.actionRequired}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="flex justify-between items-center">
            <Button variant="outline" onClick={() => setEpisodeDetailsOpen(false)}>
              Close
            </Button>
            {selectedEpisode && selectedEpisode.currentStage !== "released" && (
              <Button
                className="bg-podmanage-orange hover:bg-podmanage-orange/90"
                onClick={() => handleActionButton(selectedEpisode)}
              >
                {getActionButtonIcon(selectedEpisode.currentStage)}
                {getActionButtonText(selectedEpisode.currentStage)}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Celebration Dialog */}
      <Dialog open={showCelebration} onOpenChange={setShowCelebration}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              <span className="text-2xl">🎉 Awesome! 🎉</span>
            </DialogTitle>
          </DialogHeader>
          <div className="py-6 text-center space-y-4">
            <p className="text-lg">
              Your episode is scheduled for release on{" "}
              {selectedEpisode &&
                selectedEpisode.releaseDate &&
                format(new Date(selectedEpisode.releaseDate), "MMMM d, yyyy")}
            </p>
            <p className="text-muted-foreground">Check it anytime in 'Scheduled Episodes' 🚀</p>
          </div>
          <DialogFooter className="flex justify-center">
            <Button className="bg-podmanage-orange hover:bg-podmanage-orange/90" onClick={handleViewScheduledEpisodes}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              View Scheduled Episodes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

