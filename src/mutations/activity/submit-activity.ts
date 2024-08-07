import { getInstance } from '@/lib/axios';
import { UseMutationOptions } from '@tanstack/react-query';
import { ActivityEditData, ActivitySettingData } from '@/types/activity';

interface body {
  activityId: number;
  body: ActivityEditData;
}

interface ActivityData {
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
  const instance = getInstance();
  const response = await instance.post<ActivityData>('activities', body);
  return response.data;
};

const patch = async ({ activityId, body }: body) => {
  const instance = getInstance();
  const response = await instance.patch<ActivityData>(`my-activities/${activityId}`, body);
  return response.data;
};

export const submitMutationOptions: UseMutationOptions<ActivityData, Error, ActivitySettingData> = {
  mutationFn: submit,
};

export const patchMutationOptions: UseMutationOptions<ActivityData, Error, body> = {
  mutationFn: patch,
};
