import { handleRequest } from '@/app/(action)/axios';

export async function GET() {
  return handleRequest('my-notifications', 'get');
}
