'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Activity, MyActivityList } from './../../../types/activity';
import MyActivityCard from '@/components/molecules/activity-card/MyActivityCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getInstance } from '@/lib/axios';
import LoadingSpinner from '@/components/atoms/loading-spinner/LoadingSpinner';
import AlertModal from '@/components/molecules/modal/AlertModal';

const PAGE_SIZE = 10;

export default function Main() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError } =
    useInfiniteQuery({
      queryKey: ['my-activities'],
      queryFn: ({ pageParam }: { pageParam: number | null }) => {
        const instance = getInstance();
        const url = pageParam
          ? `my-activities?size=${PAGE_SIZE}&cursorId=${pageParam}`
          : `my-activities?size=${PAGE_SIZE}`;

        return instance.get<MyActivityList>(url);
      },

      initialPageParam: null,
      getNextPageParam: (lastPage) => {
        return lastPage?.data.cursorId ? lastPage?.data.cursorId : null;
      },
      staleTime: 60 * 1000,
    });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending)
    return (
      <div className="flex w-full justify-center">
        <LoadingSpinner />
      </div>
    );

  if (isError) return <div>error</div>;

  return (
    <div className="h-[calc(100vh-406px)] overflow-y-scroll scrollbar-hide">
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.data.activities.map((activity: Activity) => (
            <div key={activity.id} className="mb-[16px] lg:mb-[24px]">
              <MyActivityCard {...activity} />
            </div>
          ))}
        </div>
      ))}
      {hasNextPage && !isFetchingNextPage && (
        <div ref={ref} className="h-1pxr"></div> // 숨겨진 div, 무한 스크롤 트리거
      )}
      {isFetchingNextPage && (
        <div>Loading more...</div> // 무한 스크롤 로딩 표시
      )}
      <AlertModal text="체험수정이 완료되었습니다." />
    </div>
  );
}
