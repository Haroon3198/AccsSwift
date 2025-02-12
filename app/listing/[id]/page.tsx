"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getListingById } from "@/app/actions/listings"
import { toast } from "sonner"
import type { Listing } from "@/types/listing"

export default function ListingDetailPage() {
  const [listing, setListing] = useState<Listing | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const id = params.id as string

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setIsLoading(true)
        const fetchedListing = await getListingById(id)
        setListing(fetchedListing)
      } catch (error) {
        console.error("Error fetching listing:", error)
        toast.error("Failed to load listing")
      } finally {
        setIsLoading(false)
      }
    }

    fetchListing()
  }, [id])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!listing) {
    return <div>Listing not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{listing.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <ImageCarousel images={listing.images} />
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold">Description</h3>
              <p>{listing.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Details</h3>
              <ul className="list-inside list-disc">
                <li>Category: {listing.category}</li>
                <li>Price: ${listing.price}</li>
                <li>Monthly Income: ${listing.monthlyIncome}</li>
                <li>Monthly Expense: ${listing.monthlyExpense}</li>
              </ul>
            </div>
          </div>
          {listing.categorySpecificFields && (
            <div>
              <h3 className="text-lg font-semibold">Category Specific Information</h3>
              <ul className="list-inside list-disc">
                {Object.entries(listing.categorySpecificFields).map(([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold">Promotion</h3>
            <p>{listing.promotion}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Support</h3>
            <p>{listing.support}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Income Details</h3>
            <p>{listing.incomeDetails}</p>
          </div>
          <div className="flex justify-between">
            <Button>Contact Seller</Button>
            <Button variant="outline">Add to Wishlist</Button>
          </div>
        </CardContent>
      </Card>
    </div>
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
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  )
}

