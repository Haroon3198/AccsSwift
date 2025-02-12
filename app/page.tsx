"use client"

import { useState } from "react"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { PlatformTabs } from "@/components/platform-tabs"
import { ListingsList } from "@/components/profile/listings-list"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("youtube")

  const handleCategoryChange = (category: string) => {
    console.log("Category changed to:", category)
    setSelectedCategory(category)
  }

  return (
    <>
      <Hero />
      <Features />
      <div className="container mx-auto px-4 py-12">
        <PlatformTabs onCategoryChange={handleCategoryChange} />
        <div className="mt-8">
          <ListingsList category={selectedCategory} />
        </div>
      </div>
    </>
  )
}

