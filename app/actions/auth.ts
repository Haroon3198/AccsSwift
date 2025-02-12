"use server"

import { redirect } from "next/navigation"
import type { SignUpCredentials, LoginCredentials, User } from "@/types/auth"

export async function login(credentials: LoginCredentials): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    console.log("Login attempt:", credentials.email)
    // In a real app, validate credentials against your database
    // This is a mock implementation
    if (credentials.email === "demo@example.com" && credentials.password === "password") {
      console.log("Login successful")
      return {
        success: true,
        user: {
          id: "1",
          email: credentials.email,
          name: "Demo User",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      }
    }

    console.log("Login failed: Invalid credentials")
    return { success: false, error: "Invalid credentials" }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "An error occurred during login" }
  }
}

export async function signup(
  credentials: SignUpCredentials,
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    console.log("Signup attempt:", credentials.email)

    // Validate required fields
    if (!credentials.email || !credentials.password || !credentials.name) {
      return { success: false, error: "All fields are required" }
    }

    // Validate passwords match
    if (credentials.password !== credentials.confirmPassword) {
      console.log("Signup failed: Passwords do not match")
      return { success: false, error: "Passwords do not match" }
    }

    // In a real app, check if user already exists
    if (credentials.email === "demo@example.com") {
      console.log("Signup failed: Email already in use")
      return { success: false, error: "Email already in use" }
    }

    // In a real app, create user in database
    // This is a mock implementation
    console.log("Creating new user:", credentials.email)

    const newUser: User = {
      id: Math.random().toString(36).slice(2),
      email: credentials.email,
      name: credentials.name,
      createdAt: new Date(),
      avatar: "/placeholder.svg?height=32&width=32",
    }

    // Save user to localStorage to persist the session
    localStorage.setItem("user", JSON.stringify(newUser))

    console.log("Signup successful:", credentials.email)
    return {
      success: true,
      user: newUser,
    }
  } catch (error) {
    console.error("Signup error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred during signup",
    }
  }
}

export async function logout() {
  // No need to clear server-side data as we're using local storage
  redirect("/")
}

