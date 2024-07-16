import { handleRequest } from '@/app/(action)/axios';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  return handleRequest('users', 'post', body);
}
