import { NextRequest } from 'next/server';
import makeQueryString from '@/lib/query-string';
import { handleRequest } from '@/app/(action)/axios';

export async function GET(req: NextRequest, { params }: { params: { activityId: string } }) {
  const activityId = params.activityId;
  const queryParams = Object.fromEntries(req.nextUrl.searchParams);
  const queryString = makeQueryString(queryParams);
  return handleRequest(`my-activities/${activityId}/reserved-schedule${queryString}`, 'get');
}
