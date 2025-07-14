import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { JWT_COOKIE_NAME } from './app/auth/constanst';

export function middleware(request: NextRequest): NextResponse {
  const jwt = request.cookies.get(JWT_COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  // Publikus útvonalak bejelentkezés nélkül is elérhetők
  const publicPaths = ['/login', '/auth/callback'];
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // Ha nincs token és nem publikus útvonalon vagyunk, átirányítunk a bejelentkezési oldalra
  if (!jwt && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
