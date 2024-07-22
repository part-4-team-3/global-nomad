import ReviewCard from '@/components/molecules/review-card/ReviewCard';
import { Review } from '@/types/review';

interface Props {
  reviews: Review[];
}

export default function ReviewList({ reviews }: Props) {
  return (
    <ul className="w-full">
      {reviews.map((review, index) => (
        <li
          key={review.id}
          className={`border-b ${index === reviews.length - 1 ? '' : 'border-var-gray4'}`}
        >
          <ReviewCard review={review} />
        </li>
      ))}
    </ul>
  );
}
