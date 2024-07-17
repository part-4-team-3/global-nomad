import { NextRequest } from 'next/server';
import makeQueryString from '@/lib/query-string';
import { handleRequest } from '@/app/(action)/axios';

export async function GET(req: NextRequest) {
  const queryParams = Object.fromEntries(req.nextUrl.searchParams);
  const queryString = makeQueryString(queryParams);

  return handleRequest(`activities${queryString}`, 'get');
}
