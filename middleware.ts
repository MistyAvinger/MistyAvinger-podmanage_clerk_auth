// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

export function middleware(req: NextRequest) {
  const { userId } = getAuth(req);
  const path = req.nextUrl.pathname;
  
  // Public routes accessible to all users
  const publicRoutes = [
    "/",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/pricing",
    "/how-it-works",
    "/podcasts",
    "/terms",
    "/privacy",
  ];
  
  // Check if the path is public
  const isPublicRoute = publicRoutes.some(route => 
    path === route || path.startsWith(`${route}/`)
  );
  
  // If user is logged in and trying to access login/signup, redirect to dashboard
  if (userId && (path === '/login' || path === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  
  // If path is not public and user is not logged in, redirect to login
  if (!isPublicRoute && !userId) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};