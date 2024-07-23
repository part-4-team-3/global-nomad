import NotificationCard from '@/components/molecules/card/NotificationCard';
import { Notification } from '@/types/notification';

interface Props {
  notificationList: Notification[];
}

export default function NotificationList({ notificationList }: Props) {
  if (!notificationList) return <p>알림이 없습니다.</p>;
  return (
    <ol className="flex flex-col gap-[8px]">
      {notificationList.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </ol>
  );
}
