"use client"

import { useState } from "react"
import { Copy, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "sonner"

export function CreateListingForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const verificationCode = "4cd4e1bffcd00b61ad30a"

  const copyVerificationCode = () => {
    navigator.clipboard.writeText(verificationCode)
    toast.success("Verification code copied to clipboard")
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Form submitted")
    toast.success("Listing submitted for review!")
    setIsLoading(false)
  }

  return (
    <Card className="mx-auto max-w-2xl border-0 bg-slate-900">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create New Listing</CardTitle>
        <CardDescription>Fill out the details below to list your account for sale</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">Account URL</Label>
              <Input
                id="url"
                placeholder="Paste link to the account/channel/group/page for sale"
                required
                className="bg-slate-800"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select required>
                <SelectTrigger className="bg-slate-800">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input id="price" type="number" placeholder="Enter price" required className="bg-slate-800" />
            </div>
          </div>

          {/* Optional Fields */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Optional Details</h3>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your account (no contact information)"
                className="min-h-[100px] bg-slate-800"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="income">Monthly Income ($)</Label>
                <Input id="income" type="number" placeholder="0" className="bg-slate-800" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expenses">Monthly Expenses ($)</Label>
                <Input id="expenses" type="number" placeholder="0" className="bg-slate-800" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="income-details">Income Sources</Label>
              <Textarea
                id="income-details"
                placeholder="Provide details about income sources"
                className="bg-slate-800"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="promotion">Account Promotion</Label>
              <Textarea id="promotion" placeholder="Tell us how you promoted your account" className="bg-slate-800" />
            </div>
          </div>

          {/* Verification Section */}
          <div className="space-y-4 rounded-lg bg-slate-800 p-4">
            <div className="space-y-2">
              <Label>Verification Code</Label>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded bg-slate-900 p-2 font-mono text-yellow-400">{verificationCode}</code>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button type="button" variant="outline" size="icon" onClick={copyVerificationCode}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy verification code</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-sm text-muted-foreground">
                Add this code to your account&apos;s bio or description to verify ownership
              </p>
            </div>
          </div>

          {/* File Upload */}
          <div className="rounded-lg border-2 border-dashed border-slate-800 p-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Drag & drop screenshots here or click to upload</p>
              <input type="file" className="hidden" multiple accept="image/*" />
              <Button type="button" variant="outline" size="sm">
                Choose Files
              </Button>
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="flex items-center justify-between rounded-lg bg-slate-800 p-4">
            <div className="space-y-0.5">
              <Label htmlFor="terms" className="text-base">
                Agree to remove contacts
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive 50% more rating by removing contacts and disabling DMs
              </p>
            </div>
            <Switch id="terms" checked={agreeToTerms} onCheckedChange={setAgreeToTerms} />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-yellow-400 text-black hover:bg-yellow-500" disabled={isLoading}>
            {isLoading ? "Creating Listing..." : "Create Listing"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

