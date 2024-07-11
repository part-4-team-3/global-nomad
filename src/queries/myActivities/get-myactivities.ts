import { MyActivityList } from '@/types/activity';
import { queryOptions, UseQueryOptions } from '@tanstack/react-query';
import { myActivitiesKeys } from './query-keys';
import { apiInstance } from '@/lib/axios';

export const getMyActivityList = {
  queryOptions: (
    data: {
      size: number;
      cursorId: number | null;
    },
    enabled?: boolean,
  ): UseQueryOptions<MyActivityList, Error> => ({
    queryKey: myActivitiesKeys.getMyActivities(data?.cursorId, data.size),

    queryFn: (): Promise<MyActivityList> => {
      const url = data.cursorId
        ? `my-activities?size=${data.size}&cursorId=${data.cursorId}`
        : `my-activities?size=${data.size}`;
      return apiInstance.get<any, MyActivityList>(url);
    },
    enabled: enabled ?? (!!data.cursorId && !!data.size),
  }),
};
