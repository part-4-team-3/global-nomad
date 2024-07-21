'use client';

import CardImage from '@/components/atoms/card-image/CardImage';
import { Activity, MyActivityList } from '@/types/activity';
import ReviewRating from '@/components/atoms/review-rating/ReviewRating';
import Link from 'next/link';
import Kebab from '@/components/atoms/kebab/Kebab';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteActivityMutationOptions } from './../../../mutations/my-activities/delete';
import { toast } from 'react-toastify';

interface Props extends Activity {}

interface MyActivityPage {
  data: MyActivityList;
}

export default function MyActivityCard({
  id,
  bannerImageUrl,
  title,
  rating,
  reviewCount,
  price,
}: Props) {
  const queryClient = useQueryClient();

  const updateCache = (activityId: number) => {
    queryClient.setQueryData<InfiniteData<MyActivityPage>>(['my-activities'], (oldData) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          data: {
            ...page.data,
            activities: page.data.activities.filter((activity) => activity.id !== activityId),
            totalCount: page.data.totalCount - 1,
          },
        })),
      };
    });
  };

  const mutation = useMutation({
    ...deleteActivityMutationOptions,
    onSuccess: () => {
      updateCache(id);
      toast('체험 삭제되었습니다.');
    },
  });

  return (
    <div className="flex rounded-[24px] bg-white">
      <CardImage variant="card" src={bannerImageUrl} />
      <div className="flex w-full flex-col justify-center px-[24px] py-[25.5px] shadow-custom">
        <ReviewRating reviewCount={reviewCount} rating={rating} color="gray" />
        <div className="mb-12pxr text-20pxr font-bold">{title}</div>
        <div className="flex w-full justify-between">
          <span className="text-24pxr">{`₩${price.toLocaleString('ko-KR')}`}</span>
          <Kebab>
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
  );
}
