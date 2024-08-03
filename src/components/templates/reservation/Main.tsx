'use client';

import ReservationCard from '@/components/molecules/reservation-card/ReservationCard';
import { Reservation, ReservationStatus } from '@/types/reservation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getMyReservations } from '@/queries/reservations/get-my-reservations';
import LoadingSpinner from '@/components/atoms/loading-spinner/LoadingSpinner';
import { reservationsKeys } from './../../../queries/reservations/query-keys';
import Button from '@/components/atoms/button/Button';

const PAGE_SIZE = 10;

interface Props {
  status: ReservationStatus | null;
}

export default function Main({ status }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError, refetch } =
    useInfiniteQuery({
      queryKey: reservationsKeys.getMyReservations(status),
      queryFn: ({ pageParam }: { pageParam: number | undefined }) => {
        const params: {
          cursorId?: number;
          size: number;
          status?: ReservationStatus;
        } = {
          size: PAGE_SIZE,
        };

        if (pageParam) {
          params.cursorId = pageParam;
        }

        if (status) {
          params.status = status;
        }

        return getMyReservations(params);
      },
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.cursorId,

      staleTime: 60000,
      refetchInterval: 300000,
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
      <div className="flex min-h-300pxr w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  if (isError)
    return (
      <div className="flex flex-col items-center">
        <p>알 수 없는 이유로 예약 내역을 불러오지 못하였습니다.</p>
        <Button className="px-10pxr" text="재시도" color="black" onClick={() => refetch()} />
      </div>
    );

  return (
    <>
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.reservations.map((reservation: Reservation) => (
            <div key={reservation.id} className="mb-[8px] md:mb-[16px] lg:mb-[24px]">
              <ReservationCard {...reservation} />
            </div>
          ))}
        </div>
      ))}
      {hasNextPage && !isFetchingNextPage && <div ref={ref} className="h-1pxr"></div>}
      {isFetchingNextPage && (
        <div className="flex w-full justify-center">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}
