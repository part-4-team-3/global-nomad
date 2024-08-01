import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const userId = cookies().get('userId');
  const pathname = req.nextUrl.pathname;
  const myIp = req.headers.get('x-forwarded-for');
  req.headers.set('x-pathname', pathname);
  req.headers.set('ip', myIp || '');

  if (!userId?.value) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next({
    request: {
      headers: req.headers,
    },
  });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/reservation', '/calendar'],
};
