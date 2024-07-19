'use client';

import ReservationCard from '@/components/molecules/reservation-card/ReservationCard';
import { Reservation, ReservationStatus } from '@/types/reservation';
import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { cancelReservationMutationOptions } from './../../../mutations/my-reservations/cancel';
import { toast } from 'react-toastify';
import { getMyReservations } from '@/queries/reservations/get-my-reservations';

const PAGE_SIZE = 10;

interface Props {
  status: ReservationStatus | null;
}

type ReservationsPage = {
  reservations: Reservation[];
  cursorId: number | null;
};

export default function Main({ status }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError } =
    useInfiniteQuery({
      queryKey: ['reservations', status],
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

  const queryClient = useQueryClient();

  const updateCache = (reservationId: number, newStatus: ReservationStatus) => {
    if (status === null) {
      queryClient.setQueryData<InfiniteData<ReservationsPage>>(
        ['reservations', null],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              reservations: page.reservations.map((reservation) =>
                reservation.id === reservationId
                  ? { ...reservation, status: newStatus }
                  : reservation,
              ),
            })),
          };
        },
      );
    }

    if (status === 'pending') {
      queryClient.setQueryData<InfiniteData<ReservationsPage>>(
        ['reservations', 'pending'],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              reservations: page.reservations.filter(
                (reservation) => reservation.id !== reservationId,
              ),
            })),
          };
        },
      );
    }

    // 나머지 상태는 쿼리 무효화
    [null, 'pending', 'confirmed', 'declined', 'canceled', 'completed'].forEach((item) => {
      if (status === item) return;
      queryClient.invalidateQueries({ queryKey: ['reservations', item] });
    });
  };

  const mutation = useMutation({
    ...cancelReservationMutationOptions,
    onSuccess: (data) => {
      updateCache(data.id, 'canceled');
      toast('예약 취소되었습니다.');
    },
  });

  if (isPending) return <div>Loading...</div>; //TODO: 로딩 이미지 넣어야함

  if (isError) return <div>error</div>;

  return (
    <div className="h-[calc(100vh-406px)] overflow-y-scroll">
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.reservations.map((reservation: Reservation) => (
            <div key={reservation.id} className="mb-[24px]">
              <ReservationCard
                {...reservation}
                onCancel={() => {
                  mutation.mutate({ reservationId: reservation.id });
                }}
              />
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
    </div>
  );
}
