"use client"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/dashboard/user-nav"
import { Bell, Settings, Users, HelpCircle, Moon, Sun } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/ui/logo"

export function AdminHeader() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  // Sample notifications data for admin
  const notifications = [
    {
      id: 1,
      title: "New Project Created",
      description: "A new podcast project 'Tech Insights' has been created.",
      time: "1 hour ago",
      read: false,
      type: "project",
      action: "/admin/projects",
    },
    {
      id: 2,
      title: "Payment Issue",
      description: "User John Doe has a failed payment that needs attention.",
      time: "3 hours ago",
      read: false,
      type: "payment",
      action: "/admin/subscriptions",
    },
    {
      id: 3,
      title: "Support Request",
      description: "New support ticket #1234 requires your attention.",
      time: "Yesterday",
      read: false,
      type: "support",
      action: "/admin/help",
    },
    {
      id: 4,
      title: "System Update",
      description: "Platform update scheduled for next week.",
      time: "2 days ago",
      read: true,
      type: "system",
      action: "/admin/settings",
    },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleNotificationClick = (notification: any) => {
    // In a real app, you would mark the notification as read here
    console.log(`Navigating to ${notification.action}`)

    // Navigate to the appropriate page
    router.push(notification.action)
  }

  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "project":
        return <Users className="h-5 w-5 text-blue-500" />
      case "payment":
        return <Bell className="h-5 w-5 text-red-500" />
      case "support":
        return <HelpCircle className="h-5 w-5 text-yellow-500" />
      case "system":
        return <Settings className="h-5 w-5 text-green-500" />
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex h-14 items-center">
        <div className="mr-4 flex items-center logo-container">
          <Logo className="w-24 h-10 object-contain" />
        </div>
        <div className="ml-auto flex items-center gap-4">
          {/* Theme Toggle Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle {theme === "dark" ? "light" : "dark"} mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Notifications">
                      <div className="relative">
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-podmanage-orange text-white text-[10px]">
                            {unreadCount}
                          </Badge>
                        )}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Admin Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Admin Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={`flex items-start gap-3 p-3 cursor-pointer hover:bg-muted transition-colors ${
                        !notification.read ? "bg-muted/50" : ""
                      }`}
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
                onClick={() => router.push("/admin/notifications")}
              >
                View All Notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" aria-label="Settings" onClick={() => router.push("/admin/settings")}>
            <Settings className="h-5 w-5" />
          </Button>
          <UserNav />
        </div>
      </div>
    </header>
  )
}

