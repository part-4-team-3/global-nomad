import { getInstance } from '@/lib/axios';
import { Notification } from '@/types/notification';

export interface GetMyNotificationsResponse {
  cursorId: number;
  notifications: Notification[];
  totalCount: number;
}

export const getMyNotifications = async () => {
  const apiInstance = getInstance();
  const data = await apiInstance.get<GetMyNotificationsResponse>('my-notifications');
  return data.data;
};
