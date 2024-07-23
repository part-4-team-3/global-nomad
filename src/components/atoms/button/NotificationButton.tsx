'use client';

import NotificationModal from '@/components/templates/header/NotificationModal';
import {
  GetMyNotificationsResponse,
  getMyNotifications,
} from '@/queries/my-notifications/get-my-notifications';
import { useModal } from '@/store/useModal';
import Image from 'next/image';

interface Props {
  notificationData: GetMyNotificationsResponse;
}

export default function NotificationButton({ notificationData }: Props) {
  const { isOpen, setIsOpen } = useModal();

  return (
    <>
      <button onClick={() => setIsOpen('notification')}>
        <Image src="/bell.svg" alt="알림" width={20} height={20} />
      </button>
      {isOpen && <NotificationModal modalKey="notification" notificationData={notificationData} />}
    </>
  );
}
