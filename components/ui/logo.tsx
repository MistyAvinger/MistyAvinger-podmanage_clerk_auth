"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface LogoProps {
  className?: string
}

export function Logo({ className = "w-32 h-auto" }: LogoProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only render logo after component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Use resolvedTheme which includes system preference detection
  const currentTheme = resolvedTheme || theme

  // If not mounted yet, use a transparent placeholder to avoid layout shift
  if (!mounted) {
    return <div className={`${className} bg-transparent`}></div>
  }

  return (
    <Image
      src={
        currentTheme === "dark"
          ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/I%20%282%29-38QZWQSfvbbZcNhfO5SyA7MKQ5XD6X.png"
          : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-cy8SKX8IkCrsuDtjJY39YiNbgpmqp8.png"
      }
      alt="PodManage Logo"
      width={128}
      height={128}
      className={`transition-opacity duration-300 ${className}`}
      priority
    />
  )
}

