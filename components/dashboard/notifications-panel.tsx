"use client"

import { Bell, Clock, MessageSquare, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function NotificationsPanel() {
  const router = useRouter()

  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Episode Ready for Review",
      description: 'Your episode "Interview with Industry Expert" is ready for review.',
      time: "2 hours ago",
      type: "review",
      action: "/dashboard/production",
      episodeId: 2,
    },
    {
      id: 2,
      title: "Feedback Requested",
      description: 'The production team has requested feedback on "Deep Dive into Topic X".',
      time: "Yesterday",
      type: "feedback",
      action: "/dashboard/production",
      episodeId: 3,
    },
  ])

  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "review":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "feedback":
        return <MessageSquare className="h-5 w-5 text-yellow-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />
    }
  }

  const handleNotificationClick = (notification: any) => {
    // Mark notification as read by removing it from the list
    setNotifications(notifications.filter((n) => n.id !== notification.id))

    // Navigate to the appropriate page
    router.push(notification.action)
  }

  return (
    <Card className="card-gradient overflow-hidden transition-all duration-300 hover:shadow-card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-heading">Recent Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start gap-3 p-3 rounded-md bg-background/50 cursor-pointer hover:bg-muted transition-all duration-200 hover:scale-[1.02]"
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="mt-1">{getNotificationIcon(notification.type)}</div>
              <div className="flex-1">
                <div className="font-medium">{notification.title}</div>
                <div className="text-sm text-muted-foreground line-clamp-1">{notification.description}</div>
                <div className="text-xs text-muted-foreground mt-1">{notification.time}</div>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          className="w-full mt-3 text-podmanage-orange hover:text-podmanage-orange-dark"
          onClick={() => router.push("/dashboard/notifications")}
        >
          View All
        </Button>
      </CardContent>
    </Card>
  )
}

