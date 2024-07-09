'ues client';

import Image from 'next/image';

interface Props {
  currentPage: number;
  onPrev: () => void;
}

export default function PrevButton({ currentPage, onPrev }: Props) {
  return (
    <button
      onClick={onPrev}
      className="max-md:size-[40px] relative size-[55px]"
      disabled={currentPage === 1}
    >
      <Image
        fill
        src={currentPage === 1 ? '/pagination-left-invalid.svg' : '/pagination-left.svg'}
        alt="이전 페이지"
      />
    </button>
  );
}
