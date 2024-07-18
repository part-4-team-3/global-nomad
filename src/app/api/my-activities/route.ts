import { handleRequest } from '@/app/(action)/axios';
import makeQueryString from '@/lib/query-string';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const queryParams = Object.fromEntries(req.nextUrl.searchParams);
  const queryString = makeQueryString(queryParams);

  return handleRequest(`my-activities${queryString}`, 'get');
}
