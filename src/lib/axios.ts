import axios from 'axios';
import { cookie } from './cookie';

export const apiInstance = axios.create({
  baseURL: 'https://sp-globalnomad-api.vercel.app/5-3/',
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
          .catch((tokenError) => {
            console.log(tokenError.response);
            window.location.href = '/signin';
          });
      }
    } else {
      throw new Error(error.response.status);
    }
  },
);
