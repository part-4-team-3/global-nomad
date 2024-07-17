export interface ReservationByMonth {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

export type ReservationStatus = 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';

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
