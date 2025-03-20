"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProjectsOverview } from "@/components/admin/projects-overview"
import { TasksOverview } from "@/components/admin/tasks-overview"
import { SubscriptionsOverview } from "@/components/admin/subscriptions-overview"
import { CalendarView } from "@/components/admin/calendar-view"
import { NewUserNotification } from "@/components/admin/new-user-notification"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Clock, AlertTriangle, CheckCircle, Calendar, Upload, Edit } from "lucide-react"
import { motion } from "framer-motion"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Array<{ id: number; userName: string; projectId: number }>>([])
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "warning" | "info"
    message: string
  }>({ type: "success", message: "All systems operational. You're up to date!" })

  // Mock urgent tasks data
  const urgentTasks = [
    {
      id: 1,
      title: "Review Episode Edit",
      project: "Tech Talk",
      projectId: 1,
      dueDate: "Today",
      status: "ready_for_approval",
      priority: "high",
    },
    {
      id: 2,
      title: "Approve Cover Art",
      project: "Health & Wellness",
      projectId: 2,
      dueDate: "Today",
      status: "ready_for_approval",
      priority: "high",
    },
    {
      id: 3,
      title: "Start Editing New Upload",
      project: "Business Insights",
      projectId: 3,
      dueDate: "Tomorrow",
      status: "raw_uploaded",
      priority: "medium",
    },
  ]

  // Simulate receiving a new user notification
  useEffect(() => {
    // This would normally come from a real-time notification system
    const timer = setTimeout(() => {
      setNotifications([{ id: 1, userName: "Alex Johnson", projectId: 6 }])

      // Update status message based on tasks
      if (urgentTasks.length > 0) {
        setStatusMessage({
          type: "warning",
          message: `You have ${urgentTasks.length} urgent tasks that need attention.`,
        })
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const handleTaskClick = (projectId: number) => {
    router.push(`/admin/projects/${projectId}`)
  }

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

  // Helper function to render priority indicator
  const PriorityIndicator = ({ priority }: { priority: string }) => {
    switch (priority) {
      case "high":
        return (
          <div className="flex items-center">
            <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-xs text-red-500 font-medium">High Priority</span>
          </div>
        )
      case "medium":
        return (
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-amber-500 mr-1" />
            <span className="text-xs text-amber-500 font-medium">Medium Priority</span>
          </div>
        )
      default:
        return null
    }
  }

  // Mock data for system status
  const systemStatus = {
    allOperational: false,
    pendingTickets: 3,
    paymentIssues: 1,
    pendingApprovals: 2,
  }

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Status Alert */}
      {systemStatus.allOperational ? (
        <Alert className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>All Systems Operational</AlertTitle>
          <AlertDescription>Everything is up to date. No pending tasks require your attention.</AlertDescription>
        </Alert>
      ) : (
        <Alert className="bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Action Required</AlertTitle>
          <AlertDescription>
            You have {systemStatus.pendingTickets} pending support tickets, {systemStatus.paymentIssues} payment issues,
            and {systemStatus.pendingApprovals} episodes awaiting approval.
          </AlertDescription>
        </Alert>
      )}

      {/* Urgent Tasks Section */}
      <Card className="border-l-4 border-l-red-500">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            Urgent Tasks
          </CardTitle>
          <CardDescription>Tasks that require immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {urgentTasks.length > 0 ? (
              urgentTasks.map((task) => (
                <motion.div
                  key={task.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:border-podmanage-orange/50 hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => handleTaskClick(task.projectId)}
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
                    <PriorityIndicator priority={task.priority} />
                  </div>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </motion.div>
              ))
            ) : (
              <div className="flex h-20 items-center justify-center rounded-md border border-dashed">
                <p className="text-muted-foreground">No urgent tasks</p>
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

      {/* Main Dashboard Grid - Rearranged to prioritize tasks */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 lg:col-span-2">
          <TasksOverview />
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          <ProjectsOverview />
        </div>
      </div>

      {/* Calendar and Subscriptions Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Global Calendar</CardTitle>
            <CardDescription>View all podcast projects and their schedules</CardDescription>
          </CardHeader>
          <CardContent>
            <CalendarView />
          </CardContent>
        </Card>
        <SubscriptionsOverview />
      </div>

      {/* Notifications */}
      {notifications.map((notification) => (
        <NewUserNotification
          key={notification.id}
          userName={notification.userName}
          projectId={notification.projectId}
          onDismiss={() => dismissNotification(notification.id)}
        />
      ))}
    </motion.div>
  )
}

