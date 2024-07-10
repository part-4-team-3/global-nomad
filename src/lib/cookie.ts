import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const cookie = {
  getCookie: (key: string) => {
    const result = cookies.get(key);
    return result;
  },

  setCookie: (key: string, value: string) => {
    cookies.set(key, value, { httpOnly: true });
  },

  removeCookie: (key: string) => {
    cookies.remove(key);
  },
};
