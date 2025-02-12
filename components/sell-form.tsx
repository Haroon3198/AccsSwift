"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export function SellForm() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    // In a real application, you would send this data to your backend
    const formData = new FormData(event.currentTarget)
    const accountData = {
      platform: formData.get("platform"),
      followers: formData.get("followers"),
      price: formData.get("price"),
      description: formData.get("description"),
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Account data:", accountData)
    setIsLoading(false)
    toast.success("Account submitted for review!")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="platform">Platform</Label>
        <Select name="platform" required>
          <SelectTrigger>
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="tiktok">TikTok</SelectItem>
            <SelectItem value="youtube">YouTube</SelectItem>
            <SelectItem value="twitter">Twitter</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="followers">Number of Followers</Label>
        <Input type="number" id="followers" name="followers" required />
      </div>
      <div>
        <Label htmlFor="price">Asking Price ($)</Label>
        <Input type="number" id="price" name="price" required />
      </div>
      <div>
        <Label htmlFor="description">Account Description</Label>
        <Textarea id="description" name="description" required />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit Account for Review"}
      </Button>
    </form>
  )
}

