import NotificationCard from '@/components/molecules/card/NotificationCard';
import { useNotification } from '@/models/header/notification-context';
import { useObserverByScroll } from '@/models/useObserverByScroll';
import { useEffect, useRef, useState } from 'react';

interface Props {
  isLoading: boolean;
  fetchNextPage: () => void;
}

export default function NotificationList({ isLoading, fetchNextPage }: Props) {
  const { notificationList } = useNotification();
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

  if (!notificationList?.length) return <p>알림이 없습니다.</p>;
  return (
    <ol className="flex max-h-[50vh] flex-col gap-[8px] overflow-auto">
      {notificationList?.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
      <div className="h-1pxr" ref={divRef} />
    </ol>
  );
}
