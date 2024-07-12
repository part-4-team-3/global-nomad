'use client';

import { getReservations } from '@/queries/reservations/get-reservations';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Reservation, ReservationStatus } from '@/types/reservation';
import { useState } from 'react';
import DropdownMenu from '@/components/molecules/dropdown-menu/DropdownMenu';

const PAGE_SIZE = 1; // 한 페이지에 표시할 항목 수

export default function ReservationList() {
  const [status, setStatus] = useState<ReservationStatus | null>(null);
  const { data, fetchNextPage, hasNextPage, isPending, isError } = useInfiniteQuery({
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

      return getReservations(params);
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.cursorId,

    staleTime: 60000,
    refetchInterval: 300000,
  });

  // 데이터 로딩 중
  if (isPending) return <div>Loading...</div>;

  // 에러 발생
  if (isError) return <div>Error loading data</div>;

  // 데이터 렌더링
  return (
    <div className="flex gap-50pxr p-50pxr">
      <div className="h-53pxr w-160pxr">
        <DropdownMenu text="상태">
          <button
            onClick={() => {
              setStatus(null);
            }}
          >
            전체
          </button>
          <button
            onClick={() => {
              setStatus('pending');
            }}
          >
            예약 신청
          </button>
          <button
            onClick={() => {
              setStatus('canceled');
            }}
          >
            예약 취소
          </button>
          <button
            onClick={() => {
              setStatus('confirmed');
            }}
          >
            예약 승인
          </button>
          <button
            onClick={() => {
              setStatus('declined');
            }}
          >
            예약 거절
          </button>
          <button
            onClick={() => {
              setStatus('completed');
            }}
          >
            체험 완료
          </button>
        </DropdownMenu>
      </div>
      <div>
        {data?.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page.reservations.map((reservation: Reservation) => (
              <div key={reservation.id}>
                <h1>{reservation.activity.title}</h1>
                <p>Status: {reservation.status}</p>
                <p>Date: {reservation.date}</p>
                <p>
                  Time: {reservation.startTime} - {reservation.endTime}
                </p>
                <p>Total Price: {reservation.totalPrice}</p>
              </div>
            ))}
          </div>
        ))}
        {hasNextPage && (
          <button className="border border-black" onClick={() => fetchNextPage()}>
            Load more
          </button>
        )}
      </div>
    </div>
  );
}
