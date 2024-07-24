import { getInstance } from '@/lib/axios';
import { Notification } from '@/types/notification';
import { useQuery } from '@tanstack/react-query';
import { notificationsKeys } from './query-keys';

export interface GetMyNotificationsResponse {
  cursorId: number;
  notifications: Notification[];
  totalCount: number;
}

export const useGetMyNotifications = () => {
  return useQuery<GetMyNotificationsResponse>({
    queryKey: notificationsKeys.getMyNotifications(null, 5),
    queryFn: async () => {
      const apiInstance = getInstance();
      const response = await apiInstance.get<GetMyNotificationsResponse>('my-notifications');
      return response.data;
    },
  });
};
