import Link from 'next/link';
import RenderPageNumbers from '@/models/pagination/render-page-numbers';
import { addSearchParam } from '@/lib/query-string';
import PageArrowButton from '@/components/atoms/button/PageArrowButton';
interface Props {
  totalPage: number;
  currentPage: number;
  searchParams?: {};
}

export default function Pagination({ currentPage, totalPage, searchParams = '' }: Props) {
  const numbers = RenderPageNumbers({ currentPage: currentPage, totalPage: totalPage });

  return (
    <div className="flex h-fit items-center gap-[10px]">
      <PageArrowButton
        currentPage={currentPage}
        href={addSearchParam({ page: currentPage - 1 }, searchParams)}
        direction="prev"
      />
      {numbers.map((number) => (
        <Link
          href={addSearchParam({ page: number }, searchParams)}
          key={number}
          scroll={false}
          className={`py-17 text-base flex size-40pxr items-center justify-center rounded-2xl border-[1px] border-var-green-dark text-[18pxr] text-var-green-dark ${number === currentPage ? 'bg-var-green-dark text-white' : 'text-gray-600'}`}
        >
          {number}
        </Link>
      ))}
      <PageArrowButton
        currentPage={currentPage}
        totalPage={totalPage}
        href={addSearchParam({ page: currentPage + 1 }, searchParams)}
        direction="next"
      />
    </div>
  );
}
