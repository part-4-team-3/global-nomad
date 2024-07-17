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
  nickname: string;
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


export interface ReservationListByTime {
  reservations: [
    {
      id: number;
      status: 'pending' | 'confirmed' | 'declined';
      totalPrice: number;
      headCount: number;
      nickname: string;
      userId: number;
      date: string;
      startTime: string;
      endTime: string;
      createdAt: string;
      updatedAt: string;
      activityId: number;
      scheduleId: number;
      reviewSubmitted: boolean;
      teamId: string;
    },
  ];
  totalCount: number;
  cursorId: null | number;
}

export const RESERVATION_LABELS: Record<ReservationStatus, string> = {
  pending: '예약 신청',
  confirmed: '예약 승인',
  declined: '예약 거절',
  canceled: '예약 취소',
  completed: '체험 완료',
};

export const RESERVATION_COLORS: Record<ReservationStatus, string> = {
  pending: 'text-var-blue-dark',
  confirmed: 'text-var-orange-dark',
  declined: 'text-var-red-dark',
  canceled: 'text-var-gray2',
  completed: 'text-var-gray2',
};

