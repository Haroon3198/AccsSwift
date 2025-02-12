"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProfileImageUpload } from "./profile-image-upload"
import type { UserProfile } from "@/types/profile"
import { useAuth } from "@/contexts/auth-context"

interface ProfileHeaderProps {
  profile: UserProfile
  onUpdate: (updatedProfile: Partial<UserProfile>) => void
}

export function ProfileHeader({ profile, onUpdate }: ProfileHeaderProps) {
  const { setUser } = useAuth()
  const handleAvatarUpdate = (newAvatar: string) => {
    onUpdate({ avatar: newAvatar })
    setUser((prev) => (prev ? { ...prev, avatar: newAvatar } : null))
  }

  return (
    <Card className="overflow-hidden border-0 bg-slate-900">
      <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600" />
      <CardContent className="relative pt-4">
        <div className="absolute -top-12 left-4">
          <ProfileImageUpload onUpdate={handleAvatarUpdate} currentAvatar={profile.avatar} />
        </div>
        <div className="ml-32">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{profile.username}</h1>
            {profile.badges &&
              profile.badges.length > 0 &&
              profile.badges.map((badge) => (
                <Badge
                  key={badge}
                  variant={badge === "PRO" ? "default" : "secondary"}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500"
                >
                  {badge}
                </Badge>
              ))}
          </div>
          {profile.bio && <p className="mt-2 text-sm text-muted-foreground">{profile.bio}</p>}
        </div>
      </CardContent>
    </Card>
  )
}

