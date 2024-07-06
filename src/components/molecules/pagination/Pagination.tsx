'use client';

import NextButton from '@/components/atoms/pagination-button/NextButton';
import PrevButton from '@/components/atoms/pagination-button/PrevButton';
import PageNumbers from '@/models/pagination/renderPageNumbers';
import { useState } from 'react';

interface Props {
  totalCount: number;
  size: number;
  currentPage: number;
  onPrev: () => void;
  onNext: () => void;
  onClick: (index: number) => void;
}

export default function Pagination({
  totalCount = 60,
  size = 5,
  // currentPage = 5,
  onPrev,
  onNext,
  onClick,
}: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPage = Math.ceil(totalCount / size);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleNextButton = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevButton = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="flex items-center gap-[10px]">
      <PrevButton currentPage={currentPage} onPrev={handlePrevButton} />
      <PageNumbers currentPage={currentPage} totalPage={totalPage} onClick={handlePageClick} />
      <NextButton currentPage={currentPage} totalPage={totalPage} onNext={handleNextButton} />
    </div>
  );
}
