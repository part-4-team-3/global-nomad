import { NextRequest } from 'next/server';
import makeQueryString from '@/lib/query-string';
import { handleRequest } from '@/app/(action)/axios';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { activityId: string; reservationId: string } },
) {
  const { activityId, reservationId } = params;
  const { status } = await req.json();
  console.log(activityId, reservationId, status);

  return handleRequest(`my-activities/${activityId}/reservations/${reservationId}`, 'patch', {
    status: status,
  });
}
