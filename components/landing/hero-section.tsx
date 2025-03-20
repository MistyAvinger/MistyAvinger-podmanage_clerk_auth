"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

// Import the scroll utility
// import { scrollToSection } from "@/lib/scroll-utils"

export function HeroSection() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [resolvedTheme])

  // If not mounted yet, show a placeholder to avoid layout shift
  if (!mounted) {
    return (
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-podmanage-orange/10 via-background to-background dark:from-podmanage-orange/5 dark:via-background dark:to-background -z-10" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="h-32 bg-muted/20 rounded-lg animate-pulse"></div>
              <div className="h-24 bg-muted/20 rounded-lg mt-6 animate-pulse"></div>
            </div>
            <div className="relative">
              <div className="relative mx-auto w-full max-w-md aspect-square bg-muted/20 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-podmanage-orange/10 via-background to-background dark:from-podmanage-orange/5 dark:via-background dark:to-background -z-10" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-podmanage-orange/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 bg-clip-text text-transparent bg-gradient-to-r from-podmanage-orange to-podmanage-orange-dark">
              🎙️ Your Podcast, Made Simple!
            </h1>
            <p className="text-xl text-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0">
              From brilliant idea to captivated audience in just a few clicks! Join thousands of creators who've
              simplified their podcast workflow and amplified their reach with PodManage.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <motion.div whileHover={{ scale: 1.05 }} className="w-full sm:w-auto">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center w-full px-8 py-4 text-lg font-bold text-white transition-all duration-300 rounded-full shadow-[0_4px_14px_0_rgba(255,107,0,0.39)] bg-gradient-to-r from-podmanage-orange to-podmanage-orange-dark hover:shadow-[0_6px_20px_rgba(255,107,0,0.5)] group"
                >
                  Start Your Podcast Journey
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="w-full sm:w-auto">
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center w-full px-8 py-4 text-lg font-medium text-podmanage-orange border-2 border-podmanage-orange rounded-full transition-all duration-300 hover:bg-podmanage-orange/10 group"
                >
                  Explore Features
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-md aspect-square">
              <div className="absolute inset-0 bg-gradient-to-r from-podmanage-orange/20 to-podmanage-orange/10 rounded-2xl -m-2 blur-xl"></div>
              {/* Use the same image for both light and dark modes */}
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/I%20%284%29-KgRwAOEQsodpQ23mXSBJ4P3YskawP3.png"
                alt="Joyful podcaster recording content"
                fill
                className="object-cover rounded-2xl shadow-2xl"
              />

              {/* Floating elements */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-podmanage-dark-card p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-podmanage-orange"
                  >
                    <path d="M12 2v8" />
                    <path d="m4.93 10.93 1.41 1.41" />
                    <path d="M2 18h2" />
                    <path d="M20 18h2" />
                    <path d="m19.07 10.93-1.41 1.41" />
                    <path d="M22 22H2" />
                    <path d="m8 22 4-10 4 10" />
                    <path d="M12 22v-4" />
                  </svg>
                  <span className="text-sm font-medium">Podcast Management</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

