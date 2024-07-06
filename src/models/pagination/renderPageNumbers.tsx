'use client';

interface PageNumbersProps {
  currentPage: number;
  totalPage: number;
  onClick: (pageNumber: number) => void;
}

/**현재 페이지를 기준으로 좌우 2개씩 총 5개의 페이지 번호 계산 */
const PageNumbers: React.FC<PageNumbersProps> = ({ currentPage, totalPage, onClick }) => {
  const pages = [];
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPage, startPage + 4);

  // 현재 페이지가 첫 페이지인 경우
  if (currentPage === 1) {
    endPage = Math.min(totalPage, startPage + 4);
  }

  // 현재 페이지가 마지막 페이지인 경우
  if (currentPage === totalPage) {
    startPage = Math.max(1, currentPage - 4);
  }
  // 페이지 숫자 렌더링
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        className={`py-17 text-base size-[55px] items-center justify-center rounded-2xl border-[1px] border-var-green-dark text-[18pxr] text-var-green-dark max-md:size-[40px] ${i === currentPage ? 'bg-var-green-dark text-white' : 'text-gray-600'}`}
        onClick={() => onClick(i)}
      >
        {i}
      </button>,
    );
  }

  return <>{pages}</>;
};

export default PageNumbers;
