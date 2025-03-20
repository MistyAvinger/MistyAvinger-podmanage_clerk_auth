"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UploadIcon, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FileUploaderProps {
  bucketName: string
  folderPath?: string
  fileTypes: string[]
  maxSizeMB: number
  onUploadComplete: (url: string) => void
  className?: string
  buttonText?: string
  showPreview?: boolean
  previewType?: "image" | "audio"
  previewClassName?: string
}

export function FileUploader({
  fileTypes,
  maxSizeMB,
  onUploadComplete,
  className = "",
  buttonText = "Upload File",
  showPreview = true,
  previewType = "image",
  previewClassName = "w-full h-40 object-cover rounded-md",
}: FileUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const { toast } = useToast()

  // Format accepted file types for the input element
  const acceptedFileTypes = fileTypes.map((type) => `.${type}`).join(",")

  // Format file types for display
  const fileTypesDisplay = fileTypes.map((type) => type.toUpperCase()).join(", ")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Check file size
      if (file.size > maxSizeMB * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `Maximum file size is ${maxSizeMB}MB`,
          variant: "destructive",
        })
        return
      }

      // Check file type
      const fileExt = file.name.split(".").pop()?.toLowerCase() || ""
      if (!fileTypes.includes(fileExt)) {
        toast({
          title: "Invalid file type",
          description: `Please upload a ${fileTypesDisplay} file`,
          variant: "destructive",
        })
        return
      }

      setUploadedFile(file)

      // Create preview URL for images
      if (previewType === "image") {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target) {
            setPreviewUrl(event.target.result as string)
          }
        }
        reader.readAsDataURL(file)
      }
    }
  }

  // Simulate file upload
  const handleUpload = async () => {
    if (!uploadedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate a mock URL for the uploaded file
      const mockUrl = URL.createObjectURL(uploadedFile)

      // Call the callback with the mock URL
      onUploadComplete(mockUrl)

      toast({
        title: "Upload Successful",
        description: "Your file has been uploaded successfully",
      })
    } catch (err) {
      console.error("Unexpected error during upload:", err)
      toast({
        title: "Upload Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {showPreview && previewType === "image" && previewUrl && (
        <div className="mb-4">
          <img src={previewUrl || "/placeholder.svg"} alt="Preview" className={previewClassName} />
        </div>
      )}

      <div className="grid gap-2">
        <Label htmlFor="file-upload">Select File</Label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadIcon className="w-8 h-8 mb-2 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                {fileTypesDisplay} (MAX. {maxSizeMB}MB)
              </p>
              {uploadedFile && <p className="mt-2 text-sm font-medium text-green-600">Selected: {uploadedFile.name}</p>}
            </div>
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              accept={acceptedFileTypes}
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      <Button
        onClick={handleUpload}
        disabled={!uploadedFile || isUploading}
        className="w-full bg-gradient-to-r from-podmanage-orange to-podmanage-orange-dark hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          buttonText
        )}
      </Button>
    </div>
  )
}

