"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { login } from "@/app/actions/auth"
import { useAuth } from "@/contexts/auth-context"

export function LoginForm({ onSuccess }: { onSuccess: () => void }) {
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
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    try {
      console.log("Submitting login form:", credentials.email)
      const result = await login(credentials)
      if (result.success) {
        console.log("Login successful")
        setUser(result.user)
        onSuccess()
        router.refresh()
      } else {
        console.log("Login failed:", result.error)
        setError(result.error || "An error occurred during login")
      }
    } catch (error) {
      console.error("Unexpected error during login:", error)
      setError("An unexpected error occurred. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          placeholder="Enter your password"
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
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  )
}

