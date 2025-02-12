"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileStats } from "@/components/profile/profile-stats"
import { ReviewsList } from "@/components/profile/reviews-list"
import { ListingsList } from "@/components/profile/listings-list"
import { ProfileSettings } from "@/components/profile/profile-settings"
import { saveProfile, loadProfile } from "@/utils/storage"
import type { UserProfile } from "@/types/profile"

const defaultProfile: UserProfile = {
  id: "1",
  username: "",
  avatar: "",
  bio: "",
  rating: 0,
  registrationDate: new Date().toISOString(),
  totalSales: 0,
  badges: [],
  reviews: [],
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile)

  useEffect(() => {
    const storedProfile = loadProfile()
    if (storedProfile) {
      setProfile(storedProfile)
    }
  }, [])

  const handleProfileUpdate = (updatedProfile: Partial<UserProfile>) => {
    const newProfile = { ...profile, ...updatedProfile }
    setProfile(newProfile)
    saveProfile(newProfile)
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-4">
            <ProfileHeader profile={profile} onUpdate={handleProfileUpdate} />
            <ProfileSettings profile={profile} onUpdate={handleProfileUpdate} />
            <ProfileStats profile={profile} />
          </div>
          <div className="space-y-6 lg:col-span-8">
            <Card className="border-0 bg-slate-900">
              <ListingsList userId={profile.id} />
            </Card>
            <Card className="border-0 bg-slate-900">
              <ReviewsList reviews={profile.reviews} totalSales={profile.totalSales} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

