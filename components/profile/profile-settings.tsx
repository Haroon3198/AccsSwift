"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import type { UserProfile } from "@/types/profile"
import { useAuth } from "@/contexts/auth-context"

interface ProfileSettingsProps {
  profile: UserProfile
  onUpdate: (profile: Partial<UserProfile>) => void
}

export function ProfileSettings({ profile, onUpdate }: ProfileSettingsProps) {
  const { setUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: profile.username,
    bio: profile.bio,
  })

  useEffect(() => {
    setFormData({
      username: profile.username,
      bio: profile.bio,
    })
  }, [profile])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(formData)
    setUser((prev) => (prev ? { ...prev, ...formData } : null))
    setIsEditing(false)
    toast.success("Profile updated successfully")
  }

  return (
    <Card className="border-0 bg-slate-900">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Profile Settings</CardTitle>
        {!isEditing && (
          <Button variant="ghost" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                className="bg-slate-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                className="h-32 bg-slate-800"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-muted-foreground">Username</Label>
              <p className="mt-1">{profile.username}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Bio</Label>
              <p className="mt-1 whitespace-pre-wrap">{profile.bio}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

