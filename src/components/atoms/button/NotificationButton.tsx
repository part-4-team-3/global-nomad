'use client';

import NotificationModal from '@/components/templates/header/NotificationModal';
import { useNotification } from '@/models/header/notification-context';
import { useGetMyNotifications } from '@/queries/my-notifications/get-my-notifications';
import { useModal } from '@/store/useModal';
import Image from 'next/image';
import { useEffect } from 'react';

const PAGE_SIZE = 5;

export default function NotificationButton() {
  const { isOpen, setIsOpen, setIsClose } = useModal();
  const { totalCount, setTotalCount, setNotificationList } = useNotification();

  const {
    data: notificationResponse,
    isLoading,
    fetchNextPage,
  } = useGetMyNotifications({ size: PAGE_SIZE, cursorId: null });

  const handleClick = () => {
    if (isOpen) {
      setIsClose();
    } else {
      setIsOpen('notification');
    }
  };

  useEffect(() => {
    if (notificationResponse) {
      setNotificationList(notificationResponse.pages.flatMap((page) => page.data.notifications));
      setTotalCount(notificationResponse.pages[0].data.totalCount);
    }
  }, [notificationResponse, setNotificationList, setTotalCount]);

  return (
    <>
      <button onClick={handleClick} className="relative">
        <Image src="/bell.svg" alt="알림" width={20} height={20} />
        <div className="absolute right-[-2px] top-[0px] size-10pxr rounded-[50%] bg-var-red-dark text-8pxr text-white">
          {totalCount}
        </div>
      </button>
      {isOpen && (
        <NotificationModal
          modalKey="notification"
          isLoading={isLoading}
          fetchNextPage={fetchNextPage}
        />
      )}
    </>
  );
}
