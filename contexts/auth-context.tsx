"use client"

import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "@/types/auth"
import type React from "react" // Added import for React

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const setUserAndStorage = (newUser: User | null) => {
    setUser(newUser)
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser))
      // Also update profile storage to keep in sync
      localStorage.setItem(
        "user_profile",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("user_profile") || "{}"),
          username: newUser.name,
          avatar: newUser.avatar,
        }),
      )
    } else {
      localStorage.removeItem("user")
    }
  }

  return <AuthContext.Provider value={{ user, setUser: setUserAndStorage, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

