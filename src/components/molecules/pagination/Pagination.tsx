'use client';

import PageNumberButton from '@/components/atoms/button/PageNumberButton';
import NextButton from '@/components/atoms/pagination-button/NextButton';
import PrevButton from '@/components/atoms/pagination-button/PrevButton';
import RentderPageNumbers from '@/models/pagination/render-page-numbers';
import { usePageControls } from '@/models/pagination/use-page-controls';

interface Props {
  totalCount: number;
  size: number;
  currentPage: number;
  onPrev: () => void;
  onNext: () => void;
  onClick: (index: number) => void;
}

export default function Pagination({
  totalCount = 50,
  size = 5,
  currentPage = 1,
  onPrev,
  onNext,
  onClick,
}: Props) {
  /* 추후 상위 컴포넌트에서 사용될 커스텀훅입니다. */
  const { currentPageNumber, handlePageClick, handleNextButton, handlePrevButton } =
    usePageControls({ initialPage: currentPage });
  const totalPage = Math.ceil(totalCount / size);
  const numbers = RentderPageNumbers({ currentPage: currentPageNumber, totalPage: totalPage });

  return (
    <div className="flex items-center gap-[10px]">
      <PrevButton currentPage={currentPageNumber} onPrev={handlePrevButton} />
      <PageNumberButton
        currentPage={currentPageNumber}
        numbers={numbers}
        onClick={handlePageClick}
      />
      <NextButton currentPage={currentPageNumber} totalPage={totalPage} onNext={handleNextButton} />
    </div>
  );
}
