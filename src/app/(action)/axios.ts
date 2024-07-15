'use server';

import redis from '@/lib/redis';
import axios, { AxiosError } from 'axios';
import { getCookie } from './(cookie)/cookie';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const axiosByServer = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor
axiosByServer.interceptors.request.use(async (config) => {
  // 쿠키에서 userId를 가져옵니다.
  const userId = await getCookie('userId');

  if (userId) {
    // redis에서 userId를 키로하여 accessToken을 가져옵니다.
    const usersToken = await redis.get(userId!);

    // accessToken을 헤더에 추가합니다.
    const accessToken = JSON.parse(usersToken!).accessToken;
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// Response interceptor
axiosByServer.interceptors.response.use(
  (success) => success,

  async (error) => {
    const originalRequest = error.config;

    // 401 에러가 발생했을 때
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // redis에서 userId를 가져옵니다.
      const userId = await getCookie('userId');

      // redis에서 userId를 키로하여 refreshToken
      const usersToken = await redis.get(userId!);

      if (!usersToken) throw error;

      // refreshToken을 가져옵니다.
      const refreshToken = JSON.parse(usersToken!).refreshToken;

      // refreshToken을 헤더에 추가하여 새로운 accessToken과 refreshToken을 가져옵니다.
      const { data } = await axios.post(`${BASE_URL}auth/tokens`, null, {
        headers: { Authorization: `Bearer ${refreshToken}` },
      });

      // 새로운 accessToken과 refreshToken을 redis에 저장합니다.
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data;
      await redis.set(
        userId!,
        JSON.stringify({ accessToken: newAccessToken, refreshToken: newRefreshToken }),
      );
      await redis.expire(userId!.toString(), 100000000000);

      // 새로운 accessToken을 헤더에 추가하여 요청을 재시도합니다.
      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
      const prevData = await axios(originalRequest);
      return prevData;
    }

    throw error;
  },
);

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

// 요청 처리 함수
export async function handleRequest(url: string, method: Method, body?: object) {
  try {
    let response;
    if (method === 'get' || method === 'delete') {
      response = await axiosByServer[method](url);
    } else {
      response = await axiosByServer[method](url, body);
    }

    const { data, status } = response;

    return NextResponse.json(data, { status });
  } catch (err) {
    if (err instanceof AxiosError) {
      return NextResponse.json(
        {
          isAxiosError: true,
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        },
        { status: err.response?.status || 500 },
      );
    }

    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
        status: 500,
      },
      { status: 500 },
    );
  }
}
