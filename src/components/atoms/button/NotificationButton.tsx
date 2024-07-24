'use client';

import NotificationModal from '@/components/templates/header/NotificationModal';
import { NotificationProvider, useNotification } from '@/models/header/notification-context';
import { useGetMyNotifications } from '@/queries/my-notifications/get-my-notifications';
import { useModal } from '@/store/useModal';
import Image from 'next/image';
import { useEffect } from 'react';

export default function NotificationButton() {
  const { isOpen, setIsOpen } = useModal();
  const { notificationData, setNotificationData } = useNotification();

  const notificationResponse = useGetMyNotifications();

  useEffect(() => {
    if (notificationResponse.data) {
      setNotificationData(notificationResponse.data);
    }
  }, [notificationResponse.data, setNotificationData]);

  return (
    <>
      <button onClick={() => setIsOpen('notification')} className="relative">
        <Image src="/bell.svg" alt="알림" width={20} height={20} />
        <div className="absolute right-[-2px] top-[0px] size-10pxr rounded-[50%] bg-var-red-dark text-8pxr text-white">
          {notificationData?.totalCount}
        </div>
      </button>
      {isOpen && <NotificationModal modalKey="notification" />}
    </>
  );
}
