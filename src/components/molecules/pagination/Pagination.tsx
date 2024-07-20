import Link from 'next/link';
import RenderPageNumbers from '@/models/pagination/render-page-numbers';
import ReviewPrevButton from '@/components/atoms/button/ReviewPrevButton';
import ReviewNextButton from '@/components/atoms/button/ReviewNextButton';
import { addSearchParam } from '@/lib/query-string';
interface Props {
  totalPage: number;
  currentPage: number;
  searchParams?: {};
}

export default function Pagination({ currentPage, totalPage, searchParams = '' }: Props) {
  const numbers = RenderPageNumbers({ currentPage: currentPage, totalPage: totalPage });
  console.log(searchParams);

  return (
    <div className="flex h-fit items-center gap-[10px]">
      <ReviewPrevButton
        currentPage={currentPage}
        href={addSearchParam({ page: Number(currentPage) - 1 }, searchParams)}
      />
      {numbers.map((number) => (
        <Link href={addSearchParam({ page: number }, searchParams)} key={number} scroll={false}>
          <button
            className={`py-17 text-base size-40pxr items-center justify-center rounded-2xl border-[1px] border-var-green-dark text-[18pxr] text-var-green-dark ${number === currentPage ? 'bg-var-green-dark text-white' : 'text-gray-600'}`}
          >
            {number}
          </button>
        </Link>
      ))}
      <ReviewNextButton
        currentPage={currentPage}
        totalPage={totalPage}
        href={addSearchParam({ page: Number(currentPage) + 1 }, searchParams)}
      />
    </div>
  );
}
