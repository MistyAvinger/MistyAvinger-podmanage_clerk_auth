"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { logout, getUserProfile, updateUserProfile } from "@/lib/auth-service"

export function UserNav() {
  const router = useRouter()
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [displayName, setDisplayName] = useState("User Name")
  const [email, setEmail] = useState("user@example.com")
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const user = getUserProfile()
        if (user) {
          setEmail(user.email || "user@example.com")
          setDisplayName(user.name || user.email?.split("@")[0] || "User Name")
          if (user.avatarUrl) {
            setProfileImage(user.avatarUrl)
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target) {
          setProfileImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleLogout = async () => {
    try {
      logout()
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const handleSaveProfile = async () => {
    try {
      updateUserProfile({
        name: displayName,
        avatarUrl: profileImage,
      })
      setIsProfileDialogOpen(false)
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  if (isLoading) {
    return (
      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        <Avatar className="h-8 w-8">
          <AvatarFallback>...</AvatarFallback>
        </Avatar>
      </Button>
    )
  }

  return (
    <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              {profileImage ? (
                <AvatarImage src={profileImage} alt={displayName} />
              ) : (
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt={displayName} />
              )}
              <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{displayName}</p>
              <p className="text-xs leading-none text-muted-foreground">{email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setIsProfileDialogOpen(true)}>Profile</DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings?tab=subscription">Subscription</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your profile information</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="profile-image">Profile Image</Label>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                {profileImage ? (
                  <AvatarImage src={profileImage} alt={displayName} />
                ) : (
                  <AvatarImage src="/placeholder.svg?height=64&width=64" alt={displayName} />
                )}
                <AvatarFallback className="text-lg">{displayName.charAt(0)}</AvatarFallback>
              </Avatar>
              <Input id="profile-image" type="file" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="display-name">Display Name</Label>
            <Input id="display-name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} disabled />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsProfileDialogOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSaveProfile}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

