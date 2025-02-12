"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LoginForm } from "./login-form"
import { SignUpForm } from "./signup-form"
import { Alert, AlertDescription } from "@/components/ui/alert"

export const openAuthDialog = (setIsOpen: (isOpen: boolean) => void) => {
  setIsOpen(true)
}

interface AuthDialogProps {
  mode?: "login" | "signup"
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export function AuthDialog({ mode = "login", isOpen, onOpenChange }: AuthDialogProps) {
  const [currentMode, setCurrentMode] = useState(mode)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open)
  }

  const handleSuccess = () => {
    setShowSuccess(true)
    setTimeout(() => {
      onOpenChange(false)
      setShowSuccess(false)
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{currentMode === "login" ? "Login to your account" : "Create an account"}</DialogTitle>
        </DialogHeader>
        {showSuccess ? (
          <Alert>
            <AlertDescription>
              {currentMode === "login" ? "Successfully logged in!" : "Account created successfully!"}
            </AlertDescription>
          </Alert>
        ) : currentMode === "login" ? (
          <LoginForm onSuccess={handleSuccess} />
        ) : (
          <SignUpForm onSuccess={handleSuccess} />
        )}
        <div className="mt-4 text-center text-sm">
          {currentMode === "login" ? (
            <p>
              Don&apos;t have an account?{" "}
              <Button variant="link" className="p-0" onClick={() => setCurrentMode("signup")}>
                Sign up
              </Button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Button variant="link" className="p-0" onClick={() => setCurrentMode("login")}>
                Login
              </Button>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

