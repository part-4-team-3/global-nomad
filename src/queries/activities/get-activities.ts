import { apiInstance } from '@/lib/axios';
import { UseQueryOptions } from '@tanstack/react-query';
import { Activity } from '@/types/activity';

interface GetActivitiesResponse {
  activities: Activity[];
  totalCount: number;
}

const getActivities = async () => {
  const data = await apiInstance.get<any, GetActivitiesResponse>('/activities?method=offset');
  return data;
};

export const getActivitiesQueryOptions: UseQueryOptions<GetActivitiesResponse, Error> = {
  queryKey: ['activities'],
  queryFn: getActivities,
};
