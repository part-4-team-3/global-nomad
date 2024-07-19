import { NextRequest } from 'next/server';
import { handleRequest } from '@/app/(action)/axios';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  return await handleRequest('activities/image', 'post', formData);
}
