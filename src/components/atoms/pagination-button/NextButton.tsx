'ues client';

import Image from 'next/image';

interface Props {
  totalPage: number;
  currentPage: number;
  onNext: () => void;
}

export default function NextButton({ currentPage, totalPage, onNext }: Props) {
  return (
    <button
      onClick={onNext}
      className="max-md:size-[40px] relative size-[55px]"
      disabled={currentPage === totalPage}
    >
      <Image
        fill
        src={currentPage === totalPage ? '/pagination-right-invalid.svg' : '/pagination-right.svg'}
        alt="이전 페이지"
      />
    </button>
  );
}
