'ues client';

import NextButton from '@/components/atoms/PaginationButton/NextButton';
import PrevButton from '@/components/atoms/PaginationButton/PrevButton';

interface Props {
  totalPage?: number;
  currentPage?: number;
  onPrev?: () => void;
  onNext?: () => void;
}
export default function Pagination({ totalPage, currentPage, onPrev, onNext }: Props) {
  return (
    <div>
      <PrevButton />
      <NextButton />
    </div>
  );
}
