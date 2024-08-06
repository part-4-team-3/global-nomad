import Link from 'next/link';
import RenderPageNumbers from '@/models/pagination/render-page-numbers';
import makeQueryString from '@/lib/query-string';
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
        href={makeQueryString({ ...searchParams, ...{ page: currentPage - 1 } })}
        direction="prev"
      />
      {numbers.map((number) => (
        <Link
          href={makeQueryString({ ...searchParams, ...{ page: number } })}
          key={number}
          scroll={false}
          className={`flex size-40pxr items-center justify-center rounded-[15px] border border-var-green-dark text-[18pxr] text-var-green-dark md:size-55pxr ${number === currentPage ? 'bg-var-green-dark text-white' : 'bg-white text-gray-600'}`}
        >
          {number}
        </Link>
      ))}
      <PageArrowButton
        currentPage={currentPage}
        totalPage={totalPage}
        href={makeQueryString({ ...searchParams, ...{ page: currentPage + 1 } })}
        direction="next"
      />
    </div>
  );
}
