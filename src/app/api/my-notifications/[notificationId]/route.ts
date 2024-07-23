import { handleRequest } from '@/app/(action)/axios';
import { NextRequest } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { notificationId: number } }) {
  const notificationId = params.notificationId;

  return handleRequest(`my-notifications/${notificationId}`, 'delete');
}
