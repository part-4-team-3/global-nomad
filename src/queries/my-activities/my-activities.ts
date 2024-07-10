import { UseQueryOptions } from '@tanstack/react-query';
import { myActivitiesKeies } from './my-acivities-keies';
import { apiInstance } from '@/lib/axios';
import { MyActivitiesOfMonth } from '@/types/activity';

export const myActivities = {
  queryOptions: (
    data: { activityId: number; year: string; month: string },
    enabled?: boolean,
  ): UseQueryOptions<MyActivitiesOfMonth, Error> => ({
    queryKey: myActivitiesKeies.getMyActivitiesOfMonth(data.activityId),

    queryFn: (): Promise<MyActivitiesOfMonth> =>
      apiInstance.get<any, MyActivitiesOfMonth>(
        `my-activities/${data.activityId}/reservation-dashboard?year=${data.year}&month=${data.month}`,
      ),

    enabled: enabled ?? !!data.activityId,
  }),
};
