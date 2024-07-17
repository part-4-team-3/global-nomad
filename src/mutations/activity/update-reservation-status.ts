import { getInstance } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const useUpdateReservationStatus = (activityId: number, reservationId: number) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (status: string) => {
      const apiInstance = getInstance();
      return apiInstance.patch(`my-reservations/status/${activityId}/${reservationId}`, { status });
    },
    onSuccess: () => {
      router.push('/calendar');
    },
    onError: (err) => {
      toast('요청에 실패했습니다.', {
        onClose: () => {
          router.push('/calendar');
        },
        onClick: () => {
          router.push('/calendar');
        },
      });
    },
  });
};
