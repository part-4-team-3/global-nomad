import NotificationCard from '@/components/molecules/card/NotificationCard';
import { useNotification } from '@/models/header/notification-context';
import { useObserverByScroll } from '@/models/useObserverByScroll';
import Image from 'next/image';
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

  if (!notificationList?.length)
    return (
      <div className="flex h-[calc(100vh-88px)] flex-col items-center justify-center gap-[10px] pb-[20px] md:h-fit">
        <Image src="/bell-nothing.svg" width={100} height={100} alt="알림 없음" />
        <p className="font-[500] text-var-gray9">아직 알림이 없습니다.</p>
      </div>
    );
  return (
    <ol className="flex h-[calc(100vh-88px)] flex-col gap-[8px] overflow-auto scrollbar-hide md:h-fit md:max-h-[calc(100vh-250px)]">
      {notificationList?.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
      <div className="h-1pxr" ref={divRef} />
    </ol>
  );
}
