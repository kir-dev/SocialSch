import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { JWT_COOKIE_NAME } from '../constanst';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest): Promise<Response> {
  const cookieStore = await cookies();
  cookieStore.delete(JWT_COOKIE_NAME);

  return NextResponse.redirect(new URL('/', request.url));
}
