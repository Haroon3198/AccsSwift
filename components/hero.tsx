"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SellDialogForm } from "@/components/sell-dialog-form"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"
import { AuthDialog } from "@/components/auth/auth-dialog"
import type { Listing } from "@/types/listing"

export function Hero() {
  const [sellDialogOpen, setSellDialogOpen] = useState(false)
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  const handleSellClick = () => {
    if (!user) {
      setIsAuthDialogOpen(true)
      toast.error("Please log in to sell an account")
    } else {
      setSellDialogOpen(true)
    }
  }

  const handleListingCreated = (newListing: Listing) => {
    setSellDialogOpen(false)
    router.refresh()
  }

  return (
    <div className="relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden bg-black">
      <div className="container relative z-10 mx-auto px-4">
        <h1 className="text-center text-4xl font-bold leading-tight text-white md:text-6xl">
          Buy Premium{" "}
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Social Media
          </span>
          <br />
          Accounts{" "}
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Instantly
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-gray-400">
          Choose from verified accounts with real followers, perfect for influencers, businesses, and personal brands.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <Dialog open={sellDialogOpen} onOpenChange={setSellDialogOpen}>
            <Button
              variant="outline"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10"
              onClick={handleSellClick}
            >
              Sell Account
            </Button>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Listing</DialogTitle>
              </DialogHeader>
              <SellDialogForm onSuccess={handleListingCreated} />
            </DialogContent>
          </Dialog>
          <Button
            className="bg-yellow-400 text-black hover:bg-yellow-500"
            onClick={() => document.querySelector("#listings")?.scrollIntoView({ behavior: "smooth" })}
          >
            Buy Account
          </Button>
        </div>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 transform">
        <div className="relative h-[400px] w-[400px]">
          <div className="absolute left-0 top-0 animate-float">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-11%20042306-5RM6RRCKzBJLTziz4kxWNfPZMvintU.png"
              alt="Social Media Icon"
              className="h-16 w-16"
            />
          </div>
        </div>
      </div>
      <AuthDialog mode="login" isOpen={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen} />
    </div>
  )
}

