"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import type { UserProfile } from "@/types/profile"

interface ProfileEditProps {
  profile: UserProfile
  onUpdate: (profile: Partial<UserProfile>) => void
}

export function ProfileEdit({ profile, onUpdate }: ProfileEditProps) {
  const [avatar, setAvatar] = useState<string>(profile.avatar || "")
  const [username, setUsername] = useState(profile.username)
  const [bio, setBio] = useState(profile.bio)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate({
      avatar,
      username,
      bio,
    })
    toast.success("Profile updated successfully")
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="p-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="avatar">Profile Picture URL</Label>
              <Input
                id="avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="Enter image URL"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself"
                className="h-32"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4 p-6">
          <Button type="submit">Save Changes</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

