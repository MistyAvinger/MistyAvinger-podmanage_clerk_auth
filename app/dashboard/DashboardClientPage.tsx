"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { DashboardOverview } from "@/components/dashboard/overview"
import { PodcastProgress } from "@/components/dashboard/podcast-progress"
import { UpcomingTasks } from "@/components/dashboard/upcoming-tasks"
import { EpisodeUsageTracker } from "@/components/dashboard/episode-usage-tracker"
import { Button } from "@/components/ui/button"
import { Upload, BarChart2, Bell } from "lucide-react"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"
import { useAuth } from "@clerk/nextjs"

export default function DashboardClientPage() {
  const router = useRouter()
  const { isLoaded, isSignedIn, userId } = useAuth()
  const [greeting, setGreeting] = useState("")
  const [userName, setUserName] = useState("Podcaster")
  const [usedEpisodes, setUsedEpisodes] = useState(2)
  const [totalEpisodes, setTotalEpisodes] = useState(3)

  // Add authentication check
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/login')
    }
  }, [isLoaded, isSignedIn, router])
  
  // Show loading state while checking auth
  if (!isLoaded || !isSignedIn) {
    return <div className="flex h-screen items-center justify-center">Loading dashboard...</div>
  }

  // Calculate next cycle date (first day of next month)
  const nextCycleDate = new Date()
  nextCycleDate.setMonth(nextCycleDate.getMonth() + 1)
  nextCycleDate.setDate(1)
  const formattedNextCycleDate = nextCycleDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const greetings = [
    "Welcome back, {name}! Let's make podcast magic! 🎙️",
    "Hey {name}, ready to launch your next episode? 🚀",
    "Good to see you, {name}! Your podcast awaits! ✨",
    "It's podcast time, {name}! Let's create something amazing! 🎧",
    "Welcome, {name}! Ready to captivate your audience? 🌟",
  ]

  useEffect(() => {
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]
    setGreeting(randomGreeting.replace("{name}", userName))
  }, [userName])

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold">{greeting}</h1>
        <p className="text-muted-foreground">Here's what's happening with your podcast today</p>
      </motion.div>

      {/* Episode Usage Tracker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <EpisodeUsageTracker
          usedEpisodes={usedEpisodes}
          totalEpisodes={totalEpisodes}
          nextCycleDate={formattedNextCycleDate}
        />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button
          onClick={() => router.push("/dashboard/production?tab=upload")}
          className="h-20 bg-gradient-to-r from-podmanage-orange to-podmanage-orange-dark hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          disabled={usedEpisodes >= totalEpisodes}
        >
          <Upload className="mr-2 h-5 w-5" />
          <span className="text-lg">Upload New Episode 🎤</span>
        </Button>

        <Button
          onClick={() => router.push("/dashboard/production")}
          className="h-20 bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          <BarChart2 className="mr-2 h-5 w-5" />
          <span className="text-lg">View Podcast Progress 📊</span>
        </Button>

        <Button
          onClick={triggerConfetti}
          className="h-20 bg-gradient-to-r from-purple-500 to-purple-600 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          <Bell className="mr-2 h-5 w-5" />
          <span className="text-lg">Check Notifications 🔔</span>
        </Button>
      </motion.div>

      {/* Main Content Grid */}
      <div className="space-y-6">
        {/* First Row: Action Items and Production Workflow */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <UpcomingTasks />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <PodcastProgress />
          </motion.div>
        </div>

        {/* Second Row: Overview (Full Width) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <DashboardOverview />
        </motion.div>
      </div>
    </div>
  )
}

