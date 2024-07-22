import { reservationsKeys } from '@/queries/reservations/query-keys';
import { Reservation } from '@/types/reservation';
import { InfiniteData, QueryClient } from '@tanstack/react-query';

type ReservationsPage = {
  reservations: Reservation[];
  cursorId: number | null;
};

export default function afterCancel(queryClient: QueryClient, reservationId: number) {
  let target: Reservation;
  [null, 'pending', 'canceled'].forEach((status) => {
    if (status === null) {
      queryClient.setQueryData<InfiniteData<ReservationsPage>>(
        reservationsKeys.getMyReservations(status),
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              reservations: page.reservations.map((reservation) => {
                if (reservation.id === reservationId) {
                  target = reservation;
                  return { ...reservation, status: 'canceled' };
                } else return reservation;
              }),
            })),
          };
        },
      );
    } else if (status === 'pending') {
      queryClient.setQueryData<InfiniteData<ReservationsPage>>(
        reservationsKeys.getMyReservations(status),
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              reservations: page.reservations.filter((reservation) => {
                if (reservation.id === reservationId) target = reservation;
                return reservation.id !== reservationId;
              }),
            })),
          };
        },
      );
    } else if (status === 'canceled') {
      if (target) {
        queryClient.setQueryData<InfiniteData<ReservationsPage>>(
          reservationsKeys.getMyReservations(status),
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              pages: [
                {
                  ...oldData.pages[0],
                  reservations: [
                    { ...target, status: 'canceled' },
                    ...oldData.pages[0].reservations,
                  ],
                },
                ...oldData.pages.slice(1),
              ],
            };
          },
        );
      }
    }
  });
}
