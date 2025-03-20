"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/dashboard/user-nav"
import { Bell, HelpCircle, Clock, CheckCircle, MessageSquare } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"
import { Logo } from "@/components/ui/logo"

export function Header() {
  const router = useRouter()

  // Use state for notifications so they can be dismissed
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
      read: false,
      type: "success",
      action: "/dashboard/schedule",
      episodeId: 1,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleNotificationClick = (notification: any) => {
    // Mark the notification as read
    setNotifications(notifications.map((n) => (n.id === notification.id ? { ...n, read: true } : n)))

    // Navigate to the appropriate page
    router.push(notification.action)
  }

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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex h-14 items-center">
        <div className="mr-4 flex items-center logo-container">
          <Logo className="w-24 h-10 object-contain" />
        </div>
        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Help" asChild>
                  <Link href="/dashboard/help">
                    <HelpCircle className="h-5 w-5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Help & Support</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
                      <Bell className="h-5 w-5" />
                      {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-podmanage-orange text-white text-[10px]">
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={`flex items-start gap-3 p-3 cursor-pointer hover:bg-muted transition-colors ${!notification.read ? "bg-muted/50" : ""}`}
                      onClick={() => handleNotificationClick(notification)}
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
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="py-6 text-center text-muted-foreground">
                    <p>No notifications</p>
                  </div>
                )}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-center text-sm text-podmanage-orange justify-center cursor-pointer hover:bg-muted transition-colors"
                onClick={() => router.push("/dashboard/notifications")}
              >
                View All Notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <UserNav />
        </div>
      </div>
    </header>
  )
}

