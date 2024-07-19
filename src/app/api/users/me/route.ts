import { NextRequest } from 'next/server';
import { handleRequest } from '@/app/(action)/axios';

/** 내 정보 조회 */
export async function GET(req: NextRequest) {
  const body = await req.json();

  return handleRequest('users/me', 'get');
}

/** 내 정보 수정 
  "nickname": "string",
  "profileImageUrl": "string",
  "newPassword": "string" 중 필요한 것만 body에 넣으면 됩니다. */
export async function PATCH(req: NextRequest) {
  const body = await req.json();

  return handleRequest('users/me', 'patch', body);
}
