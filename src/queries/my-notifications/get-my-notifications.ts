import { getInstance } from '@/lib/axios';
import { NotificationsData } from '@/types/notification';
import { useInfiniteQuery } from '@tanstack/react-query';
import { notificationsKeys } from './query-keys';

export interface GetMyNotificationsResponse {
  data: NotificationsData;
}

export const useGetMyNotifications = (size: number) => {
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
