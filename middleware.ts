// // import { NextResponse } from 'next/server'
// // import type { NextRequest } from 'next/server'

// // export function middleware(request: NextRequest) {
// //   const { pathname } = request.nextUrl
  
// //   // Get token from cookies (more reliable than localStorage for SSR)
// //   const token = request.cookies.get('authToken')?.value
  
// //   // Public routes that don't require authentication
// //   const publicRoutes = ['/login', '/signup', '/forgot-password']
// //   const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
  
// //   // Protected routes that require authentication
// //   const protectedRoutes = ['/dashboard', '/profile', '/settings']
// //   const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
// //   // If user is on root path
// //   if (pathname === '/') {
// //     if (token) {
// //       return NextResponse.redirect(new URL('/dashboard', request.url))
// //     } else {
// //       return NextResponse.redirect(new URL('/login', request.url))
// //     }
// //   }
  
// //   // If user is trying to access protected route without token
// //   if (isProtectedRoute && !token) {
// //     const loginUrl = new URL('/login', request.url)
// //     loginUrl.searchParams.set('redirect', pathname)
// //     return NextResponse.redirect(loginUrl)
// //   }
  
// //   // If user is logged in and trying to access login/signup
// //   if (isPublicRoute && token && pathname !== '/login') {
// //     return NextResponse.redirect(new URL('/dashboard', request.url))
// //   }
  
// //   return NextResponse.next()
// // }

// // export const config = {
// //   matcher: [
// //     /*
// //      * Match all request paths except for the ones starting with:
// //      * - api (API routes)
// //      * - _next/static (static files)
// //      * - _next/image (image optimization files)
// //      * - favicon.ico (favicon file)
// //      * - public folder
// //      */
// //     '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
// //   ],
// // }

// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// // Next.js 15+ uses 'proxy' instead of 'middleware'
// export async function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl
  
//   // Get token from cookies (more reliable than localStorage for SSR)
//   const token = request.cookies.get('authToken')?.value
  
//   // Public routes that don't require authentication
//   const publicRoutes = ['/login', '/signup', '/forgot-password', '/register']
//   const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
  
//   // Protected routes that require authentication
//   const protectedRoutes = ['/dashboard', '/profile', '/settings', '/ai-usage']
//   const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
//   // If user is on root path
//   if (pathname === '/') {
//     if (token) {
//       return NextResponse.redirect(new URL('/dashboard', request.url))
//     } else {
//       return NextResponse.redirect(new URL('/login', request.url))
//     }
//   }
  
//   // If user is trying to access protected route without token
//   if (isProtectedRoute && !token) {
//     const loginUrl = new URL('/login', request.url)
//     loginUrl.searchParams.set('redirect', pathname)
//     return NextResponse.redirect(loginUrl)
//   }
  
//   // If user is logged in and trying to access login/signup
//   if (isPublicRoute && token && (pathname === '/login' || pathname === '/register')) {
//     return NextResponse.redirect(new URL('/dashboard', request.url))
//   }
  
//   return NextResponse.next()
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - public folder
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
//   ],
// }

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('authToken')?.value
  
  // Root redirect
  if (pathname === '/') {
    const destination = token ? '/dashboard' : '/login'
    return NextResponse.redirect(new URL(destination, request.url))
  }
  
  // Protected routes
  const protectedRoutes = ['/dashboard', '/profile', '/settings', '/ai-usage']
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))
  
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Public routes (redirect to dashboard if logged in)
  const publicRoutes = ['/login', '/register']
  const isPublic = publicRoutes.some(route => pathname.startsWith(route))
  
  if (isPublic && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}