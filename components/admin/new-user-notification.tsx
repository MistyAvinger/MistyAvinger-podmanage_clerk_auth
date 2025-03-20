"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NewUserNotificationProps {
  userName: string
  projectId: number
  onDismiss: () => void
}

export function NewUserNotification({ userName, projectId, onDismiss }: NewUserNotificationProps) {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onDismiss, 300) // Allow time for fade-out animation
    }, 10000) // Auto-dismiss after 10 seconds

    return () => clearTimeout(timer)
  }, [onDismiss])

  const handleViewProject = () => {
    router.push(`/admin/projects/${projectId}`)
    onDismiss()
  }

  return (
    <div
      className={`fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-md border border-gray-200 dark:border-gray-700 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 bg-podmanage-orange rounded-full p-2">
          <Bell className="h-5 w-5 text-white" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">New User Added: {userName}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            A new user has subscribed to the platform. Their project has been added to your dashboard.
          </p>
          <div className="mt-3 flex space-x-2">
            <Button size="sm" onClick={handleViewProject}>
              View Project
            </Button>
            <Button size="sm" variant="outline" onClick={onDismiss}>
              Dismiss
            </Button>
          </div>
        </div>
        <button
          type="button"
          className="ml-4 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
          onClick={onDismiss}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

