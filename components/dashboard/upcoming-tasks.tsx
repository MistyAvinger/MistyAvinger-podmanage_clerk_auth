"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, FileAudio, ThumbsUp, ArrowDown } from "lucide-react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"

interface Task {
  id: number
  title: string
  dueDate: string
  status: "pending" | "completed"
  type: "upload" | "review" | "notes" | "approved"
}

export function UpcomingTasks() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Upload Episode 6 raw audio",
      dueDate: "2 days",
      status: "pending",
      type: "upload",
    },
    {
      id: 2,
      title: "Review edited Episode 5",
      dueDate: "Today",
      status: "pending",
      type: "review",
    },
    {
      id: 3,
      title: "Provide episode notes for Episode 7",
      dueDate: "5 days",
      status: "pending",
      type: "notes",
    },
    {
      id: 4,
      title: "Episode 4 approved",
      dueDate: "Yesterday",
      status: "completed",
      type: "approved",
    },
  ])

  const [draggedTask, setDraggedTask] = useState<number | null>(null)

  const getIcon = (type: string) => {
    switch (type) {
      case "upload":
        return <FileAudio className="h-4 w-4" />
      case "review":
        return <ThumbsUp className="h-4 w-4" />
      case "notes":
        return <Clock className="h-4 w-4" />
      case "approved":
        return <CheckCircle2 className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const completeTask = (taskId: number) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: "completed" } : task)))

    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  const handleDragStart = (taskId: number) => {
    setDraggedTask(taskId)
  }

  const handleDragEnd = () => {
    if (draggedTask !== null) {
      completeTask(draggedTask)
      setDraggedTask(null)
    }
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-card-hover h-full">
      <CardHeader>
        <CardTitle>Action Items</CardTitle>
        <CardDescription>Tasks that need your attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium mb-2">Pending Tasks</h3>
            <div className="min-h-[100px] space-y-2">
              {tasks
                .filter((task) => task.status === "pending")
                .map((task) => (
                  <motion.div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-start justify-between rounded-lg border p-3 transition-all duration-300 hover:border-podmanage-orange/50 cursor-grab active:cursor-grabbing ${
                      task.status === "completed"
                        ? "border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-900"
                        : "border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-900"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {getIcon(task.type)}
                        <p className="text-sm font-medium">{task.title}</p>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>
                          {task.status === "completed" ? "Completed " : "Due "}
                          {task.dueDate}
                        </span>
                      </div>
                    </div>
                    {task.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="transition-all duration-300 hover:scale-[1.05]"
                        onClick={() => completeTask(task.id)}
                      >
                        {task.type === "upload" ? "Upload" : task.type === "review" ? "Review" : "Complete"}
                      </Button>
                    )}
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Drop zone for completed tasks */}
          <div
            className="border-2 border-dashed border-green-300 dark:border-green-700 rounded-lg p-4 min-h-[100px] flex flex-col items-center justify-center bg-green-50/50 dark:bg-green-900/10 transition-colors duration-300"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDragEnd}
          >
            <ArrowDown className="h-6 w-6 text-green-500 mb-2 animate-bounce" />
            <p className="text-sm text-center text-green-700 dark:text-green-400 font-medium">
              Drop tasks here to mark as complete
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium mb-2">Completed Tasks</h3>
            <div className="min-h-[100px] space-y-2">
              {tasks
                .filter((task) => task.status === "completed")
                .map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start justify-between rounded-lg border p-3 ${"border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-900"}`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {getIcon(task.type)}
                        <p className="text-sm font-medium">{task.title}</p>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>Completed {task.dueDate}</span>
                      </div>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

