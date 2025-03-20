"use client"

import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      console.log("Dashboard layout - User not signed in, redirecting to login")
      router.push('/login')
    }
  }, [isLoaded, isSignedIn, router])
  
  // Show loading state while checking auth
  if (!isLoaded || !isSignedIn) {
    return <div className="flex h-screen items-center justify-center">Loading dashboard...</div>
  }
  
  return (
    <div className="flex min-h-screen flex-col bg-background dark:bg-podmanage-dark-bg transition-colors duration-300">
      <Header />
      <div className="flex flex-1 h-[calc(100vh-4rem)]">
        <Sidebar className="w-64" />
        <main className="flex-1 overflow-y-auto bg-muted/20 dark:bg-podmanage-dark-bg/50 p-6">
          <div className="max-w-[2000px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}

