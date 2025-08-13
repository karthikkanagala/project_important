import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ["/auth/login", "/auth/signup", "/unauthorized"]

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))

  // If no session and trying to access protected route
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // If has session and trying to access auth pages, redirect to dashboard
  if (session && (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup"))) {
    try {
      const sessionData = JSON.parse(session.value)
      const dashboardUrl = sessionData.role === "doctor" ? "/doctor/dashboard" : "/parent/dashboard"
      return NextResponse.redirect(new URL(dashboardUrl, request.url))
    } catch {
      // Invalid session, allow access to auth pages
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
