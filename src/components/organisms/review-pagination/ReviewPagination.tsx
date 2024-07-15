import Link from 'next/link';
import RenderPageNumbers from '@/models/pagination/render-page-numbers';
import ReviewPrevButton from '@/components/atoms/button/ReviewPrevButton';
import ReviewNextButton from '@/components/atoms/button/ReviewNextButton';
interface Props {
  totalPage: number;
  currentPage: number;
  activityId: number;
}

export default function ReviewPagination({ currentPage, activityId, totalPage }: Props) {
  const numbers = RenderPageNumbers({ currentPage: currentPage, totalPage: totalPage });
  return (
    <div className="flex h-fit items-center gap-[10px]">
      <ReviewPrevButton
        currentPage={currentPage}
        href={`/activity/${activityId}?page=${currentPage - 1}`}
      />
      {numbers.map((number) => (
        <Link href={`/activity/${activityId}?page=${number}`} key={number} scroll={false}>
          <button
            className={`py-17 text-base max-md:size-[40px] size-[55px] items-center justify-center rounded-2xl border-[1px] border-var-green-dark text-[18pxr] text-var-green-dark ${number === currentPage ? 'bg-var-green-dark text-white' : 'text-gray-600'}`}
          >
            {number}
          </button>
        </Link>
      ))}
      <ReviewNextButton
        currentPage={currentPage}
        totalPage={totalPage}
        href={`/activity/${activityId}?page=${currentPage + 1}`}
      />
    </div>
  );
}
