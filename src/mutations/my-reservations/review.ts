import { getInstance } from '@/lib/axios';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface Body {
  reservationId: number;
  rating: number;
  content: string;
}

interface Response {
  deletedAt: string;
  updatedAt: string;
  createdAt: string;
  content: string;
  rating: number;
  userId: number;
  activityId: number;
  teamId: string;
  id: number;
}

const reviewReservation = async ({ reservationId, rating, content }: Body) => {
  const instance = getInstance();
  const res = await instance.post<Response>(`/my-reservations/${reservationId}/reviews`, {
    rating,
    content,
  });

  return res.data;
};

export const reviewReservationMutationOptions: UseMutationOptions<Response, Error, Body> = {
  mutationFn: reviewReservation,
  onError: (error: Error) => {
    const defaultMsg = '알 수 없는 오류로 예약 리뷰에 실패하였습니다.';

    if (error instanceof AxiosError) {
      toast(error.response?.data.data.message ?? defaultMsg);
      return;
    }

    toast(defaultMsg);
  },
};
