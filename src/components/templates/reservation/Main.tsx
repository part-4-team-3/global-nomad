'use client';

import ReservationCard from '@/components/molecules/reservation-card/ReservationCard';
import { Reservation, ReservationStatus } from '@/types/reservation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getMyReservations } from '@/queries/reservations/get-my-reservations';
import LoadingSpinner from '@/components/atoms/loading-spinner/LoadingSpinner';
import { reservationsKeys } from './../../../queries/reservations/query-keys';

const PAGE_SIZE = 10;

interface Props {
  status: ReservationStatus | null;
}

export default function Main({ status }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError } =
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
      <div className="flex w-full justify-center">
        <LoadingSpinner />
      </div>
    );

  if (isError) return <div>error</div>;

  const firstDataCount = data?.pages[0].totalCount ?? 0;
  const height =
    firstDataCount > 3 ? 'h-1200pxr' : firstDataCount > 1 ? 'h-800pxr' : 'h-[calc(100vh-410px)]';

  return (
    <div className={`${height} overflow-y-scroll scrollbar-hide`}>
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
    </div>
  );
}
