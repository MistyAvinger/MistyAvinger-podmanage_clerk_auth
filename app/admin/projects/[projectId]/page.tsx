"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Upload,
  Edit,
  Send,
  Calendar,
  CreditCard,
  AlertTriangle,
  Bell,
  ArrowLeft,
  Settings,
  CheckSquare,
  FileCheck,
  MailCheck,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"

export default function ProjectPage({ params }: { params: { projectId: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState("overview")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(195) // 3:15 in seconds
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [selectedEpisode, setSelectedEpisode] = useState<any>(null)
  const [messageText, setMessageText] = useState("")
  const [editingNotes, setEditingNotes] = useState("")
  const [notifyDialogOpen, setNotifyDialogOpen] = useState(false)
  const [notifySubject, setNotifySubject] = useState("")
  const [notifyMessage, setNotifyMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [editingStatus, setEditingStatus] = useState<string | null>(null)

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Mock project data - in a real app, this would be fetched from an API
  const project = {
    id: Number.parseInt(params.projectId),
    name: "Tech Talk",
    owner: "John Doe",
    email: "john.doe@example.com",
    members: 3,
    episodes: [
      {
        id: 101,
        title: "The Future of AI",
        status: "raw_uploaded",
        uploadDate: "2023-06-10",
        duration: "32:15",
        notes: "Raw audio uploaded by client. Needs full edit.",
        rawAudio: "TechTalk_Ep5_Raw.mp3",
        editedAudio: null,
        editingProgress: 0,
        clientNotes: "Please clean up background noise around 15:20 and add intro music.",
      },
      {
        id: 102,
        title: "Blockchain Explained",
        status: "editing_in_progress",
        uploadDate: "2023-06-15",
        duration: "28:45",
        notes: "Currently editing interview section. Removing long pauses and balancing levels.",
        rawAudio: "TechTalk_Ep6_Raw.mp3",
        editedAudio: "TechTalk_Ep6_Edit_WIP.mp3",
        editingProgress: 65,
        clientNotes: "Make sure to keep the technical explanation at 10:30 intact.",
      },
    ],
    status: "active",
    lastUpdated: "2 days ago",
    nextRelease: "Tomorrow",
    unreadMessages: 2,
    description: "A podcast about emerging technologies and their impact on society",
    coverArt: "/placeholder.svg?height=300&width=300",
    pendingTasks: 3,
    subscription: {
      status: "active",
      plan: "Monthly",
      nextBilling: "Jun 15, 2023",
      amount: "$149.00",
      startDate: "Jan 15, 2023",
      paymentId: "PM-12345",
      ticketId: "TK-5678",
    },
    developmentAnswers: {
      podcastName: "Tech Talk",
      podcastDescription: "A podcast about emerging technologies and their impact on society",
      targetAudience: "Tech enthusiasts, professionals, and curious minds",
      releaseSchedule: "Weekly",
      episodeLength: "30-45 minutes",
      hostNames: "John Doe, Jane Smith",
      topics: "AI, Blockchain, Cybersecurity, Future Tech",
    },
    preProductionAnswers: {
      equipmentList: "Blue Yeti microphones, Zoom H6 recorder, Adobe Audition",
      recordingLocation: "Home studio with acoustic treatment",
      introMusic: "Custom composed by Jane Smith",
    },
    messages: [
      {
        id: 1,
        sender: "admin",
        text: "I've started editing your latest episode. I'll clean up the background noise as requested and add the intro music.",
        timestamp: "3 days ago",
      },
      {
        id: 2,
        sender: "client",
        text: "Thanks! Also, could you make sure the interview section around 15:20 is clear? There was some background noise.",
        timestamp: "2 days ago",
      },
      {
        id: 3,
        sender: "admin",
        text: "Will do! I'll pay special attention to that section and make sure it's crystal clear.",
        timestamp: "1 day ago",
      },
    ],
  }

  // Simulate audio playback for demo purposes
  React.useEffect(() => {
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

  // Helper function to format time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Status badge component for episodes
  const EpisodeStatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "raw_uploaded":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
          >
            <Upload className="mr-1 h-3 w-3" />
            Raw Uploaded
          </Badge>
        )
      case "editing_in_progress":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800"
          >
            <Edit className="mr-1 h-3 w-3" />
            Editing In Progress
          </Badge>
        )
      case "ready_for_approval":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800"
          >
            <Clock className="mr-1 h-3 w-3" />
            Ready for Approval
          </Badge>
        )
      case "approved":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
          >
            <CheckCircle className="mr-1 h-3 w-3" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
          >
            <XCircle className="mr-1 h-3 w-3" />
            Changes Requested
          </Badge>
        )
      case "scheduled":
        return (
          <Badge
            variant="outline"
            className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800"
          >
            <Calendar className="mr-1 h-3 w-3" />
            Scheduled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Subscription status badge
  const SubscriptionStatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "active":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
          >
            <CheckCircle className="mr-1 h-3 w-3" />
            Active
          </Badge>
        )
      case "payment_issue":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
          >
            <AlertTriangle className="mr-1 h-3 w-3" />
            Payment Issue
          </Badge>
        )
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
          >
            <CreditCard className="mr-1 h-3 w-3" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleUploadEdit = () => {
    if (!selectedEpisode) return

    toast({
      title: "Edit Uploaded",
      description: `Your edit for "${selectedEpisode.title}" has been uploaded and is ready for client approval.`,
    })

    // Update the episode status
    setEditingStatus("ready_for_approval")
    setUploadDialogOpen(false)

    // In a real app, this would update the episode in the database
    toast({
      title: "Task Completed",
      description: "This task has been removed from your active tasks.",
    })
  }

  const handleSendMessage = () => {
    if (!messageText.trim()) return

    toast({
      title: "Message Sent",
      description: `Message sent to ${project.owner}`,
    })

    setMessageText("")
  }

  const handleUpdateEditingNotes = () => {
    if (!editingNotes.trim()) return

    toast({
      title: "Editing Notes Updated",
      description: `Notes have been updated.`,
    })

    setEditingNotes("")
  }

  const handleNotifyUser = () => {
    if (!notifySubject.trim() || !notifyMessage.trim()) return

    toast({
      title: "Notification Sent",
      description: `${project.owner} has been notified about the edited file.`,
    })

    setNotifyDialogOpen(false)
    setNotifySubject("")
    setNotifyMessage("")
  }

  const handleStatusChange = (episodeId: number, newStatus: string) => {
    setEditingStatus(newStatus)

    toast({
      title: "Status Updated",
      description: `Episode status changed to ${newStatus}.`,
    })

    if (newStatus === "editing_in_progress") {
      // When starting editing, prompt to download the raw file
      toast({
        title: "Download Started",
        description: "Raw audio file is being downloaded for editing.",
      })
    } else if (newStatus === "ready_for_approval") {
      // When marking as ready for review, remind admin to upload the edited file
      setUploadDialogOpen(true)
    }
  }

  const handleViewSubscriptionDetails = () => {
    if (project.subscription.status === "payment_issue" && project.subscription.ticketId) {
      router.push(`/admin/help/ticket/${project.subscription.ticketId}`)
    } else {
      router.push(`/admin/subscriptions?paymentId=${project.subscription.paymentId}`)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-podmanage-orange"></div>
      </div>
    )
  }

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/admin/projects")}
            className="transition-all hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          {project.subscription.status === "active" ? (
            <SubscriptionStatusBadge status="active" />
          ) : project.subscription.status === "payment_issue" ? (
            <SubscriptionStatusBadge status="payment_issue" />
          ) : (
            <SubscriptionStatusBadge status="cancelled" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Project info */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
                <CardDescription>Basic details about this podcast project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-square relative rounded-md overflow-hidden border">
                  <img
                    src={project.coverArt || "/placeholder.svg"}
                    alt={`${project.name} cover art`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Owner</p>
                    <p className="font-medium">{project.owner}</p>
                    <p className="text-sm text-muted-foreground">{project.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className="text-sm">{project.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Team Size</p>
                      <p className="font-medium">{project.members} members</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Updated</p>
                      <p className="font-medium">{project.lastUpdated}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Next Release</p>
                      <p className="font-medium">{project.nextRelease}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium capitalize">{project.status}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Subscription Details</CardTitle>
                <CardDescription>Current subscription information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <SubscriptionStatusBadge status={project.subscription.status} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Plan</p>
                    <p className="font-medium">{project.subscription.plan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="font-medium">{project.subscription.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Next Billing</p>
                    <p className="font-medium">{project.subscription.nextBilling}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium">{project.subscription.startDate}</p>
                  </div>
                </div>
                {project.subscription.status === "payment_issue" && (
                  <div className="bg-red-50 p-3 rounded-md border border-red-200 dark:bg-red-900/20 dark:border-red-800">
                    <p className="text-sm font-medium text-red-700 dark:text-red-300 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Payment Issue - Subscription Inactive
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                      User has been notified. Project access will be limited until payment is resolved.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full transition-all hover:bg-muted"
                  onClick={handleViewSubscriptionDetails}
                >
                  {project.subscription.status === "payment_issue" ? "View Payment Issue" : "Manage Subscription"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* Middle column - Admin Action Panel */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Admin Action Panel</CardTitle>
                <CardDescription>Quick actions for this project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start transition-all hover:translate-x-1"
                  onClick={() => setUploadDialogOpen(true)}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Edited Episode
                </Button>
                <Button
                  className="w-full justify-start transition-all hover:translate-x-1"
                  onClick={() => setNotifyDialogOpen(true)}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notify User About Edited File
                </Button>
                <Button
                  className="w-full justify-start transition-all hover:translate-x-1"
                  onClick={() => toast({ title: "Status Updated", description: "Episode marked as ready for review." })}
                >
                  <FileCheck className="mr-2 h-4 w-4" />
                  Mark Episode as Ready for Review
                </Button>
                <Button
                  className="w-full justify-start transition-all hover:translate-x-1"
                  onClick={() => toast({ title: "Episode Approved", description: "Episode approved for scheduling." })}
                >
                  <CheckSquare className="mr-2 h-4 w-4" />
                  Approve Final Episode
                </Button>
                <Button
                  className="w-full justify-start transition-all hover:translate-x-1"
                  onClick={() =>
                    toast({ title: "Settings Updated", description: "Project settings have been adjusted." })
                  }
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Adjust Project Settings
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Editing Workflow</CardTitle>
                <CardDescription>Current editing status and next steps</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Current Status:</p>
                    <EpisodeStatusBadge status={editingStatus || "raw_uploaded"} />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Workflow Steps:</p>
                    <ol className="space-y-2 text-sm pl-5 list-decimal">
                      <li className={editingStatus === null ? "text-podmanage-orange font-medium" : ""}>
                        Download raw audio file
                      </li>
                      <li
                        className={editingStatus === "editing_in_progress" ? "text-podmanage-orange font-medium" : ""}
                      >
                        Edit in your preferred software
                      </li>
                      <li className={editingStatus === "ready_for_approval" ? "text-podmanage-orange font-medium" : ""}>
                        Upload edited file for client review
                      </li>
                      <li className={editingStatus === "approved" ? "text-podmanage-orange font-medium" : ""}>
                        Wait for client approval
                      </li>
                      <li className={editingStatus === "scheduled" ? "text-podmanage-orange font-medium" : ""}>
                        Schedule for release
                      </li>
                    </ol>
                  </div>

                  {editingStatus === "editing_in_progress" && (
                    <div className="bg-blue-50 p-3 rounded-md border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        <Edit className="inline-block mr-2 h-4 w-4" />
                        Currently editing. Upload when complete.
                      </p>
                    </div>
                  )}

                  {editingStatus === "ready_for_approval" && (
                    <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800">
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        <Clock className="inline-block mr-2 h-4 w-4" />
                        Waiting for client approval.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                {editingStatus === null && (
                  <Button
                    className="w-full"
                    onClick={() => handleStatusChange(project.episodes[0].id, "editing_in_progress")}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Start Editing
                  </Button>
                )}
                {editingStatus === "editing_in_progress" && (
                  <Button className="w-full" onClick={() => setUploadDialogOpen(true)}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Edited File
                  </Button>
                )}
                {editingStatus === "ready_for_approval" && (
                  <Button
                    className="w-full"
                    onClick={() => handleStatusChange(project.episodes[0].id, "approved")}
                    disabled
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Waiting for Client
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* Right column - Tabs and content */}
        <div className="md:col-span-1 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4 w-full">
              <TabsTrigger
                value="overview"
                className="transition-all data-[state=active]:bg-podmanage-orange data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="episodes"
                className="transition-all data-[state=active]:bg-podmanage-orange data-[state=active]:text-white"
              >
                Episodes
              </TabsTrigger>
              <TabsTrigger
                value="user-info"
                className="transition-all data-[state=active]:bg-podmanage-orange data-[state=active]:text-white"
              >
                User Info
              </TabsTrigger>
              <TabsTrigger
                value="messages"
                className="transition-all data-[state=active]:bg-podmanage-orange data-[state=active]:text-white"
              >
                Messages
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="overview" className="space-y-4">
                  <Card className="transition-all hover:shadow-md">
                    <CardHeader>
                      <CardTitle>Project Overview</CardTitle>
                      <CardDescription>Summary of project status and recent activity</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Episodes Status</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Raw Uploads</span>
                            <span>{project.episodes.filter((ep) => ep.status === "raw_uploaded").length}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>In Editing</span>
                            <span>{project.episodes.filter((ep) => ep.status === "editing_in_progress").length}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Ready for Approval</span>
                            <span>{project.episodes.filter((ep) => ep.status === "ready_for_approval").length}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Approved</span>
                            <span>{project.episodes.filter((ep) => ep.status === "approved").length}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Recent Activity</h3>
                        <div className="space-y-3">
                          {project.messages.slice(0, 2).map((message) => (
                            <div key={message.id} className="text-sm">
                              <p className="font-medium">{message.sender === "admin" ? "You" : project.owner}</p>
                              <p className="text-muted-foreground truncate">{message.text}</p>
                              <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="episodes" className="space-y-4">
                  <Card className="transition-all hover:shadow-md">
                    <CardHeader>
                      <CardTitle>Episodes</CardTitle>
                      <CardDescription>All episodes for this project</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {project.episodes.length > 0 ? (
                        <div className="space-y-4">
                          {project.episodes.map((episode) => (
                            <motion.div
                              key={episode.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Card className="transition-all hover:shadow-sm">
                                <CardHeader className="pb-2">
                                  <div className="flex items-center justify-between">
                                    <CardTitle className="text-base">{episode.title}</CardTitle>
                                    <EpisodeStatusBadge status={episode.status} />
                                  </div>
                                  <CardDescription>
                                    Uploaded: {episode.uploadDate} • Duration: {episode.duration}
                                  </CardDescription>
                                </CardHeader>
                                <CardContent className="pb-2">
                                  <div className="space-y-3">
                                    <p className="text-sm text-muted-foreground">{episode.notes}</p>

                                    {episode.status === "editing_in_progress" && (
                                      <div className="space-y-1">
                                        <div className="flex items-center justify-between text-sm">
                                          <span>Editing Progress</span>
                                          <span>{episode.editingProgress}%</span>
                                        </div>
                                        <Progress value={episode.editingProgress} className="h-2" />
                                      </div>
                                    )}

                                    {episode.clientNotes && (
                                      <div className="rounded-md bg-muted p-3">
                                        <p className="text-xs font-medium">Client Notes:</p>
                                        <p className="text-sm">{episode.clientNotes}</p>
                                      </div>
                                    )}
                                  </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                  <div className="flex gap-2">
                                    {episode.rawAudio && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="transition-all hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-300"
                                        onClick={() =>
                                          toast({
                                            title: "Download Started",
                                            description: "Raw audio file is being downloaded.",
                                          })
                                        }
                                      >
                                        <Download className="mr-2 h-4 w-4" />
                                        Download Raw
                                      </Button>
                                    )}
                                    {episode.editedAudio && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="transition-all hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-300"
                                        onClick={() =>
                                          toast({
                                            title: "Download Started",
                                            description: "Edited audio file is being downloaded.",
                                          })
                                        }
                                      >
                                        <Download className="mr-2 h-4 w-4" />
                                        Download Edit
                                      </Button>
                                    )}
                                  </div>
                                </CardFooter>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                          <p className="text-muted-foreground">No episodes available</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="user-info" className="space-y-4">
                  <Card className="transition-all hover:shadow-md">
                    <CardHeader>
                      <CardTitle>Development Information</CardTitle>
                      <CardDescription>User's answers from the development phase</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <p className="text-sm font-medium">Podcast Name</p>
                            <p className="text-sm">{project.developmentAnswers.podcastName}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Target Audience</p>
                            <p className="text-sm">{project.developmentAnswers.targetAudience}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Release Schedule</p>
                            <p className="text-sm">{project.developmentAnswers.releaseSchedule}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Episode Length</p>
                            <p className="text-sm">{project.developmentAnswers.episodeLength}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Host Names</p>
                            <p className="text-sm">{project.developmentAnswers.hostNames}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Topics</p>
                            <p className="text-sm">{project.developmentAnswers.topics}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Podcast Description</p>
                            <p className="text-sm">{project.developmentAnswers.podcastDescription}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="transition-all hover:shadow-md">
                    <CardHeader>
                      <CardTitle>Pre-Production Information</CardTitle>
                      <CardDescription>User's answers from the pre-production phase</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <p className="text-sm font-medium">Equipment List</p>
                            <p className="text-sm">{project.preProductionAnswers.equipmentList}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Recording Location</p>
                            <p className="text-sm">{project.preProductionAnswers.recordingLocation}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Intro Music</p>
                            <p className="text-sm">{project.preProductionAnswers.introMusic}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="messages" className="space-y-4">
                  <Card className="transition-all hover:shadow-md">
                    <CardHeader>
                      <CardTitle>Communication History</CardTitle>
                      <CardDescription>Messages between admin and client</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-md border">
                          {project.messages.map((message) => (
                            <motion.div
                              key={message.id}
                              className="p-4 border-b last:border-0"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className={`h-8 w-8 rounded-full ${message.sender === "admin" ? "bg-podmanage-orange text-white" : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"} flex items-center justify-center font-medium`}
                                >
                                  {message.sender === "admin" ? "A" : project.owner.charAt(0)}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <p className="font-medium">
                                      {message.sender === "admin" ? "Admin" : project.owner}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                                  </div>
                                  <p className="text-sm mt-1">{message.text}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Type your message..."
                            className="flex-1"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                          />
                          <Button
                            onClick={handleSendMessage}
                            className="transition-all hover:bg-podmanage-orange/90 hover:scale-105"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>
      </div>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Edited Audio</DialogTitle>
            <DialogDescription>Upload your edited version of an episode</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="episode-select">Select Episode</Label>
              <Select defaultValue={selectedEpisode?.id.toString() || ""}>
                <SelectTrigger id="episode-select">
                  <SelectValue placeholder="Select episode" />
                </SelectTrigger>
                <SelectContent>
                  {project.episodes.map((episode) => (
                    <SelectItem key={episode.id} value={episode.id.toString()}>
                      {episode.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-file">Audio File</Label>
              <Input id="edit-file" type="file" accept="audio/*" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-version">Version</Label>
              <Select defaultValue="final">
                <SelectTrigger id="edit-version">
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft Edit</SelectItem>
                  <SelectItem value="final">Final Edit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea id="edit-notes" placeholder="Add notes about this edit..." className="min-h-32" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUploadEdit} className="transition-all hover:bg-podmanage-orange/90 hover:scale-105">
              Upload Edit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Notify Dialog */}
      <Dialog open={notifyDialogOpen} onOpenChange={setNotifyDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Notify User</DialogTitle>
            <DialogDescription>Send a notification to {project.owner} about an edited file</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="notify-subject">Subject</Label>
              <Input
                id="notify-subject"
                placeholder="e.g., Your episode edit is ready"
                value={notifySubject}
                onChange={(e) => setNotifySubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notify-message">Message</Label>
              <Textarea
                id="notify-message"
                placeholder="Type your notification message..."
                className="min-h-32"
                value={notifyMessage}
                onChange={(e) => setNotifyMessage(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notify-episode">Related Episode</Label>
              <Select defaultValue="">
                <SelectTrigger id="notify-episode">
                  <SelectValue placeholder="Select episode" />
                </SelectTrigger>
                <SelectContent>
                  {project.episodes.map((episode) => (
                    <SelectItem key={episode.id} value={episode.id.toString()}>
                      {episode.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNotifyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleNotifyUser} className="transition-all hover:bg-podmanage-orange/90 hover:scale-105">
              <MailCheck className="mr-2 h-4 w-4" />
              Send Notification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

