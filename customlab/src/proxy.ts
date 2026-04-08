import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const authStorage = request.cookies.get('auth-storage')?.value
  let token = null

  if (authStorage) {
    try {
      const parsed = JSON.parse(decodeURIComponent(authStorage))
      token = parsed?.state?.accessToken
    } catch {
      token = null
    }
  }

  const isPlatformRoute = request.nextUrl.pathname.startsWith('/platform')
  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth')

  if (isPlatformRoute && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/platform', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/platform/:path*', '/auth/:path*'],
}
