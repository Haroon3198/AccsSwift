import type { UserProfile } from "@/types/profile"

const STORAGE_KEY = "user_profile"

export const saveProfile = (profile: UserProfile) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
}

export const loadProfile = (): UserProfile | null => {
  const storedProfile = localStorage.getItem(STORAGE_KEY)
  return storedProfile ? JSON.parse(storedProfile) : null
}

export const getStoredAvatar = (): string | null => {
  const profile = loadProfile()
  return profile?.avatar || null
}

