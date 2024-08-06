'use server';

import redis from '@/lib/redis';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const ipCheck = async () => {
  const userId = cookies().get('userId');
  const userInfoByRedis = await redis.get(userId?.value || '');
  const userInfo = userInfoByRedis ? JSON.parse(userInfoByRedis) : { ip: '' };
  const userIp = userInfo.ip;

  const headersList = headers();
  const currentUrl = headersList.get('x-pathname') || '';
  const myIp = headersList.get('ip') || '';

  const guardPath = ['/mypage', '/calendar', '/myactivity', '/reservation'];
  console.log('mypage ', currentUrl);
  if (userIp !== myIp && guardPath.includes(currentUrl)) {
    return true;
  }
  return false;
};