"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AuthDialog } from "./auth/auth-dialog"
import { ProfileDropdown } from "./profile-dropdown"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"

export function Navbar() {
  const { user, setUser } = useAuth()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)
  const [authDialogMode, setAuthDialogMode] = useState<"login" | "signup">("login")

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration issues by not rendering until mounted
  if (!mounted) {
    return null
  }

  const handleLogout = () => {
    setUser(null)
    router.refresh()
  }

  const openLoginDialog = () => {
    setAuthDialogMode("login")
    setIsAuthDialogOpen(true)
  }

  const openSignupDialog = () => {
    setAuthDialogMode("signup")
    setIsAuthDialogOpen(true)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              SwiftAccs
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="hidden md:flex items-center space-x-4">
            <NavButton href="/blog">Blog</NavButton>
            <NavButton href="/support">Support</NavButton>
          </nav>
          <div className="flex items-center space-x-4">
            {user ? (
              <ProfileDropdown onLogout={handleLogout} avatar={user.avatar} />
            ) : (
              <div className="flex space-x-2">
                <Button onClick={openLoginDialog} variant="ghost">
                  Login
                </Button>
                <Button onClick={openSignupDialog} variant="outline">
                  Sign Up
                </Button>
              </div>
            )}
            <AuthDialog mode={authDialogMode} isOpen={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen} />
          </div>
        </div>
      </div>
    </header>
  )
}

interface NavButtonProps {
  href: string
  children: React.ReactNode
}

function NavButton({ href, children }: NavButtonProps) {
  return (
    <Link href={href} passHref>
      <Button
        variant="ghost"
        className={cn(
          "relative h-8 w-full justify-start rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:bg-accent focus-visible:text-accent-foreground",
          "before:absolute before:inset-x-0 before:bottom-0 before:h-[2px] before:scale-x-0 before:bg-primary before:transition-transform",
          "hover:before:scale-x-100",
        )}
      >
        {children}
      </Button>
    </Link>
  )
}

