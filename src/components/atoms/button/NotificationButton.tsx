'use client';

import NotificationModal from '@/components/templates/header/NotificationModal';
import { useNotification } from '@/models/header/notification-context';
import { useGetMyNotifications } from '@/queries/my-notifications/get-my-notifications';
import { useModal } from '@/store/useModal';
import Image from 'next/image';
import { useEffect } from 'react';

const PAGE_SIZE = 4;

export default function NotificationButton() {
  const { isOpen, setIsOpen } = useModal();
  const { notificationData, setNotificationData } = useNotification();

  const {
    data: notificationResponse,
    isLoading,
    fetchNextPage,
  } = useGetMyNotifications({ size: PAGE_SIZE, cursorId: null });

  useEffect(() => {
    if (notificationResponse) {
      setNotificationData(notificationResponse.pages[0].data);
    }
  }, [notificationResponse, setNotificationData]);

  return (
    <>
      <button onClick={() => setIsOpen('notification')} className="relative">
        <Image src="/bell.svg" alt="알림" width={20} height={20} />
        <div className="absolute right-[-2px] top-[0px] size-10pxr rounded-[50%] bg-var-red-dark text-8pxr text-white">
          {notificationData?.totalCount}
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
