import { ReservationStatus } from '@/types/reservation';

export const reservationsKeys = {
  getMyReservations: (status: ReservationStatus | null) => ['reservation', status],
};
