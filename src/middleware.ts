import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const userId = cookies().get('userId');
  if (!userId?.value) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/activity/:path*', '/reservation'],
};
