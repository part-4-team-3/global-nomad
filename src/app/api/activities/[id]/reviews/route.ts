import { NextRequest } from 'next/server';

import { handleRequest } from '@/app/(action)/axios';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const activityId = params.id;
  const page = req.nextUrl.searchParams.get('page');

  return handleRequest(`activities/${activityId}/reviews?page=${page}&size=3`, 'get');
}
