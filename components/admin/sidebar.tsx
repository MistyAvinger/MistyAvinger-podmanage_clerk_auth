"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, FileText, Users, Calendar, Settings, HelpCircle } from "lucide-react"

export function AdminSidebar({ className = "" }) {
  const pathname = usePathname()

  const routes = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: Home,
    },
    {
      title: "Projects",
      href: "/admin/projects",
      icon: FileText,
    },
    {
      title: "Tasks",
      href: "/admin/tasks",
      icon: Users,
    },
    {
      title: "Calendar",
      href: "/admin/calendar",
      icon: Calendar,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <div className={`h-screen w-64 bg-sidebar p-4 ${className}`}>
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">PodManage Admin</h2>
      <nav className="space-y-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`flex items-center p-3 rounded-md transition-all duration-200 ${
              pathname === route.href
                ? "bg-podmanage-orange text-gray-900 dark:text-white font-medium"
                : "text-gray-900 dark:text-white hover:bg-muted/20"
            }`}
          >
            <route.icon className="w-5 h-5" />
            <span className="ml-3">{route.title}</span>
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-8">
        <Link
          href="/admin/help"
          className={`flex items-center p-3 rounded-md transition-all duration-200 ${
            pathname === "/admin/help"
              ? "bg-podmanage-orange text-gray-900 dark:text-white font-medium"
              : "text-gray-900 dark:text-white hover:bg-muted/20"
          }`}
        >
          <HelpCircle className="w-5 h-5" />
          <span className="ml-3">Help & Support</span>
        </Link>
      </div>
    </div>
  )
}

