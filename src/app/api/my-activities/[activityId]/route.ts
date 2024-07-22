import { NextRequest } from 'next/server';
import makeQueryString from '@/lib/query-string';
import { handleRequest } from '@/app/(action)/axios';

export async function GET(req: NextRequest, { params }: { params: { activityId: string } }) {
  const activityId = params.activityId;
  const queryParams = Object.fromEntries(req.nextUrl.searchParams);
  const queryString = makeQueryString(queryParams);

  return handleRequest(`my-activities/${activityId}/reservation-dashboard${queryString}`, 'get');
}

export async function PATCH(req: NextRequest, { params }: { params: { activityId: string } }) {
  const activityId = params.activityId;
  const body = await req.json();
  return handleRequest(`my-activities/${activityId}`, 'patch', body);
}

export async function DELETE(req: NextRequest, { params }: { params: { activityId: string } }) {
  const activityId = params.activityId;

  return handleRequest(`my-activities/${activityId}`, 'delete');
}
