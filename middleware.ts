import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = request.nextUrl.pathname

  // Public paths that don't require authentication
  const isPublicPath = path === "/" || path === "/blog"

  // Check if the user is authenticated
  const isAuthenticated = request.cookies.has("auth-token")

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Redirect unauthenticated users to login page from protected pages
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

// Add your protected routes
export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*"],
}

