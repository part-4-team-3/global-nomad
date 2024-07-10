import { Schedule } from '@/types/schedule';

type ScheduleHashMap = {
  [key: string]: { startTime: string; endTime: string; id: number }[];
};

export function createScheduleHashMap(schedules: Schedule[]): ScheduleHashMap {
  return schedules.reduce((acc: ScheduleHashMap, schedule: Schedule) => {
    const { date, startTime, endTime, id } = schedule;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push({ startTime, endTime, id });
    return acc;
  }, {});
}
