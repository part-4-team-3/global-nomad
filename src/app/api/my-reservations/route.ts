import { NextRequest } from 'next/server';
import makeQueryString from '@/lib/query-string';
import { handleError, handleRequest } from '@/app/(action)/axios';

export async function GET(req: NextRequest) {
  try {
    const path = '/my-reservations';
    const queryParams = Object.fromEntries(req.nextUrl.searchParams);
    const queryString = makeQueryString(queryParams);
    const url = `${path}${queryString}`;

    return await handleRequest(url, 'get');
  } catch (err) {
    return await handleError(err);
  }
}
