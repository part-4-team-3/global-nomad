import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './react-query-providers';
import ToastProvider from './ToastProvider';
import Script from 'next/script';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import redis from '@/lib/redis';
import { cookies, headers } from 'next/headers';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = cookies().get('userId');
  const userInfoByRedis = await redis.get(userId?.value || '');
  const userInfo = userInfoByRedis ? JSON.parse(userInfoByRedis) : { ip: '' };
  const userIp = userInfo.ip;

  const myIp = headers().get('ip') || '';

  const headersList = headers();
  const currentUrl = headersList.get('x-pathname') || '';

  if (userIp !== myIp && currentUrl === '/calendar') {
    redirect('/signin');
  }

  return (
    <html lang="ko">
      <body className={inter.className}>
        <Script
          strategy="beforeInteractive"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_KEY}&autoload=false&libraries=services`}
        />
        <Providers>
          <ToastProvider>{children}</ToastProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
      </body>
    </html>
  );
}
