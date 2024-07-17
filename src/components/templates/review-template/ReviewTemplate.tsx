import ReviewOverview from '@/components/molecules/review-overview/ReviewOverview';
import ReviewPagination from '@/components/organisms/review-pagination/ReviewPagination';
import ReviewList from '@/components/organisms/review-list/ReviewList';
import { Review } from '@/types/review';

interface Props {
  ratings: number;
  reviewCount: number;
  reviews: Review[];
  currentPage: number;
  activityId: number;
}

export default function ReviewTemplate({
  ratings,
  reviewCount,
  reviews,
  currentPage,
  activityId,
}: Props) {
  const totalPage = Math.ceil(reviewCount / 3);

  return (
    <div className="flex flex-col items-center py-[40px]">
      <ReviewOverview ratings={ratings} reviewCount={reviewCount} />
      <ReviewList reviews={reviews} />
      <div className="pb-[145px] pt-[40px]">
        <ReviewPagination totalPage={totalPage} currentPage={currentPage} activityId={activityId} />
      </div>
    </div>
  );
}
