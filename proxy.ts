import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Routes that are accessible without a session.
 * Next.js route groups like (auth) don't appear in the URL, so list the
 * actual path segments here.
 */
const PUBLIC_PATHS = ['/login', '/signup', '/forgot-password'];

/**
 * The cookie name set by loginAction in src/serverAction/authAction.ts.
 */
const SESSION_COOKIE = 'session_token';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicPath = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

  // Authenticated user tries to visit a public auth page → send to dashboard
  if (isPublicPath && hasSession) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Unauthenticated user tries to visit a protected page → send to login
  if (!isPublicPath && !hasSession && pathname !== '/') {
    const loginUrl = new URL('/login', request.url);
    // Preserve the intended destination so we can redirect back after login
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  /*
   * Match every route except:
   *  - Next.js internals (_next/static, _next/image)
   *  - The favicon
   *  - Public static files (images, svgs, etc.)
   *  - Next.js API routes if you add any (/api/*)
   */
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)',
  ],
};
