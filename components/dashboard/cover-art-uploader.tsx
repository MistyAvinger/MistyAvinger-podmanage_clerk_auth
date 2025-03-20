"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUploader } from "@/components/ui/file-uploader"
import { motion } from "framer-motion"

interface CoverArtUploaderProps {
  onCoverArtChange: (url: string) => void
  initialCoverArt?: string
}

export function CoverArtUploader({ onCoverArtChange, initialCoverArt }: CoverArtUploaderProps) {
  const [coverArtUrl, setCoverArtUrl] = useState<string | undefined>(initialCoverArt)

  const handleUploadComplete = (url: string) => {
    setCoverArtUrl(url)
    onCoverArtChange(url)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card>
        <CardHeader>
          <CardTitle>Podcast Cover Art</CardTitle>
          <CardDescription>
            Upload your podcast cover art. This will be displayed in podcast directories and apps.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {coverArtUrl && (
              <div className="aspect-square max-w-[300px] mx-auto overflow-hidden rounded-md">
                <img
                  src={coverArtUrl || "/placeholder.svg"}
                  alt="Podcast Cover Art"
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <FileUploader
              bucketName="cover-art"
              folderPath="podcast-covers"
              fileTypes={["jpg", "jpeg", "png"]}
              maxSizeMB={5}
              onUploadComplete={handleUploadComplete}
              buttonText="Upload Cover Art"
              showPreview={!coverArtUrl} // Only show preview if we don't have a cover art URL yet
              previewClassName="aspect-square max-w-[300px] mx-auto"
            />

            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-2">Cover Art Requirements:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Square image (1:1 aspect ratio)</li>
                <li>Minimum size: 1400 x 1400 pixels</li>
                <li>Maximum size: 3000 x 3000 pixels</li>
                <li>Format: JPG or PNG</li>
                <li>Maximum file size: 5MB</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

