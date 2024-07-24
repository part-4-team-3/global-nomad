export const notificationsKeys = {
  getMyNotifications: (cursorId: number | null, size: number) => [
    'my-notifications',
    cursorId,
    size,
  ],
};
