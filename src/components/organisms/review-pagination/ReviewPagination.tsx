import Link from 'next/link';
import RenderPageNumbers from '@/models/pagination/render-page-numbers';
import PageArrowButton from '@/components/atoms/button/PageArrowButton';
interface Props {
  totalPage: number;
  currentPage: number;
  activityId: number;
}

export default function ReviewPagination({ currentPage, activityId, totalPage }: Props) {
  const numbers = RenderPageNumbers({ currentPage: currentPage, totalPage: totalPage });
  return (
    <div className="flex h-fit items-center gap-[10px]">
      <PageArrowButton
        currentPage={currentPage}
        href={`/activity/${activityId}?page=${currentPage - 1}#review`}
        scroll={true}
        direction="prev"
      />
      {numbers.map((number) => (
        <Link
          href={`/activity/${activityId}?page=${number}#review`}
          key={number}
          className={`flex size-40pxr items-center justify-center rounded-[15px] border border-var-green-dark text-[18pxr] text-var-green-dark md:size-55pxr ${number === currentPage ? 'bg-var-green-dark text-white' : 'text-gray-600'}`}
        >
          {number}
        </Link>
      ))}
      <PageArrowButton
        currentPage={currentPage}
        totalPage={totalPage}
        href={`/activity/${activityId}?page=${currentPage + 1}#review`}
        direction="next"
        scroll={true}
      />
    </div>
  );
}
