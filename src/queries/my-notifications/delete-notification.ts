import { getInstance } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

export const useDeleteNotification = () => {
  return useMutation({
    mutationFn: (notificationId: number) => {
      const apiInstance = getInstance();
      return apiInstance.delete(`my-notifications/${notificationId}`);
    },
  });
};
