import { getInstance } from '@/lib/axios';
import { NotificationsData } from '@/types/notification';
import { useInfiniteQuery } from '@tanstack/react-query';
import { notificationsKeys } from './query-keys';

interface GetMyNotificationsData {
  size: number;
  cursorId: number | null;
}

export interface GetMyNotificationsResponse {
  data: NotificationsData;
}

export const useGetMyNotifications = (data: GetMyNotificationsData) => {
  const { size, cursorId } = data;

  return useInfiniteQuery<GetMyNotificationsResponse>({
    queryKey: notificationsKeys.getMyNotifications,
    queryFn: ({ pageParam }) => {
      const apiInstance = getInstance();
      const url = pageParam
        ? `my-notifications?size=${size}&cursorId=${pageParam}`
        : `my-notifications?size=${size}`;
      return apiInstance.get(url);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage?.data.cursorId ? lastPage?.data.cursorId : null;
    },
  });
};
