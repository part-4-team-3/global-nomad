'ues client';

import Image from 'next/image';

interface Props {
  currentPage?: number;
  onPrev?: () => void;
}

export default function PrevButton({ currentPage, onPrev }: Props) {
  return (
    <button
      onClick={onPrev}
      className="relative size-[55px] max-md:size-[40px]"
      disabled={currentPage === 1}
    >
      <Image
        fill
        src={currentPage === 1 ? '/paginationLeft_invalid.svg' : '/paginationLeft.svg'}
        alt="이전 페이지"
      />
    </button>
  );
}
