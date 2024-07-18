import { ScheduleHashMap } from '@/models/activity-reservation/create-schedule-hash-map';

export interface ReservationFormProps {
  price: number;
  scheduledDates: Date[];
  scheduleHash: ScheduleHashMap;
  activityId: number;
}
