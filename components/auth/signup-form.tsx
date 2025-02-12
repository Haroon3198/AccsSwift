"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { signup } from "@/app/actions/auth"
import { useAuth } from "@/contexts/auth-context"

export function SignUpForm({ onSuccess }: { onSuccess: () => void }) {
  const router = useRouter()
  const { setUser } = useAuth()
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const credentials = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    }

    try {
      // Validate required fields
      if (!credentials.name || !credentials.email || !credentials.password || !credentials.confirmPassword) {
        setError("All fields are required")
        return
      }

      console.log("Submitting signup form:", credentials.email)
      const result = await signup(credentials)

      if (result.success && result.user) {
        console.log("Signup successful")
        setUser(result.user)
        onSuccess()
        router.refresh()
      } else {
        console.log("Signup failed:", result.error)
        setError(result.error || "An error occurred during signup")
      }
    } catch (error) {
      console.error("Unexpected error during signup:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" type="text" placeholder="Enter your name" required disabled={isLoading} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="Enter your email" required disabled={isLoading} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Create a password"
          required
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          required
          disabled={isLoading}
        />
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  )
}

