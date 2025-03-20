import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const provider = searchParams.get("provider")

  // For demo purposes, we'll just redirect to the dashboard
  // In a real app, you would handle the OAuth callback here

  // Set a cookie to simulate authentication
  const response = NextResponse.redirect(new URL("/dashboard", request.url))
  response.cookies.set("auth_token", `demo-${provider}-token-${Date.now()}`, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })

  return response
}

