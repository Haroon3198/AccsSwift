"use client"

import { useState, useRef } from "react"
import { toast } from "sonner"
import { Upload } from "lucide-react"
import type React from "react" // Added import for React

interface ProfileImageUploadProps {
  onUpdate: (avatar: string) => void
  currentAvatar: string
}

export function ProfileImageUpload({ onUpdate, currentAvatar }: ProfileImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB")
        return
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file")
        return
      }

      setIsUploading(true)
      const reader = new FileReader()
      reader.onloadend = () => {
        // In a real app, you would upload to your storage service here
        onUpdate(reader.result as string)
        setIsUploading(false)
        toast.success("Profile picture updated successfully")
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="profile-image-upload"
      />
      <div
        className="group relative h-24 w-24 cursor-pointer overflow-hidden rounded-full border-4 border-slate-900"
        onClick={() => fileInputRef.current?.click()}
      >
        <img
          src={currentAvatar || "/placeholder.svg"}
          alt="Profile"
          className="h-full w-full object-cover transition-opacity group-hover:opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100">
          {isUploading ? (
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
          ) : (
            <Upload className="h-8 w-8 text-white" />
          )}
        </div>
      </div>
    </>
  )
}

