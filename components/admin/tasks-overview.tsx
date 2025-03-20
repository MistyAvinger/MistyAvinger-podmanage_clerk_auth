"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Edit, Clock, CheckCircle, Calendar, FileCheck } from "lucide-react"
import { motion } from "framer-motion"

export function TasksOverview() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")

  // Mock tasks data with more detailed status information
  const allTasks = [
    {
      id: 1,
      title: "Review Episode Edit",
      project: "Tech Talk",
      projectId: 1,
      dueDate: "Today",
      status: "ready_for_approval",
      completed: false,
    },
    {
      id: 2,
      title: "Approve Cover Art",
      project: "Health & Wellness",
      projectId: 2,
      dueDate: "Tomorrow",
      status: "ready_for_approval",
      completed: false,
    },
    {
      id: 3,
      title: "Schedule Release",
      project: "Business Insights",
      projectId: 3,
      dueDate: "In 2 days",
      status: "approved",
      completed: false,
    },
    {
      id: 4,
      title: "Start Editing New Upload",
      project: "Science Explained",
      projectId: 5,
      dueDate: "In 3 days",
      status: "raw_uploaded",
      completed: false,
    },
    {
      id: 5,
      title: "Continue Editing Episode",
      project: "Tech Talk",
      projectId: 1,
      dueDate: "In 4 days",
      status: "editing_in_progress",
      completed: false,
    },
    {
      id: 6,
      title: "Upload Final Edit",
      project: "Business Insights",
      projectId: 3,
      dueDate: "Completed",
      status: "editing_in_progress",
      completed: true,
    },
  ]

  // Filter tasks based on active tab and completion status
  const filteredTasks = allTasks.filter((task) => {
    if (activeTab === "all") return !task.completed
    if (activeTab === "editing")
      return (task.status === "raw_uploaded" || task.status === "editing_in_progress") && !task.completed
    if (activeTab === "review") return task.status === "ready_for_approval" && !task.completed
    if (activeTab === "approved") return task.status === "approved" && !task.completed
    if (activeTab === "completed") return task.completed
    return true
  })

  // Helper function to render task status badge
  const TaskStatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "raw_uploaded":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Upload className="mr-1 h-3 w-3" />
            New Upload
          </Badge>
        )
      case "editing_in_progress":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <Edit className="mr-1 h-3 w-3" />
            Editing
          </Badge>
        )
      case "ready_for_approval":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="mr-1 h-3 w-3" />
            Review
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            Approved
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
            <Calendar className="mr-1 h-3 w-3" />
            Scheduled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleTaskClick = (projectId: number) => {
    router.push(`/admin/projects/${projectId}`)
  }

  const handleMarkComplete = (taskId: number, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent task click from firing
    // In a real app, this would update the task status in the database
    console.log(`Task ${taskId} marked as complete`)
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Tasks Overview</CardTitle>
        <CardDescription>Manage tasks across all projects</CardDescription>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="editing">Editing</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                className="flex items-center justify-between rounded-lg border p-3 hover:border-podmanage-orange/50 hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => handleTaskClick(task.projectId)}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{task.title}</p>
                    <TaskStatusBadge status={task.status} />
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>{task.project}</span>
                    <span className="mx-1">•</span>
                    <span className={task.dueDate === "Today" ? "text-red-500 font-medium" : ""}>
                      Due {task.dueDate}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {task.status === "raw_uploaded" && (
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleTaskClick(task.projectId)
                      }}
                    >
                      Start Editing
                    </Button>
                  )}
                  {task.status === "editing_in_progress" && (
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleTaskClick(task.projectId)
                      }}
                    >
                      Continue
                    </Button>
                  )}
                  {task.status === "ready_for_approval" && (
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleTaskClick(task.projectId)
                      }}
                    >
                      Review
                    </Button>
                  )}
                  {task.status === "approved" && (
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleTaskClick(task.projectId)
                      }}
                    >
                      Schedule
                    </Button>
                  )}
                  {!task.completed && (
                    <Button size="sm" variant="outline" onClick={(e) => handleMarkComplete(task.id, e)}>
                      <FileCheck className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
              <p className="text-muted-foreground">No tasks in this category</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="ml-auto" onClick={() => router.push("/admin/tasks")}>
          View All Tasks
        </Button>
      </CardFooter>
    </Card>
  )
}

