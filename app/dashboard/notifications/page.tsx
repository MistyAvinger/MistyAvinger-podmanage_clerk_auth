"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Clock, MessageSquare, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function NotificationsPage() {
  // Sample notifications data with read status
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Episode Ready for Review",
      description: 'Your episode "Interview with Industry Expert" is ready for review.',
      time: "2 hours ago",
      read: false,
      type: "review",
      action: "/dashboard/production",
      episodeId: 2,
    },
    {
      id: 2,
      title: "Feedback Requested",
      description: 'The production team has requested feedback on "Deep Dive into Topic X".',
      time: "Yesterday",
      read: false,
      type: "feedback",
      action: "/dashboard/production",
      episodeId: 3,
    },
    {
      id: 3,
      title: "Episode Published",
      description: 'Your episode "Introduction to Our Podcast" has been published.',
      time: "3 days ago",
      read: true,
      type: "success",
      action: "/dashboard/schedule",
      episodeId: 1,
    },
    {
      id: 4,
      title: "New Comment",
      description: 'Someone left a comment on your episode "Tech Trends in 2023".',
      time: "5 days ago",
      read: true,
      type: "feedback",
      action: "/dashboard/production",
      episodeId: 4,
    },
    {
      id: 5,
      title: "Subscription Renewed",
      description: "Your PodManage subscription has been successfully renewed.",
      time: "1 week ago",
      read: true,
      type: "success",
      action: "/dashboard/settings",
      episodeId: null,
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

  // Mark notification as read
  const handleNotificationClick = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
        <Badge variant="outline" className="ml-2">
          {notifications.filter((n) => !n.read).length} unread
        </Badge>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "flex items-start gap-3 p-4 rounded-md cursor-pointer transition-colors",
                  notification.read ? "bg-background" : "bg-muted/50",
                )}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="font-medium flex items-center justify-between">
                    {notification.title}
                    {!notification.read && <span className="h-2 w-2 rounded-full bg-podmanage-orange"></span>}
                  </div>
                  <div className="text-sm text-muted-foreground">{notification.description}</div>
                  <div className="text-xs text-muted-foreground mt-1">{notification.time}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <Bell className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>No notifications</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

