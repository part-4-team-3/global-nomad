import makeQueryString from '@/lib/query-string';
import { handleRequest } from '@/app/(action)/axios';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const path = '/my-reservations';
  const queryParams = Object.fromEntries(req.nextUrl.searchParams);
  const queryString = makeQueryString(queryParams);
  const url = `${path}${queryString}`;

  return handleRequest(url, 'get');
}
