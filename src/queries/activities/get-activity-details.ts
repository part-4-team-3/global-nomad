import { getInstance } from '@/lib/axios';
import { Schedule } from '@/types/schedule';
import { redirect } from 'next/navigation';

interface GetActivityDetailsResponse {
  statusCode: number;
  data: {
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
    subImages: {
      id: number;
      imageUrl: string;
    }[];
    schedules: Schedule[];
  };
}

export const getActivityDetails = async (id: number) => {
  const apiInstance = getInstance();
  let res;
  try {
    res = await apiInstance.get<any, GetActivityDetailsResponse>(`activities/${id}`);
  } catch (err) {
    redirect('/');
  }

  return res.data;
};
