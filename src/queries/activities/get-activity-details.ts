import { apiInstance } from '@/lib/axios';
import { Schedule } from '@/types/schedule';

interface GetActivityDetailsResponse {
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
}

export const getActivityDetails = async (id: number) => {
  const data = await apiInstance.get(`/activities/${id}`);
  return data;
};
