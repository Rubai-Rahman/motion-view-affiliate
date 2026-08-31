import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/signup',
  '/forgot-password',
  '/onboard',
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const sessionToken = request.cookies.get('session_token')?.value;

  // User is not authenticated and trying to access a private route
  if (!sessionToken && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url);

    // Optional: remember where the user wanted to go
    loginUrl.searchParams.set('callbackUrl', pathname);

    return NextResponse.redirect(loginUrl);
  }

  // User is authenticated and trying to access a public auth page
  if (sessionToken && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - _next/static
     * - _next/image
     * - favicon.ico
     * - public image/file assets
     */
    '/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2)$).*)',
  ],
};
