import { MyActivityList } from '@/types/activity';
import { useInfiniteQuery } from '@tanstack/react-query';
import { myActivitiesKeys } from './query-keys';
import { getInstance } from '@/lib/axios';

interface GetMyActivityListData {
  size: number;
  cursorId: number | null;
}

interface MyActivityListResponse {
  data: MyActivityList;
}

export const useGetMyActivityList = (data: GetMyActivityListData) => {
  const { size, cursorId } = data;

  return useInfiniteQuery<MyActivityListResponse>({
    queryKey: myActivitiesKeys.getMyActivities(cursorId, size),
    queryFn: ({ pageParam }) => {
      const apiInstance = getInstance();
      const url = pageParam
        ? `my-activities?size=${size}&cursorId=${pageParam}`
        : `my-activities?size=${size}`;

      return apiInstance.get(url);
    },

    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage?.data.cursorId ? lastPage?.data.cursorId : null;
    },
  });
};
