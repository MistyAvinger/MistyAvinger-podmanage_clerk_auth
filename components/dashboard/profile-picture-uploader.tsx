"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileUploader } from "@/components/ui/file-uploader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ProfilePictureUploaderProps {
  onProfilePictureChange: (url: string) => void
  initialProfilePicture?: string
  displayName: string
}

export function ProfilePictureUploader({
  onProfilePictureChange,
  initialProfilePicture,
  displayName,
}: ProfilePictureUploaderProps) {
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | undefined>(initialProfilePicture)

  const handleUploadComplete = (url: string) => {
    setProfilePictureUrl(url)
    onProfilePictureChange(url)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
        <CardDescription>Upload a profile picture to personalize your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="flex flex-col items-center justify-center">
            <Avatar className="h-32 w-32 mb-4">
              {profilePictureUrl ? (
                <AvatarImage src={profilePictureUrl} alt={displayName} />
              ) : (
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt={displayName} />
              )}
              <AvatarFallback className="text-4xl">{displayName.charAt(0)}</AvatarFallback>
            </Avatar>

            <FileUploader
              bucketName="cover-art"
              folderPath="profile-pictures"
              fileTypes={["jpg", "jpeg", "png"]}
              maxSizeMB={2}
              onUploadComplete={handleUploadComplete}
              buttonText="Upload Profile Picture"
              showPreview={false} // We're using the Avatar component for preview
              className="w-full max-w-sm"
            />
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Recommended: Square image, at least 400x400 pixels. Maximum file size: 2MB.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

