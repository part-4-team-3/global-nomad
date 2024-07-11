export const myActivitiesKeys = {
  getMyActivitiesByMonth: (activityId: number) => [
    'my-activities',
    activityId,
    'reservation-dashboard',
  ],
  getMyActivities: (cursorId: number | null, size: number) => ['my-activities', cursorId, size],
};
