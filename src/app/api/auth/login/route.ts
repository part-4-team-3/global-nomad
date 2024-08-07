// import redis from '@/lib/redis';
import redis from '@/lib/redis';
import { LoginResponse } from '@/mutations/auth/login';
import axios, { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await axios.post<LoginResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
      body,
    );

    const myIp = req.headers.get('x-forwarded-for');
    const { accessToken, refreshToken, user } = response.data;

    const loginData = JSON.stringify({ ip: myIp, accessToken, refreshToken });
    await redis.set(user.id.toString(), loginData);
    await redis.expire(user.id.toString(), 100000000000);

    const res = NextResponse.json(response.data, { status: response.status });
    res.cookies.set('userId', user.id.toString(), {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      return NextResponse.json(err, { status: err.response?.status });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
