"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, Copy, ExternalLink, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"

// Mock data for scheduled episodes
const scheduledEpisodes = [
  {
    id: 1,
    title: "The Future of Remote Work",
    description: "Exploring how remote work is changing the landscape of business and personal life.",
    releaseDate: "2025-04-15",
    coverArt: "/placeholder.svg?height=200&width=200",
    status: "scheduled", // scheduled, released
    duration: "45:30",
    link: "",
  },
  {
    id: 2,
    title: "Mindfulness in the Digital Age",
    description: "How to stay present and mindful in an increasingly digital and distracted world.",
    releaseDate: "2025-04-22",
    coverArt: "/placeholder.svg?height=200&width=200",
    status: "scheduled",
    duration: "38:15",
    link: "",
  },
  {
    id: 3,
    title: "Entrepreneurship 101",
    description: "Essential lessons for first-time entrepreneurs and startup founders.",
    releaseDate: "2025-04-08",
    coverArt: "/placeholder.svg?height=200&width=200",
    status: "released",
    duration: "52:45",
    link: "https://example.com/podcast/entrepreneurship-101",
  },
]

// GlowAnimation component with pointer-events: none to allow clicking through
const GlowAnimation = () => {
  return (
    <div
      className="absolute inset-0 rounded-md bg-orange-500 opacity-20 animate-pulse pointer-events-none z-0"
      style={{ pointerEvents: "none" }}
    ></div>
  )
}

export default function ScheduledEpisodesPage() {
  const { toast } = useToast()
  const [selectedEpisode, setSelectedEpisode] = useState<any>(null)
  const [metadataDialogOpen, setMetadataDialogOpen] = useState(false)

  // Calculate days until release
  const calculateCountdown = (releaseDate: string) => {
    const now = new Date()
    const release = new Date(releaseDate)
    const diffTime = Math.abs(release.getTime() - now.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (release < now) {
      return "Released"
    }

    if (diffDays === 0) {
      // Calculate hours if releasing today
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
      return `Releasing in ${diffHours} hour${diffHours !== 1 ? "s" : ""}`
    }

    return `Releasing in ${diffDays} day${diffDays !== 1 ? "s" : ""}`
  }

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Sort episodes by release date (closest first)
  const sortedEpisodes = [...scheduledEpisodes].sort((a, b) => {
    const dateA = new Date(a.releaseDate)
    const dateB = new Date(b.releaseDate)
    return dateA.getTime() - dateB.getTime()
  })

  // Handle copy link
  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link)
    toast({
      title: "Link Copied",
      description: "Episode link copied to clipboard",
    })
  }

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Scheduled
          </Badge>
        )
      case "released":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Released
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  }

  // Find the most recently released episode
  const mostRecentReleasedEpisode = sortedEpisodes
    .filter((ep) => ep.status === "released")
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())[0]

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <h2 className="text-3xl font-bold tracking-tight">Scheduled Episodes</h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[70vh]"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {sortedEpisodes.map((episode, index) => {
          const isRecentlyReleased = episode.id === mostRecentReleasedEpisode?.id

          return (
            <motion.div
              key={episode.id}
              variants={itemVariants}
              custom={index}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <Card
                className={cn(
                  "relative flex flex-col h-full overflow-hidden hover:shadow-lg transition-all duration-300",
                  isRecentlyReleased && "border-orange-500",
                )}
              >
                {isRecentlyReleased && <GlowAnimation />}
                <div className="relative z-10 h-40 overflow-hidden">
                  <img
                    src={episode.coverArt || "/placeholder.svg"}
                    alt={`Cover art for ${episode.title}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    {isRecentlyReleased && (
                      <Badge className="bg-orange-500 text-white border-none">New Release 🎉</Badge>
                    )}
                    <StatusBadge status={episode.status} />
                  </div>
                </div>
                <CardHeader className="pb-2 relative z-10">
                  <CardTitle className="text-lg">{episode.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    {formatDate(episode.releaseDate)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow relative z-10">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{episode.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs">
                      <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-muted-foreground">{episode.duration}</span>
                    </div>
                    <div className="text-xs font-medium text-podmanage-orange">
                      {episode.status === "released" ? "Released" : calculateCountdown(episode.releaseDate)}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 pt-2 relative z-10">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            setSelectedEpisode(episode)
                            setMetadataDialogOpen(true)
                          }}
                        >
                          <Info className="h-4 w-4 mr-2" />
                          View Metadata
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View episode details and metadata</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(
                            "flex-1",
                            (episode.status !== "released" || !episode.link) && "opacity-50 cursor-not-allowed",
                          )}
                          disabled={episode.status !== "released" || !episode.link}
                          onClick={() => episode.link && handleCopyLink(episode.link)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Link
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {episode.status === "released"
                          ? episode.link
                            ? "Copy episode link to clipboard"
                            : "No link available"
                          : "Link will be available after release"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardFooter>
              </Card>
            </motion.div>
          )
        })}

        {sortedEpisodes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="col-span-full flex flex-col items-center justify-center h-[50vh] bg-muted/20 rounded-lg border border-dashed"
          >
            <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Scheduled Episodes</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
              You don't have any episodes scheduled for release yet.
            </p>
            <Button onClick={() => (window.location.href = "/dashboard/timeline")}>Go to Timeline</Button>
          </motion.div>
        )}
      </motion.div>

      {/* Episode Metadata Dialog */}
      <Dialog open={metadataDialogOpen} onOpenChange={setMetadataDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Episode Metadata</DialogTitle>
            <DialogDescription>Details about your scheduled episode</DialogDescription>
          </DialogHeader>

          {selectedEpisode && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <img
                  src={selectedEpisode.coverArt || "/placeholder.svg"}
                  alt={`Cover art for ${selectedEpisode.title}`}
                  className="w-24 h-24 rounded-md object-cover"
                />
                <div>
                  <h3 className="font-medium">{selectedEpisode.title}</h3>
                  <p className="text-sm text-muted-foreground">{selectedEpisode.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Release Date</h4>
                  <p className="text-sm">{formatDate(selectedEpisode.releaseDate)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Status</h4>
                  <StatusBadge status={selectedEpisode.status} />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Duration</h4>
                  <p className="text-sm">{selectedEpisode.duration}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Countdown</h4>
                  <p className="text-sm font-medium text-podmanage-orange">
                    {selectedEpisode.status === "released"
                      ? "Released"
                      : calculateCountdown(selectedEpisode.releaseDate)}
                  </p>
                </div>
              </div>

              {selectedEpisode.status === "released" && selectedEpisode.link && (
                <div>
                  <h4 className="text-sm font-medium">Episode Link</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      value={selectedEpisode.link}
                      readOnly
                      className="flex-1 text-sm p-2 rounded-md bg-muted"
                    />
                    <Button size="sm" variant="outline" onClick={() => handleCopyLink(selectedEpisode.link)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => window.open(selectedEpisode.link, "_blank")}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setMetadataDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

