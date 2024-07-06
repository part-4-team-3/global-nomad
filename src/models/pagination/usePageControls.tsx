import { useState } from 'react';

interface Props {
  initialPage: number;
}

export const usePageControls = ({ initialPage }: Props) => {
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(initialPage);

  /** 페이지숫자 클릭시 해당 페이지로 이동 */
  const handlePageClick = (pageNumber: number) => {
    setCurrentPageNumber(pageNumber);
  };

  /** 다음페이지로 이동 */
  const handleNextButton = () => {
    setCurrentPageNumber((prev) => prev + 1);
  };

  /** 이전페이지로 이동 */
  const handlePrevButton = () => {
    setCurrentPageNumber((prev) => prev - 1);
  };

  return {
    currentPageNumber,
    handlePageClick,
    handleNextButton,
    handlePrevButton,
  };
};
