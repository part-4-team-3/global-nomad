import NotificationCard from '@/components/molecules/card/NotificationCard';
import { useNotification } from '@/models/header/notification-context';

export default function NotificationList() {
  const { notificationData } = useNotification();

  if (!notificationData?.notifications.length) return <p>알림이 없습니다.</p>;
  return (
    <ol className="flex flex-col gap-[8px]">
      {notificationData?.notifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </ol>
  );
}
