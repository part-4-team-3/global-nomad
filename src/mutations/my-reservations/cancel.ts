import { getInstance } from '@/lib/axios';
import { ReservationStatus } from '@/types/reservation';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface Body {
  reservationId: number;
}

interface Response {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
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

const cancelReservation = async ({ reservationId }: Body) => {
  const instance = getInstance();
  const res = await instance.patch<Response>(`/my-reservations/${reservationId}`, {
    status: 'canceled',
  });

  return res.data;
};

export const cancelReservationMutationOptions: UseMutationOptions<Response, Error, Body> = {
  mutationFn: cancelReservation,
  onError: (error: Error) => {
    const defaultMsg = '알 수 없는 오류로 예약 취소에 실패하였습니다.';

    if (error instanceof AxiosError) {
      toast(error.response?.data.data.message ?? defaultMsg);
      return;
    }

    toast(defaultMsg);
  },
};
