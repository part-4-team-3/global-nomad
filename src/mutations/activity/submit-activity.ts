import { apiInstance, getInstance } from '@/lib/axios';
import { MutationFunction, UseMutationOptions, useMutation } from '@tanstack/react-query';
import { ActivityEditData, ActivitySettingData } from '@/types/activity';
import axios, { AxiosResponse } from 'axios';

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
  onError: (error: Error) => {
    alert('체험 등록에 실패했습니다. 다시 시도해주세요.');
  },
};

export const patchMutationOptions: UseMutationOptions<ActivityData, Error, body> = {
  mutationFn: patch,
  onError: (error: Error) => {
    alert('체험 수정에 실패했습니다. 다시 시도해주세요.');
  },
};
