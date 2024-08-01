'use server';

import redis from '@/lib/redis';

export const ipCheck = async (myIp: string, userId: string) => {
  const userInfoByRedis = await redis.get(userId);
  const userInfo = userInfoByRedis ? JSON.parse(userInfoByRedis) : {};
  if (userInfo.ip !== myIp) {
    return false;
  } else {
    return true;
  }
};
