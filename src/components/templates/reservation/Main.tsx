import { getReservations } from '@/queries/reservations/get-reservations';
import { Reservation, ReservationStatus } from '@/types/reservation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const PAGE_SIZE = 10;

interface Props {
  status: ReservationStatus | null;
}

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

        return getReservations(params);
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

  if (isPending) return <div>Loading...</div>; //TODO: 로딩 이미지 넣어야함

  if (isError) return <div>error</div>;

  return (
    //TODO: 무한스크롤을 위해 헤더, 푸터 페이지 패딩들 계산해서 높이 지정
    <div
    // className="h-100pxr overflow-y-scroll"
    >
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.reservations.map(
            (
              reservation: Reservation, //TODO: 카드 컴포넌트 완성시 교체
            ) => (
              <div key={reservation.id}>
                <h1>{reservation.activity.title}</h1>
                <p>Status: {reservation.status}</p>
                <p>Date: {reservation.date}</p>
                <p>
                  Time: {reservation.startTime} - {reservation.endTime}
                </p>
                <p>Total Price: {reservation.totalPrice}</p>
              </div>
            ),
          )}
        </div>
      ))}
      {hasNextPage && !isFetchingNextPage && (
        <div ref={ref} className="h-1"></div> // 숨겨진 div, 무한 스크롤 트리거
      )}
      {isFetchingNextPage && (
        <div>Loading more...</div> // 무한 스크롤 로딩 표시
      )}
    </div>
  );
}
