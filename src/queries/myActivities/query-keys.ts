export const myActivitiesKeys = {
  getMyActivitiesByMonth: (activityId: number, year: string, month: string) => [
    'my-activities',
    activityId,
    'reservation-dashboard',
    year,
    month,
  ],
  getMyActivities: (cursorId: number | null, size: number) => ['my-activities', cursorId, size],
  getMyScheduleByDate: (activityId: number, date: string) => ['my-activities', activityId, date],
  getMyReservationByDate: (
    activityId: number,
    cursorId: number | null,
    size: number,
    scheduleId: number | null,
    status: string,
  ) => ['my-activities', activityId, cursorId, size, scheduleId, status, 'reservations'],
  getMyActivitiesAll: () => ['my-activities'],
};
