import { apiInstance } from '@/lib/axios';
import { UseMutationOptions } from '@tanstack/react-query';
import { ActivitySettingData } from '@/types/activity';

interface activityData {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  subImages: [
    {
      imageUrl: string;
      id: number;
    },
  ];
  schedules: [
    {
      times: [
        {
          endTime: string;
          startTime: string;
          id: number;
        },
      ];
      date: string;
    },
  ];
}

const submit = async (body: ActivitySettingData) => {
  const res = await apiInstance.post<ActivitySettingData, activityData>('activities', body);
  return res;
};

export const submitMutationOptions: UseMutationOptions<activityData, Error, ActivitySettingData> = {
  mutationFn: submit,
  onError: (error: Error) => {
    alert('체험 등록에 실패했습니다. 다시 시도해주세요.');
  },
};
