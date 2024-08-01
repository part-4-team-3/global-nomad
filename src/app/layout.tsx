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
import os from 'os';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Global Nomad',
  description: 'Global Nomad 메인 페이지입니다.',
  openGraph: {
    title: 'Global Nomad',
    description:
      '사람들이 여행을 갈 때, 가서 뭘 할지, 비용은 얼마인지 등 여러 고민을 하게 됩니다. 바쁜 현대인의 이런 고민을 줄여주기 위해 플랫폼 안에 잘 짜인 체험 상품을 보고 간단하게 예약할 수 있는 서비스입니다.',
    url: 'https://glabal-nomad.vercel.app',
    type: 'article',
    images: [
      {
        url: 'card-default-bg.svg',
        alt: 'Global Nomad',
      },
    ],
    siteName: 'Global Nomad',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = cookies().get('userId');
  const userInfoByRedis = await redis.get(userId?.value || '');
  const userInfo = userInfoByRedis ? JSON.parse(userInfoByRedis) : { compunterName: '' };
  const userCompunter = userInfo.computerName;

  const computerName = os.hostname();

  const headersList = headers();
  const currentUrl = headersList.get('x-pathname') || '';

  if (userCompunter !== computerName && currentUrl === '/calendar') {
    redirect('/signin');
  }

  return (
    <html lang="ko">
      <body className={inter.className}>
        <Script
          strategy="beforeInteractive"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_KEY}&autoload=false&libraries=services`}
        />
        <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />
        <Providers>
          <ToastProvider>{children}</ToastProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
      </body>
    </html>
  );
}
