import { UseQueryOptions } from '@tanstack/react-query';
import { myActivitiesKeys } from './query-keys';
import { apiInstance } from '@/lib/axios';
import { MyActivitiesOfMonth } from '@/types/activity';

export const getMyActivitiesByMonth = {
  queryOptions: (
    data: { activityId: number; year: string; month: string },
    enabled?: boolean,
  ): UseQueryOptions<MyActivitiesOfMonth, Error> => ({
    queryKey: myActivitiesKeys.getMyActivitiesByMonth(data.activityId),
    queryFn: (): Promise<MyActivitiesOfMonth> =>
      apiInstance.get<any, MyActivitiesOfMonth>(
        `my-activities/${data.activityId}/reservation-dashboard?year=${data.year}&month=${data.month}`,
      ),
    enabled: enabled ?? !!data.activityId,
  }),
};
