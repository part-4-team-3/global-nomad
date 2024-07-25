'use server';

// 전역 객체를 이용하여 cookieDB 상태 유지
declare global {
  var cookieDB: { [key: string]: string } | undefined;
}

// cookieDB가 초기화되지 않도록 전역 변수를 체크하여 설정
global.cookieDB = global.cookieDB || {};

export async function setCookieDB(key: string, value: string) {
  global.cookieDB![key] = value;
}

export async function getCookieDB(key: string): Promise<string | undefined> {
  return global.cookieDB![key];
}

export async function deleteCookieDB(key: string): Promise<void> {
  if (key in global.cookieDB!) {
    delete global.cookieDB![key];
  }
}
