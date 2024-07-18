import { handleRequest } from '@/app/(action)/axios';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const activityId = params.id;

  return handleRequest(`activities/${activityId}/reservations`, 'post', body);
}
