// import redis from '@/lib/redis';
import makeQueryString from '@/lib/query-string';
import redis from '@/lib/redis';
import { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  try {
    const queryParams = Object.fromEntries(req.nextUrl.searchParams);
    const queryString = makeQueryString(queryParams);
    const userId = queryString.split('=')[1];
    await redis.del(userId);

    return NextResponse.json('로그아웃이 완료되었습니다.', { status: 201 });
  } catch (err) {
    if (err instanceof AxiosError) {
      return NextResponse.json(err, { status: err.response?.status });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
