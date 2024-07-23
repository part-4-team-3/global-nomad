export interface Notification {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
