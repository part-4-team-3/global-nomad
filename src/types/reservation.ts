export interface ReservationByMonth {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

export type ReservationStatus = 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';

export function isReservationStatus(status: string): status is ReservationStatus {
  return ['pending', 'confirmed', 'declined', 'canceled', 'completed'].includes(status);
}

export interface Reservation {
  activity: {
    id: number;
    title: string;
    bannerImageUrl: string;
  };
  scheduleId: number;
  id: number;
  teamId: string;
  userId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}
