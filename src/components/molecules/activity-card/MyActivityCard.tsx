import CardImage from '@/components/atoms/card-image/CardImage';
import { Activity } from '@/types/activity';
import ReviewRating from '@/components/atoms/review-rating/ReviewRating';
import Link from 'next/link';
import Kebab from '@/components/atoms/kebab/Kebab';

interface Props extends Activity {}

export default function MyActivityCard({
  id,
  bannerImageUrl,
  title,
  rating,
  reviewCount,
  price,
}: Props) {
  return (
    <div className="flex rounded-[24px] shadow-custom">
      <CardImage variant="card" src={bannerImageUrl} />
      <div className="flex w-full flex-col justify-center px-[24px] py-[25.5px]">
        <ReviewRating reviewCount={reviewCount} rating={rating} color="gray" />
        <div className="mb-12pxr text-20pxr font-bold">{title}</div>
        <div className="flex w-full justify-between">
          <span className="text-24pxr">{`₩${price.toLocaleString('ko-KR')}`}</span>
          <Kebab>
            <Link href={`/myactivity/${id}/edit`}>
              <button className="h-58pxr w-160pxr hover:bg-gray-100">수정하기</button>
            </Link>
            <button className="h-58pxr w-160pxr hover:bg-gray-100">삭제하기</button>
          </Kebab>
        </div>
      </div>
    </div>
  );
}
