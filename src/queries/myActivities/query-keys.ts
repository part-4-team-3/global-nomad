export const myActivitiesKeys = {
  getMyActivitiesByMonth: (activityId: number, year: string, month: string) => [
    'my-activities',
    activityId,
    'reservation-dashboard',
    year,
    month,
  ],
  getMyActivities: (cursorId: number | null, size: number) => ['my-activities', cursorId, size],
};
