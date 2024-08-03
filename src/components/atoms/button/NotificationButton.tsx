'use client';

import NotificationModal from '@/components/templates/header/NotificationModal';
import { useNotification } from '@/models/header/notification-context';
import { useGetMyNotifications } from '@/queries/my-notifications/get-my-notifications';
import { useModal } from '@/store/useModal';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const PAGE_SIZE = 5;

export default function NotificationButton() {
  const { isOpen, setIsOpen, setIsClose } = useModal();
  const { totalCount, setTotalCount, setNotificationList } = useNotification();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { data: notificationResponse, isLoading, fetchNextPage } = useGetMyNotifications(PAGE_SIZE);

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
      <button ref={buttonRef} onClick={handleClick} className="relative">
        <Image src="/bell.svg" alt="알림" width={20} height={20} />
        {!!totalCount && (
          <div className="absolute right-[-2px] top-[0px] size-10pxr rounded-[50%] bg-var-red-dark text-7pxr text-white">
            {totalCount > 9 ? '+9' : totalCount}
          </div>
        )}
      </button>
      {isOpen && (
        <NotificationModal
          modalKey="notification"
          isLoading={isLoading}
          fetchNextPage={fetchNextPage}
          buttonRef={buttonRef}
        />
      )}
    </>
  );
}
