'ues client';

import NextButton from '@/components/atoms/pagination-button/NextButton';
import PrevButton from '@/components/atoms/pagination-button/PrevButton';

interface Props {
  totalCount?: number;
  size?: number;
  currentPage?: number;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function Pagination({ totalCount, size, currentPage, onPrev, onNext }: Props) {
  const totalPage = Math.ceil(totalCount / size);

  // 현재 페이지를 기준으로 좌우 2개씩 총 5개의 페이지 번호 계산
  const renderPageNumbers = () => {
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

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`py-17 text-base size-[55px] items-center justify-center rounded-2xl border-[1px] border-var-green-dark text-[18pxr] text-var-green-dark max-md:size-[40px] ${i === currentPage ? 'bg-var-green-dark text-white' : 'text-gray-600'}`}
        >
          {i}
        </button>,
      );
    }

    return pages;
  };
  return (
    <div className="flex items-center gap-[10px]">
      <PrevButton currentPage={currentPage} onPrev={onPrev} />
      {renderPageNumbers()}
      <NextButton currentPage={currentPage} totalPage={totalPage} onNext={onNext} />
    </div>
  );
}
