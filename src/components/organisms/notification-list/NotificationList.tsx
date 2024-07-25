import NotificationCard from '@/components/molecules/card/NotificationCard';
import { useNotification } from '@/models/header/notification-context';
import { useObserverByScroll } from '@/models/useObserverByScroll';
import { useEffect, useRef, useState } from 'react';

interface Props {
  isLoading: boolean;
  fetchNextPage: () => void;
}

export default function NotificationList({ isLoading, fetchNextPage }: Props) {
  const { notificationData } = useNotification();
  const divRef = useRef<HTMLDivElement | null>(null);
  const [observeRef, setObserveRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (divRef) {
      setObserveRef(divRef.current);
    }
  }, []);

  useObserverByScroll({
    isLoading,
    ref: observeRef,
    fetchNextPage,
  });

  if (!notificationData?.notifications.length) return <p>알림이 없습니다.</p>;
  return (
    <ol className="flex flex-col gap-[8px]">
      {notificationData?.notifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
      <div className="h-1pxr" ref={divRef} />
    </ol>
  );
}
