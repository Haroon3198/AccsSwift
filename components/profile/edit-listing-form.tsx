"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, X } from "lucide-react"
import { toast } from "sonner"
import type { Listing } from "@/types/listing"

interface EditListingFormProps {
  listing: Partial<Listing>
  onSave: (updatedListing: Listing) => void
  onCancel: () => void
}

export function EditListingForm({ listing, onSave, onCancel }: EditListingFormProps) {
  const [formData, setFormData] = useState({
    title: listing.title || "",
    description: listing.description || "",
    price: listing.price?.toString() || "",
    category: listing.category || "",
    views: listing.views?.toString() || "0",
    likes: listing.likes?.toString() || "0",
    image: listing.image || "",
    monthlyIncome: listing.monthlyIncome?.toString() || "0",
    monthlyExpense: listing.monthlyExpense?.toString() || "0",
    allowComments: listing.allowComments ?? true,
    displayLink: listing.displayLink ?? true,
    removeContacts: listing.removeContacts ?? false,
    promotion: listing.promotion || "",
    support: listing.support || "",
    incomeDetails: listing.incomeDetails || "",
    screenshots: [] as string[],
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const updatedListing: Listing = {
        ...listing,
        ...formData,
        price: Number(formData.price),
        views: Number(formData.views),
        likes: Number(formData.likes),
        monthlyIncome: Number(formData.monthlyIncome),
        monthlyExpense: Number(formData.monthlyExpense),
      } as Listing

      await onSave(updatedListing)
    } catch (error) {
      toast.error("Failed to update listing")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newScreenshots = Array.from(files).map((file) => URL.createObjectURL(file))
      setFormData((prev) => ({
        ...prev,
        screenshots: [...prev.screenshots, ...newScreenshots],
      }))
    }
  }

  const removeScreenshot = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index),
    }))
  }

  return (
    <ScrollArea className="h-[80vh] px-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="YouTube">YouTube</SelectItem>
                <SelectItem value="TikTok">TikTok</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="Twitter">Twitter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="views">Views</Label>
              <Input
                id="views"
                type="number"
                value={formData.views}
                onChange={(e) => setFormData((prev) => ({ ...prev, views: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="likes">Likes</Label>
              <Input
                id="likes"
                type="number"
                value={formData.likes}
                onChange={(e) => setFormData((prev) => ({ ...prev, likes: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="promotion">How did you promote your account?</Label>
            <Textarea
              id="promotion"
              value={formData.promotion}
              onChange={(e) => setFormData((prev) => ({ ...prev, promotion: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="support">What is needed to support your account?</Label>
            <Textarea
              id="support"
              value={formData.support}
              onChange={(e) => setFormData((prev) => ({ ...prev, support: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="incomeDetails">Income Sources</Label>
            <Textarea
              id="incomeDetails"
              value={formData.incomeDetails}
              onChange={(e) => setFormData((prev) => ({ ...prev, incomeDetails: e.target.value }))}
            />
          </div>

          <div className="rounded-lg border-2 border-dashed border-slate-800 p-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Drag & drop screenshots here or click to upload</p>
              <input
                type="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                id="screenshots"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("screenshots")?.click()}
              >
                Choose Files
              </Button>
            </div>
            {formData.screenshots.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-4">
                {formData.screenshots.map((screenshot, index) => (
                  <div key={index} className="relative">
                    <img
                      src={screenshot || "/placeholder.svg"}
                      alt={`Screenshot ${index + 1}`}
                      className="aspect-square rounded-lg object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -right-2 -top-2"
                      onClick={() => removeScreenshot(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between rounded-lg bg-slate-800 p-4">
            <div className="space-y-0.5">
              <Label htmlFor="removeContacts">Remove Contacts</Label>
              <p className="text-sm text-muted-foreground">
                Receive 50% more rating by removing contacts and disabling DMs
              </p>
            </div>
            <Switch
              id="removeContacts"
              checked={formData.removeContacts}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, removeContacts: checked }))}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="displayLink"
                checked={formData.displayLink}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, displayLink: checked }))}
              />
              <Label htmlFor="displayLink">Display link</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="allowComments"
                checked={formData.allowComments}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, allowComments: checked }))}
              />
              <Label htmlFor="allowComments">Allow comments</Label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </ScrollArea>
  )
}

