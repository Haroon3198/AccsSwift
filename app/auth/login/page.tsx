import { AuthDialog } from "@/components/auth/auth-dialog"

export default function LoginPage() {
  return (
    <div className="container flex h-screen items-center justify-center">
      <AuthDialog mode="login" />
    </div>
  )
}

