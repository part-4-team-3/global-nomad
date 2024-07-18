export interface Activity {
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
}

export type ActivityMethod = 'offset' | 'cursor';
export type ActivityCategory = '문화 · 예술' | '식음료' | '스포츠' | '투어' | '관광' | '웰빙';
export type ActivitySort = 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest';

export interface ActivityResponse {
  activities: Activity[];
  totalCount: number;
}

export interface MyActivitiesOfMonth {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

export interface MyActivityList {
  cursorId: number;
  totalCount: number;
  activities: Activity[];
}

export interface TimeSlotData {
  date: string;
  startTime: string;
  endTime: string;
}
export interface ActivitySettingData {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: TimeSlotData[];
  subImageUrls: string[];
  bannerImageUrl: string;
}
