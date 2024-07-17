import { NextRequest } from 'next/server';
import { handleRequest } from '@/app/(action)/axios';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  return handleRequest(`activities/${id}`, 'get');
}