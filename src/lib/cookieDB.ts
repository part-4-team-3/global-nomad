'use server';

import fs from 'fs/promises';

const cookieDBPath = './cookieDB.json'; // cookieDBPath 변수 정의

async function initializeCookieDB() {
  let cookieDB: { [key: string]: string } = {};
  try {
    const fileContent = await fs.readFile(cookieDBPath, 'utf-8');
    cookieDB = JSON.parse(fileContent);
  } catch (error: any) {
    // error의 타입을 명시적으로 지정
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

initializeCookieDB();

// 변경 사항 저장 함수
async function saveCookieDB() {
  let cookieDB: { [key: string]: string } = {};
  await fs.writeFile(cookieDBPath, JSON.stringify(cookieDB));
}

export async function setCookieDB(key: string, value: string) {
  let cookieDB: { [key: string]: string } = {};
  await deleteCookieDB(key);
  cookieDB[key] = value;
  await saveCookieDB();
}

export async function getCookieDB(key: string): Promise<string | undefined> {
  let cookieDB: { [key: string]: string } = {};
  return cookieDB[key];
}

export async function deleteCookieDB(key: string): Promise<void> {
  let cookieDB: { [key: string]: string } = {};
  if (key in cookieDB) {
    delete cookieDB[key];
    await saveCookieDB();
  }
}
