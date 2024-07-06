'ues client';

import Image from 'next/image';

interface Props {
  totalPage?: number;
  currentPage?: number;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function NextButton({ currentPage, totalPage, onNext }: Props) {
  return (
    <button
      onClick={onNext}
      className="relative size-[55px] md:size-[40px]"
      disabled={currentPage === totalPage}
    >
      <Image
        fill
        src={currentPage === totalPage ? '/paginationRight_invalid.svg' : '/paginationRight.svg'}
        alt="이전 페이지"
      />
    </button>
  );
}
