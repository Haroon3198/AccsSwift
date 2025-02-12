"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, ThumbsUp, Pencil, Trash2, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { EditListingForm } from "./edit-listing-form"
import { getListings, deleteListing, updateListing, getListingsByUserId } from "@/app/actions/listings"
import { toast } from "sonner"
import type { Listing } from "@/types/listing"

interface ListingsListProps {
  userId?: string
  category?: string
}

export function ListingsList({ userId, category = "all" }: ListingsListProps) {
  const [listings, setListings] = useState<Listing[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [editingListing, setEditingListing] = useState<Listing | null>(null) // Added state for editingListing
  const router = useRouter()

  useEffect(() => {
    console.log("Fetching listings for userId:", userId)
    fetchListings()
  }, [userId])

  const fetchListings = async () => {
    try {
      setIsLoading(true)
      const { listings: fetchedListings } = userId ? await getListingsByUserId(userId) : await getListings()
      console.log("Fetched listings:", fetchedListings)
      setListings(fetchedListings || []) // Ensure we always have an array
    } catch (error) {
      console.error("Error fetching listings:", error)
      toast.error("Failed to load listings")
      setListings([]) // Set empty array on error
    } finally {
      setIsLoading(false)
    }
  }

  // Safely filter listings with null checks
  const filteredListings =
    listings?.filter(
      (listing) =>
        !category || category === "all" || (listing?.category || "").toLowerCase() === (category || "").toLowerCase(),
    ) || []

  console.log("Current category:", category)
  console.log("Filtered listings:", filteredListings)

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id)
      await deleteListing(id)
      setListings((prevListings) => prevListings.filter((listing) => listing.id !== id))
      toast.success("Listing deleted successfully")
    } catch (error) {
      console.error("Error deleting listing:", error)
      toast.error("Failed to delete listing")
    } finally {
      setIsDeleting(null)
    }
  }

  const handleEdit = (listing: Listing) => {
    setEditingListing(listing)
  }

  const handleSave = async (updatedListing: Listing) => {
    try {
      const { listing } = await updateListing(updatedListing.id, updatedListing)
      setListings((prevListings) => prevListings.map((l) => (l.id === listing.id ? listing : l)))
      setEditingListing(null)
      toast.success("Listing updated successfully")
    } catch (error) {
      console.error("Error updating listing:", error)
      toast.error("Failed to update listing")
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Listings</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {filteredListings.length === 0 ? (
          <div className="text-center">
            <p className="text-muted-foreground mb-4">No listings found.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="cursor-pointer" onClick={() => router.push(`/listing/${listing.id}`)}>
                <CardContent className="p-4">
                  <ImageCarousel images={listing.images || []} />
                  <h3 className="mt-2 font-semibold">{listing.title}</h3>
                  <p className="text-sm text-muted-foreground">{listing.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-green-600">${listing.price}</span>
                    <span className="text-sm font-medium text-muted-foreground">{listing.category}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <span>{listing.views?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{listing.likes?.toLocaleString() || 0}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEdit(listing)
                      }}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(listing.id)
                      }}
                      disabled={isDeleting === listing.id}
                    >
                      {isDeleting === listing.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>

      <Dialog open={!!editingListing} onOpenChange={() => setEditingListing(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{editingListing?.id ? "Edit Listing" : "Create New Listing"}</DialogTitle>
          </DialogHeader>
          <EditListingForm
            listing={editingListing || ({} as Listing)}
            onSave={editingListing?.id ? handleSave : handleSave}
            onCancel={() => setEditingListing(null)}
          />
        </DialogContent>
      </Dialog>
    </Card>
  )
}

function ImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="relative">
      <img
        src={images[currentIndex] || "/placeholder.svg"}
        alt={`Listing image ${currentIndex + 1}`}
        className="aspect-video w-full rounded-lg object-cover"
      />
      {images.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full"
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  )
}

