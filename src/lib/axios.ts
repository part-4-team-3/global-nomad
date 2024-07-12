import axios from 'axios';
import { cookie } from './cookie';
import { redirect } from 'next/navigation';
import { getCookie } from '@/app/(actions)/cookie';

const BASE_URL = 'https://sp-globalnomad-api.vercel.app/5-3/';
export const apiInstance = axios.create({
  baseURL: BASE_URL,
});

apiInstance.interceptors.request.use((config) => {
  const accessToken = cookie.getCookie('accessToken');
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

apiInstance.interceptors.response.use(
  (success) => {
    return success.data;
  },

  (error) => {
    if (error.response && error.response.status === 401) {
      const refreshToken = cookie.getCookie('refreshToken');
      console.log(refreshToken);
      if (!refreshToken) {
        window.location.href = '/signin';
      } else {
        apiInstance
          .post('auth/tokens', null, {
            headers: { Authorization: `Bearer ${refreshToken}` },
          })
          .then((data) => {
            const accessToken = data.data.accessToken;
            const refreshToken = data.data.refreshToken;
            cookie.setCookie('accessToken', accessToken);
            cookie.setCookie('refreshToken', refreshToken);
            return;
          })
          .catch(() => {
            window.location.href = '/signin';
          });
      }
    } else {
      throw new Error(error.response.status);
    }
  },
);

// next 서버에서 사용하는 api 호출용 axios 인스턴스
export const apiInstanceByServer = axios.create({
  baseURL: BASE_URL,
});

// Request 인터셉터
apiInstanceByServer.interceptors.request.use((config) => {
  const accessToken = cookie.getCookie('accessToken');
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// Response 인터셉터
apiInstanceByServer.interceptors.response.use(
  // 응답 성공 시
  (config) => {
    return config.data;
  },

  // 응답 실패 시
  async (error) => {
    const originalRequest = error.config;

    // 기존의 accessToken에서 401 에러가 발생한 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await cookie.getCookie('refreshToken');

      // server의 cookies에 refreshToken이 없는 경우 바로 redirect
      if (!refreshToken) {
        redirect('/signin');
      }

      // server의 cookies에 refreshToken이 있는 경우 refreshToken을 사용하여 새로운 accessToken을 발급받음
      try {
        const { data } = await axios.post(
          'https://sp-globalnomad-api.vercel.app/5-3/auth/tokens',
          null,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );

        // 새로운 accessToken과 refreshToken을 cookies에 저장
        cookie.setCookie('accessToken', data.accessToken);
        cookie.setCookie('refreshToken', data.refreshToken);

        // 기존의 요청을 재요청
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        const prevData = await axios(originalRequest);
        return prevData;
      } catch (err) {
        // refreshToken을 사용하여 새로운 accessToken을 발급받는 과정에서 에러가 발생한 경우
        redirect('/signin');
      }
    }
  },
);
