import { NextRequest } from 'next/server';
import { handleRequest } from '@/app/(action)/axios';

export async function POST(req: NextRequest) {
  const body = await req.formData();
  return await handleRequest('users/me/image', 'post', body);
}
