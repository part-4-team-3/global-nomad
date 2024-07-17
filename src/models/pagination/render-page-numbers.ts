interface Props {
  currentPage: number;
  totalPage: number;
}

/**현재 페이지를 기준으로 좌우 2개씩 총 5개의 페이지 번호 계산 */
const RenderPageNumbers = ({ currentPage, totalPage }: Props) => {
  let start: number;
  let end: number;

  // 전페 페이지가 5페이지 이하일 때
  if (totalPage <= 5) {
    start = 1;
    end = totalPage;
  } else {
    //시작페이지 렌더링
    if (currentPage <= 3) {
      start = 1;
      end = 5;
    } //마지막페이지 렌더링
    else if (currentPage >= totalPage - 2) {
      start = totalPage - 4;
      end = totalPage;
    } //중간페이지 렌더링
    else {
      start = currentPage - 2;
      end = currentPage + 2;
    }
  }

  const numbers = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  return numbers;
};

export default RenderPageNumbers;
