import { getInstance } from '@/lib/axios';
import { Activity, ActivityCategory, ActivityMethod, ActivitySort } from '@/types/activity';

interface GetActivitiesResponse {
  activities: Activity[];
  totalCount: number;
}

interface GetActivitiesParams {
  method: ActivityMethod;
  cursorId?: number;
  category?: ActivityCategory;
  keyword?: string;
  sort?: ActivitySort;
  page?: number;
  size?: number;
}
/**
 * @param method: 'offset' | 'cursor';
 * @param cursorId?: number;
 * @param category?: '문화 · 예술' | '식음료' | '스포츠' | '투어' | '관광' | '웰빙';
 * @param keyword?: string;
 * @param sort?: 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest';
 * @param page?: number;
 * @param size?: number;
 */
export const getActivities = async (params: GetActivitiesParams) => {
  const queryParams = Object.entries(params)
    .map(([key, value]) => {
      if (!value) return;
      return `${key}=${value}`;
    })
    .join('&');

  const apiInstance = getInstance();
  const data = await apiInstance.get<GetActivitiesResponse>(`activities?${queryParams}`);
  return data.data;
};
