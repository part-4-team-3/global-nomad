/**
 * 뒤에서부터 특정 위치에 있는 단어가 주어진 단어와 일치하는지 확인하는 함수
 * @param str 전체 문자열
 * @param position 뒤에서부터 확인할 위치 (1부터 시작)
 * @param word 확인할 단어
 * @returns 주어진 단어와 일치하는지 여부 (true/false)
 */
export function isWordAtPositionFromEnd(str: string, position: number, word: string): boolean {
  const strLength = str.length;
  const wordLength = word.length;
  const startPos = strLength - position - wordLength + 1;

  if (startPos < 0 || startPos + wordLength > strLength) {
    return false;
  }

  const substring = str.substring(startPos, startPos + wordLength);
  return substring === word;
}

/**
 * 문자열을 뒤에서 특정 위치의 두 글자 단어로 나누는 함수
 * @param str 전체 문자열
 * @param position 뒤에서부터 확인할 위치 (1부터 시작)
 * @param wordLength 단어의 길이
 * @returns [앞부분, 단어, 뒷부분]으로 나눈 배열
 */
export function splitStringByPositionFromEnd(
  str: string,
  position: number,
  wordLength: number,
): [string, string, string] {
  const strLength = str.length;
  const startPos = strLength - position - wordLength + 1;

  if (startPos < 0 || startPos + wordLength > strLength) {
    throw new Error(`잘못된 위치나 단어 길이입니다.`);
  }

  const word = str.substring(startPos, startPos + wordLength);
  const beforeWord = str.substring(0, startPos);
  const afterWord = str.substring(startPos + wordLength);

  return [beforeWord, word, afterWord];
}
