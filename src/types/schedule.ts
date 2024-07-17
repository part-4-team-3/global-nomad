export type Schedule = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
};

export interface ReservedSchedule {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
}
