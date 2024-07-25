import fs from 'fs';
import path from 'path';

const cookieDBPath = path.join(process.cwd(), 'cookieDB.json');

// 초기화 시 파일 읽기
export let cookieDB: { [key: string]: string } = {};
if (fs.existsSync(cookieDBPath)) {
  const fileContent = fs.readFileSync(cookieDBPath, 'utf-8');
  cookieDB = JSON.parse(fileContent);
}

// 변경 사항 저장 함수
function saveCookieDB() {
  fs.writeFileSync(cookieDBPath, JSON.stringify(cookieDB));
}

export function setCookieDB(key: string, value: string) {
  deleteCookieDB(key);
  cookieDB[key] = value;
  saveCookieDB();
}

export function getCookieDB(key: string): string | undefined {
  return cookieDB[key];
}

export function deleteCookieDB(key: string): void {
  if (key in cookieDB) {
    delete cookieDB[key];
    saveCookieDB();
  }
}
