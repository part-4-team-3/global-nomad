import { handleRequest } from '@/app/(action)/axios';
import { ipCheck } from '@/app/action/ip-check';
import makeQueryString from '@/lib/query-string';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const queryParams = Object.fromEntries(req.nextUrl.searchParams);
  const queryString = makeQueryString(queryParams);

  return handleRequest(`my-activities${queryString}`, 'get');
}
