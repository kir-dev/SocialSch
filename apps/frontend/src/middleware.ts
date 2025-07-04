import { NextRequest, NextResponse } from 'next/server';
import { JWT_COOKIE_NAME } from '@/app/auth/constanst';

export async function middleware(request: NextRequest): Promise<Response> {
  const jwt = request.cookies.get(JWT_COOKIE_NAME);

  if (!jwt) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile'],
};
