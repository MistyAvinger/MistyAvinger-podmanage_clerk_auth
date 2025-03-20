"use client";

import { SignIn } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    console.log("Login page - Auth state:", { isLoaded, isSignedIn })
    
    if (isLoaded && isSignedIn) {
      console.log("User is signed in, redirecting to dashboard")
      router.push('/dashboard')
    }
  }, [isLoaded, isSignedIn, router])
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <SignIn path="/login" redirectUrl="/dashboard" />
    </div>
  )
}
