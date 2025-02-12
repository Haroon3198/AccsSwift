"use client"

import { useState, useRef } from "react"
import { Copy, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import { createListing } from "@/app/actions/listings"
import type { Listing } from "@/types/listing"

const categoryFields = {
  youtube: ["Subscribers", "Views", "Videos"],
  tiktok: ["Followers", "Likes", "Videos"],
  instagram: ["Followers", "Posts", "Engagement Rate"],
  facebook: ["Likes", "Followers", "Posts"],
  twitter: ["Followers", "Tweets", "Retweets"],
  telegram: ["Members", "Posts", "Views"],
}

export function SellDialogForm({ onSuccess }: { onSuccess: (listing: Listing) => void }) {
  const [isLoading, setIsLoading] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof categoryFields | "">("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const verificationCode = "4cd4e1bffcd00b61ad30a"

  const copyVerificationCode = () => {
    navigator.clipboard.writeText(verificationCode)
    toast.success("Verification code copied to clipboard")
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const newListing = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      category: formData.get("category") as string,
      monthlyIncome: Number(formData.get("monthlyIncome")),
      monthlyExpense: Number(formData.get("monthlyExpense")),
      promotion: formData.get("promotion") as string,
      support: formData.get("support") as string,
      incomeDetails: formData.get("incomeDetails") as string,
      displayLink: formData.get("displayLink") === "on",
      allowComments: formData.get("allowComments") === "on",
      removeContacts: agreeToTerms,
      images: uploadedImages,
      userId: "1", // Ensure this matches the profile.id
      categorySpecificFields: selectedCategory
        ? Object.fromEntries(
            categoryFields[selectedCategory].map((field) => [
              field,
              formData.get(field.toLowerCase().replace(" ", "_")),
            ]),
          )
        : {},
    }

    try {
      const { listing } = await createListing(newListing)
      onSuccess(listing)
      toast.success("Listing created successfully!")
    } catch (error) {
      console.error("Error creating listing:", error)
      toast.error("Failed to create listing")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ScrollArea className="h-[80vh] px-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="Enter title" required className="bg-slate-800" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">Account URL</Label>
            <Input
              id="url"
              name="url"
              placeholder="Paste link to the account/channel/group/page for sale"
              required
              className="bg-slate-800"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              name="category"
              required
              onValueChange={(value) => setSelectedCategory(value as keyof typeof categoryFields)}
            >
              <SelectTrigger className="bg-slate-800">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(categoryFields).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCategory && (
            <div className="space-y-4">
              {categoryFields[selectedCategory].map((field) => (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field.toLowerCase().replace(" ", "_")}>{field}</Label>
                  <Input
                    id={field.toLowerCase().replace(" ", "_")}
                    name={field.toLowerCase().replace(" ", "_")}
                    placeholder={`Enter ${field.toLowerCase()}`}
                    required
                    className="bg-slate-800"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input id="price" name="price" type="number" placeholder="Enter price" required className="bg-slate-800" />
          </div>
        </div>

        {/* Optional Fields */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Optional Details</h3>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your account (no contact information)"
              className="min-h-[100px] bg-slate-800"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="monthlyIncome">Monthly Income ($)</Label>
              <Input id="monthlyIncome" name="monthlyIncome" type="number" placeholder="0" className="bg-slate-800" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyExpense">Monthly Expenses ($)</Label>
              <Input id="monthlyExpense" name="monthlyExpense" type="number" placeholder="0" className="bg-slate-800" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="incomeDetails">Income Sources</Label>
            <Textarea
              id="incomeDetails"
              name="incomeDetails"
              placeholder="Provide details about income sources"
              className="bg-slate-800"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="promotion">Account Promotion</Label>
            <Textarea
              id="promotion"
              name="promotion"
              placeholder="Tell us how you promoted your account"
              className="bg-slate-800"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="support">Support</Label>
            <Textarea id="support" name="support" placeholder="Support details" className="bg-slate-800" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="displayLink">Display Link</Label>
            <Switch id="displayLink" name="displayLink" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="allowComments">Allow Comments</Label>
            <Switch id="allowComments" name="allowComments" />
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
            <input
              type="file"
              className="hidden"
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => {
                const files = e.target.files
                if (files) {
                  const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
                  setUploadedImages((prev) => [...prev, ...newImages])
                  toast.success(`${files.length} image(s) uploaded successfully`)
                }
              }}
            />
            <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              Choose Files
            </Button>
          </div>
          {uploadedImages.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {uploadedImages.map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`Uploaded image ${index + 1}`}
                  className="rounded-md object-cover w-full h-24"
                />
              ))}
            </div>
          )}
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
    </ScrollArea>
  )
}

