import { cookieDB, setCookieDB } from '@/app/(action)/(cookie)/cookieDB';
// import redis from '@/lib/redis';
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

    const { accessToken, refreshToken, user } = response.data;

    // await redis.set(user.id.toString(), JSON.stringify({ accessToken, refreshToken }));
    // await redis.expire(user.id.toString(), 100000000000);
    setCookieDB(user.id.toString(), JSON.stringify({ accessToken, refreshToken }));
    console.log(cookieDB);

    const res = NextResponse.json(response.data, { status: response.status });
    res.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
    });
    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
    });
    res.cookies.set('userId', user.id.toString(), {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
    });

    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      return NextResponse.json(err, { status: err.response?.status });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
