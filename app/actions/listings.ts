"use server"

import { revalidatePath } from "next/cache"
import type { Listing, CreateListingInput, UpdateListingInput } from "@/types/listing"

// In a real app, this would be your database
let listings: Listing[] = []

export async function getListings(): Promise<{ listings: Listing[] }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return { listings }
}

export async function getListingById(id: string): Promise<Listing | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const listing = listings.find((listing) => listing.id === id)
  return listing || null
}

export async function getListingsByUserId(userId: string): Promise<{ listings: Listing[] }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Ensure we're comparing the correct userId
  const userListings = listings.filter((listing) => listing.userId === userId)
  console.log(`Found ${userListings.length} listings for user ${userId}`)
  return { listings: userListings }
}

export async function createListing(input: CreateListingInput): Promise<{ listing: Listing }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const listing: Listing = {
    ...input,
    id: Math.random().toString(36).slice(2),
    userId: "1", // In a real app, this would come from the authenticated user
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    views: 0,
    likes: 0,
  }

  listings.push(listing)
  revalidatePath("/")
  revalidatePath("/profile")

  return { listing }
}

export async function updateListing(id: string, input: UpdateListingInput): Promise<{ listing: Listing }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const index = listings.findIndex((listing) => listing.id === id)
  if (index === -1) throw new Error("Listing not found")

  const listing = {
    ...listings[index],
    ...input,
    updatedAt: new Date().toISOString(),
  }

  listings[index] = listing
  revalidatePath("/")
  revalidatePath("/profile")

  return { listing }
}

export async function deleteListing(id: string): Promise<void> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  listings = listings.filter((listing) => listing.id !== id)
  revalidatePath("/")
  revalidatePath("/profile")
}

