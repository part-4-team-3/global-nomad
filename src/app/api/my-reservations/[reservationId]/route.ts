import { handleRequest } from '@/app/(action)/axios';
import { NextRequest } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { reservationId: string } }) {
  const reservationId = params.reservationId;
  const body = await req.json();

  return handleRequest(`my-reservations/${reservationId}`, 'patch', body);
}
