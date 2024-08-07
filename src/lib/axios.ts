import axios from 'axios';
import { getCookie } from '@/app/(action)/(cookie)/cookie';

const ENV_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const instanceForCS = axios.create({
  baseURL: ENV_BASE_URL,
});

// next 서버에서 사용하는 api 호출용 axios 인스턴스
const instanceForSS = axios.create({
  baseURL: ENV_BASE_URL,
});

// Request 인터셉터
instanceForSS.interceptors.request.use(async (config) => {
  const accessToken = await getCookie('userId');
  if (accessToken) config.headers.Cookie = `userId=${accessToken}`;
  return config;
});

export function getInstance() {
  const isServer = typeof window === 'undefined';

  return isServer ? instanceForSS : instanceForCS;
}
