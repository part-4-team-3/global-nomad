import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const userId = cookies().get('userId');
  if (!userId?.value) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  // Fetch the request to check for 401 status
  const response = await fetch(req.url, {
    headers: req.headers,
    method: req.method,
    body: req.body,
  });

  if (response.status === 401) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/activity/:path*', '/reservation', '/calendar'],
};
