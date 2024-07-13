import redis from '@/lib/redis';
import { User } from '@/types/user';
import axios, { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await axios.post<LoginResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
      body,
    );

    const { accessToken, refreshToken, user } = response.data;

    await redis.set(user.id.toString(), JSON.stringify({ accessToken, refreshToken }));
    await redis.expire(user.id.toString(), 100000000000);

    return NextResponse.json(response.data, { status: response.status });
  } catch (err) {
    if (err instanceof AxiosError) {
      return NextResponse.json(err, { status: err.response?.status });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
