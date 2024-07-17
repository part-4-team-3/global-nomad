import { getInstance } from '@/lib/axios';
import { Activity } from '@/types/activity';

interface GetActivitiesResponse {
  activities: Activity[];
  totalCount: number;
}

interface GetActivitiesParams {
  method: 'offset' | 'cursor';
  cursorId?: number;
  category?: '문화 · 예술' | '식음료' | '스포츠' | '투어' | '관광' | '웰빙';
  keyword?: string;
  sort?: 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest';
  page?: number;
  size?: number;
}

export const getActivities = async (params: GetActivitiesParams) => {
  const queryParams = Object.entries(params)
    .map(([key, value]) => {
      return `${key}=${value}`;
    })
    .join('&');

  const apiInstance = getInstance();
  const data = await apiInstance.get<GetActivitiesResponse>(`activities?${queryParams}`);
  return data.data;
};
