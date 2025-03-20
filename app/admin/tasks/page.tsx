"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Search, Plus, CheckCircle, Clock, Download, FileText, Edit } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function TasksPage() {
  const { toast } = useToast()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [taskDetailsOpen, setTaskDetailsOpen] = useState(false)
  const [progressUpdateOpen, setProgressUpdateOpen] = useState(false)
  const [newProgress, setNewProgress] = useState(0)
  const [taskNotes, setTaskNotes] = useState("")

  // Mock tasks data with more production-focused details
  const tasks = [
    {
      id: 1,
      title: "Edit Episode: The Future of AI",
      description:
        "Complete full edit of the raw audio, including noise reduction, level balancing, and adding intro/outro music.",
      project: "Tech Talk",
      projectId: 1,
      client: "John Doe",
      email: "john.doe@example.com",
      dueDate: "Today",
      status: "in_progress",
      priority: "high",
      progress: 45,
      attachments: [
        { name: "TechTalk_Ep5_Raw.mp3", type: "audio", size: "45.2 MB" },
        { name: "TechTalk_Intro.wav", type: "audio", size: "2.1 MB" },
        { name: "Edit_Notes.docx", type: "document", size: "256 KB" },
      ],
      notes:
        "Need to focus on cleaning up background noise around 15:20. Client specifically requested to keep the technical explanation intact.",
      episodeId: 101,
      episodeTitle: "The Future of AI",
    },
    {
      id: 2,
      title: "Create Cover Art",
      description: "Design podcast cover art for the Health & Wellness podcast based on client specifications.",
      project: "Health & Wellness",
      projectId: 2,
      client: "Jane Smith",
      email: "jane.smith@example.com",
      dueDate: "Tomorrow",
      status: "not_started",
      priority: "medium",
      progress: 0,
      attachments: [
        { name: "CoverArt_Requirements.pdf", type: "document", size: "1.8 MB" },
        { name: "Logo_Assets.zip", type: "archive", size: "5.3 MB" },
      ],
      notes:
        "Client wants a clean, minimalist design with green and white color scheme. Include the podcast logo in the center.",
      episodeId: null,
      episodeTitle: null,
    },
    {
      id: 3,
      title: "Schedule Release: Startup Funding Strategies",
      description: "Schedule the release of the approved episode on all podcast platforms.",
      project: "Business Insights",
      projectId: 3,
      client: "Robert Johnson",
      email: "robert.johnson@example.com",
      dueDate: "In 2 days",
      status: "pending",
      priority: "low",
      progress: 0,
      attachments: [
        { name: "BusinessInsights_Ep7_Final.mp3", type: "audio", size: "38.7 MB" },
        { name: "Episode_Description.txt", type: "document", size: "2 KB" },
      ],
      notes:
        "Client prefers Monday releases. Make sure to include all the show notes and links provided in the description.",
      episodeId: 301,
      episodeTitle: "Startup Funding Strategies",
    },
    {
      id: 4,
      title: "Edit Episode: The Mystery of Black Holes",
      description:
        "Complete the editing of the Science Explained episode, including adding sound effects and enhancing audio quality.",
      project: "Science Explained",
      projectId: 5,
      client: "Michael Brown",
      email: "michael.brown@example.com",
      dueDate: "Yesterday",
      status: "in_progress",
      priority: "high",
      progress: 80,
      attachments: [
        { name: "ScienceExplained_Ep4_Raw.mp3", type: "audio", size: "42.6 MB" },
        { name: "Space_SoundEffects.zip", type: "archive", size: "15.3 MB" },
      ],
      notes:
        "Almost complete. Need to add the space ambient sounds as requested and ensure the technical terms are clear. Final review needed.",
      episodeId: 501,
      episodeTitle: "The Mystery of Black Holes",
    },
    {
      id: 5,
      title: "Final Review: Nutrition Myths Debunked",
      description: "Perform final quality check on the edited episode before sending to client for approval.",
      project: "Health & Wellness",
      projectId: 2,
      client: "Jane Smith",
      email: "jane.smith@example.com",
      dueDate: "In 3 days",
      status: "pending",
      priority: "medium",
      progress: 0,
      attachments: [{ name: "HealthWellness_Ep3_Edit.mp3", type: "audio", size: "52.1 MB" }],
      notes:
        "Check for any remaining audio issues, ensure smooth transitions, and verify that the new intro music has been added correctly.",
      episodeId: 201,
      episodeTitle: "Nutrition Myths Debunked",
    },
    {
      id: 6,
      title: "Edit Episode: Blockchain Explained",
      description: "Continue editing the Tech Talk episode on blockchain technology.",
      project: "Tech Talk",
      projectId: 1,
      client: "John Doe",
      email: "john.doe@example.com",
      dueDate: "In 4 days",
      status: "in_progress",
      priority: "medium",
      progress: 65,
      attachments: [{ name: "TechTalk_Ep6_Raw.mp3", type: "audio", size: "48.3 MB" }],
      notes:
        "Currently working on removing long pauses and balancing audio levels. Need to ensure the technical explanation at 10:30 remains intact as requested by the client.",
      episodeId: 102,
      episodeTitle: "Blockchain Explained",
    },
  ]

  // Filter tasks based on search query and active tab
  const filteredTasks = tasks
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.client.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((task) => {
      if (activeTab === "all") return true
      if (activeTab === "in_progress") return task.status === "in_progress"
      if (activeTab === "pending") return task.status === "pending" || task.status === "not_started"
      if (activeTab === "completed") return task.status === "completed"
      return true
    })

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "not_started":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Not Started
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Edit className="mr-1 h-3 w-3" />
            In Progress
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Priority badge component
  const PriorityBadge = ({ priority }: { priority: string }) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-500">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>
      case "low":
        return <Badge className="bg-green-500">Low</Badge>
      default:
        return <Badge>{priority}</Badge>
    }
  }

  const handleAction = (action: string, taskId: number) => {
    const task = tasks.find((t) => t.id === taskId)

    toast({
      title: `${action} Task`,
      description: `Action ${action.toLowerCase()} performed on task "${task?.title}"`,
    })
  }

  const handleProgressUpdate = () => {
    if (!selectedTask || newProgress === undefined) return

    toast({
      title: "Progress Updated",
      description: `Progress for "${selectedTask.title}" updated to ${newProgress}%`,
    })

    setProgressUpdateOpen(false)
  }

  const handleUpdateTaskNotes = () => {
    if (!selectedTask || !taskNotes.trim()) return

    toast({
      title: "Notes Updated",
      description: `Notes for "${selectedTask.title}" have been updated.`,
    })

    setTaskDetailsOpen(false)
  }

  const handleMarkAsComplete = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId)

    toast({
      title: "Task Completed",
      description: `"${task?.title}" has been marked as completed.`,
    })
  }

  const TaskDetails = () => {
    if (!selectedTask) return null

    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{selectedTask.title}</h2>
            <StatusBadge status={selectedTask.status} />
          </div>
          <p className="text-muted-foreground">{selectedTask.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Project</p>
              <p className="font-medium">{selectedTask.project}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Client</p>
              <p className="font-medium">{selectedTask.client}</p>
              <p className="text-sm text-muted-foreground">{selectedTask.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Due Date</p>
              <p className="font-medium">{selectedTask.dueDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Priority</p>
              <PriorityBadge priority={selectedTask.priority} />
            </div>
          </div>
          {selectedTask.episodeTitle && (
            <div>
              <p className="text-sm text-muted-foreground">Related Episode</p>
              <p className="font-medium">{selectedTask.episodeTitle}</p>
            </div>
          )}

          {selectedTask.status === "in_progress" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Progress</p>
                <p className="text-sm font-medium">{selectedTask.progress}%</p>
              </div>
              <Progress value={selectedTask.progress} className="h-2" />
              <Button variant="outline" size="sm" className="mt-2" onClick={() => setProgressUpdateOpen(true)}>
                Update Progress
              </Button>
            </div>
          )}
        </div>

        {selectedTask.attachments.length > 0 && (
          <>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Attachments</h3>
              <div className="space-y-2">
                {selectedTask.attachments.map((attachment: any, index: number) => (
                  <div key={index} className="flex items-center justify-between rounded-md border p-3">
                    <div className="flex items-center gap-3">
                      {attachment.type === "audio" && <FileText className="h-5 w-5 text-blue-500" />}
                      {attachment.type === "document" && <FileText className="h-5 w-5 text-yellow-500" />}
                      {attachment.type === "archive" && <FileText className="h-5 w-5 text-purple-500" />}
                      <div>
                        <p className="font-medium">{attachment.name}</p>
                        <p className="text-xs text-muted-foreground">{attachment.size}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <Separator />

        <div className="space-y-3">
          <h3 className="text-lg font-medium">Task Notes</h3>
          <Textarea
            placeholder="Add your notes here..."
            className="min-h-32"
            defaultValue={selectedTask.notes}
            onChange={(e) => setTaskNotes(e.target.value)}
          />
          <Button onClick={handleUpdateTaskNotes}>Update Notes</Button>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setTaskDetailsOpen(false)}>
            Close
          </Button>
          {selectedTask.status !== "completed" && (
            <Button onClick={() => handleMarkAsComplete(selectedTask.id)}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Complete
            </Button>
          )}
        </div>
      </div>
    )
  }

  const ProgressUpdateDialog = () => {
    if (isDesktop) {
      return (
        <Dialog open={progressUpdateOpen} onOpenChange={setProgressUpdateOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update Progress</DialogTitle>
              <DialogDescription>Update the progress for {selectedTask?.title}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="progress">Progress (%)</Label>
                <Input
                  id="progress"
                  type="number"
                  min="0"
                  max="100"
                  defaultValue={selectedTask?.progress}
                  onChange={(e) => setNewProgress(Number.parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="progress-notes">Notes (Optional)</Label>
                <Textarea id="progress-notes" placeholder="Add notes about this progress update" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setProgressUpdateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleProgressUpdate}>Update Progress</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    }

    return (
      <Drawer open={progressUpdateOpen} onOpenChange={setProgressUpdateOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Update Progress</DrawerTitle>
            <DrawerDescription>Update the progress for {selectedTask?.title}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="progress-mobile">Progress (%)</Label>
              <Input
                id="progress-mobile"
                type="number"
                min="0"
                max="100"
                defaultValue={selectedTask?.progress}
                onChange={(e) => setNewProgress(Number.parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="progress-notes-mobile">Notes (Optional)</Label>
              <Textarea id="progress-notes-mobile" placeholder="Add notes about this progress update" />
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={handleProgressUpdate}>Update Progress</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  const TaskDetailsDialog = () => {
    if (isDesktop) {
      return (
        <Dialog open={taskDetailsOpen} onOpenChange={setTaskDetailsOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Task Details</DialogTitle>
              <DialogDescription>View and manage task information</DialogDescription>
            </DialogHeader>
            <TaskDetails />
          </DialogContent>
        </Dialog>
      )
    }

    return (
      <Drawer open={taskDetailsOpen} onOpenChange={setTaskDetailsOpen}>
        <DrawerContent className="max-h-[90vh] overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>Task Details</DrawerTitle>
            <DrawerDescription>View and manage task information</DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <TaskDetails />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Production Tasks</h1>
        <Button className="bg-podmanage-orange hover:bg-podmanage-orange/90">
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Production Tasks</CardTitle>
          <CardDescription>Track and manage your podcast editing and production tasks</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredTasks.length > 0 ? (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-lg border p-4 hover:border-podmanage-orange/50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedTask(task)
                    setTaskDetailsOpen(true)
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="md:w-1/2">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{task.title}</div>
                        <PriorityBadge priority={task.priority} />
                      </div>
                      <div className="text-sm text-muted-foreground mt-1 line-clamp-2">{task.description}</div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>Due {task.dueDate}</span>
                      </div>
                    </div>
                    <div className="md:w-1/4">
                      <div className="text-sm font-medium">Project</div>
                      <div className="text-sm">{task.project}</div>
                      <div className="text-sm font-medium mt-1">Client</div>
                      <div className="text-sm">{task.client}</div>
                    </div>
                    <div className="md:w-1/4">
                      <div className="space-y-2">
                        <StatusBadge status={task.status} />

                        {task.status === "in_progress" && (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span>Progress</span>
                              <span>{task.progress}%</span>
                            </div>
                            <Progress value={task.progress} className="h-1.5" />
                          </div>
                        )}

                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
              <p className="text-muted-foreground">No tasks found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs for task interactions */}
      <TaskDetailsDialog />
      <ProgressUpdateDialog />
    </div>
  )
}

