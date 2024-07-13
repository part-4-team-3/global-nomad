import redis from '@/lib/redis';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { key, value } = await req.json();

  try {
    await redis.set(key, value);
    await redis.expire(key, 100000000000);

    return new NextResponse('Data set successfully', { status: 201 });
  } catch (err) {
    console.log('catch: ', err);
    return new NextResponse('Error ' + JSON.stringify(err), { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const key = req.nextUrl.search.split('=')[1];

  try {
    const data = await redis.get(key);
    return new NextResponse('Data: ' + data, { status: 200 });
  } catch (err) {
    console.log('catch: ', err);
    return new NextResponse('Error ' + JSON.stringify(err), { status: 500 });
  }
}
