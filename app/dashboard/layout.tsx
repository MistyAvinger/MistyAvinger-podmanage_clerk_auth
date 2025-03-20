"use client"

import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background dark:bg-podmanage-dark-bg transition-colors duration-300">
      <Header />
      <div className="flex flex-1 h-[calc(100vh-4rem)]">
        {/* Fixed Sidebar Width */}
        <Sidebar className="w-64" />
        {/* Ensure Main Content Fills Space */}
        <main className="flex-1 overflow-y-auto bg-muted/20 dark:bg-podmanage-dark-bg/50 p-6">
          <div className="max-w-[2000px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}

