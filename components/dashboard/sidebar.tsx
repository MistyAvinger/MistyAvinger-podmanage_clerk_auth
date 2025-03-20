"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Mic, Calendar, Settings, HelpCircle, FileEdit, Headphones, Clock } from "lucide-react"

export function Sidebar({ className = "" }) {
  const pathname = usePathname()

  const routes = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Development",
      href: "/dashboard/development",
      icon: FileEdit,
    },
    {
      title: "Pre-Production",
      href: "/dashboard/pre-production",
      icon: Headphones,
    },
    {
      title: "Production",
      href: "/dashboard/production",
      icon: Mic,
    },
    {
      title: "Timeline",
      href: "/dashboard/schedule",
      icon: Clock,
    },
    {
      title: "Scheduled Episodes",
      href: "/dashboard/scheduled-episodes",
      icon: Calendar,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <div className={`h-screen w-64 bg-sidebar p-4 ${className}`}>
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">PodManage</h2>
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
          href="/dashboard/help"
          className={`flex items-center p-3 rounded-md transition-all duration-200 ${
            pathname === "/dashboard/help"
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

