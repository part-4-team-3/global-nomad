import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const cookie = {
  getCookie: (key: string) => {
    cookies.get(key);
  },

  setCookie: (key: string, value: string) => {
    cookies.set(key, value);
  },

  removeCookie: (key: string) => {
    cookies.remove(key);
  },
};
