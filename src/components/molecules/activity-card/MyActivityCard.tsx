'use client';

import CardImage from '@/components/atoms/card-image/CardImage';
import { Activity } from '@/types/activity';
import ReviewRating from '@/components/atoms/review-rating/ReviewRating';
import Link from 'next/link';
import Kebab from '@/components/atoms/kebab/Kebab';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteActivityMutationOptions } from './../../../mutations/my-activities/delete';
import { toast } from 'react-toastify';
import afterDelete from '@/models/my-activities/update-cache';

interface Props extends Activity {}

export default function MyActivityCard({
  id,
  bannerImageUrl,
  title,
  rating,
  reviewCount,
  price,
}: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...deleteActivityMutationOptions,
    onSuccess: () => {
      afterDelete(queryClient, id);
      toast('체험 삭제되었습니다.');
    },
  });

  return (
    <div className="flex rounded-[24px] bg-white">
      <CardImage variant="card" src={bannerImageUrl} />
      <div className="flex w-full flex-col justify-center gap-6pxr py-[12px] pl-[8px] pr-[14px] shadow-custom md:pl-[12px] md:pr-[18px] lg:px-[24px] lg:py-[21px]">
        <ReviewRating
          reviewCount={reviewCount}
          rating={rating}
          color="black"
          className="h-17pxr md:h-19pxr"
        />
        <div className="flex min-h-81pxr flex-col justify-between md:min-h-107pxr lg:min-h-137pxr">
          <div className="leading-26pxr mb-12pxr text-14pxr font-bold md:text-18pxr lg:text-20pxr">
            {title}
          </div>
          <div className="flex h-32pxr w-full items-center justify-between md:h-40pxr">
            <span className="leading-19pxr md:leading-24pxr lg:leading-29pxr text-16pxr md:text-20pxr lg:text-24pxr">{`₩${price.toLocaleString('ko-KR')}`}</span>
            <Kebab className="w-32pxr md:w-40pxr">
              <Link href={`/myactivity/${id}/edit`}>
                <button className="h-58pxr w-160pxr hover:bg-gray-100">수정하기</button>
              </Link>
              <button
                className="h-58pxr w-160pxr hover:bg-gray-100"
                onClick={() => {
                  mutation.mutate({ activityId: id });
                }}
              >
                삭제하기
              </button>
            </Kebab>
          </div>
        </div>
      </div>
    </div>
  );
}
