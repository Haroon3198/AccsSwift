"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Youtube, Music, Instagram, Facebook, Twitter, Send } from "lucide-react"

export function PlatformTabs({ onCategoryChange }: { onCategoryChange?: (category: string) => void }) {
  const [activePlatform, setActivePlatform] = useState("YouTube")

  const handlePlatformChange = useCallback(
    (platform: string) => {
      const lowercasePlatform = platform.toLowerCase()
      setActivePlatform(platform)
      if (onCategoryChange) {
        onCategoryChange(lowercasePlatform)
      }
    },
    [onCategoryChange],
  )

  const platforms = [
    { name: "YouTube", icon: Youtube },
    { name: "Tiktok", icon: Music },
    { name: "Instagram", icon: Instagram },
    { name: "Facebook", icon: Facebook },
    { name: "Twitter", icon: Twitter },
    { name: "Telegram", icon: Send },
  ]

  console.log("Active platform:", activePlatform)

  return (
    <div className="flex justify-center space-x-2 rounded-full bg-slate-800/50 p-2">
      {platforms.map((platform) => {
        const Icon = platform.icon
        return (
          <Button
            key={platform.name}
            variant={activePlatform === platform.name ? "secondary" : "ghost"}
            className={`rounded-full ${activePlatform === platform.name ? "bg-blue-600" : ""}`}
            onClick={() => handlePlatformChange(platform.name)}
          >
            <Icon className="mr-2 h-4 w-4" />
            {platform.name}
          </Button>
        )
      })}
    </div>
  )
}

