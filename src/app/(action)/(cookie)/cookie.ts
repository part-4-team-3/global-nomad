'use server';

import { cookies } from 'next/headers';

export const getCookie = async (key: string) => {
  const cookie = cookies().get(key);
  return cookie?.value;
};

export const setCookie = async (key: string, value: string) => {
  cookies().set(key, value);
};
