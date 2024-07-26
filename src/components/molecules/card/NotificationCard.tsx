'use client';

import { isWordAtPositionFromEnd, splitStringByPositionFromEnd } from '@/lib/find-word';
import { formatDateAgo } from '@/lib/formatDate';
import { useNotification } from '@/models/header/notification-context';
import { useDeleteNotification } from '@/queries/my-notifications/delete-notification';
import { Notification } from '@/types/notification';
import Image from 'next/image';

interface Props {
  notification: Notification;
}

export default function NotificationCard({ notification }: Props) {
  const { totalCount, setTotalCount, notificationList, setNotificationList } = useNotification();

  const isApprove = isWordAtPositionFromEnd(notification.content, 7, '승인');
  const content = splitStringByPositionFromEnd(notification.content, 7, 2);

  const { mutate } = useDeleteNotification();

  const handleDelete = async () => {
    if (notificationList && totalCount) {
      setTotalCount(totalCount - 1);
      setNotificationList(notificationList.filter((item) => item.id !== notification.id));
    }
    mutate(notification.id);
  };

  return (
    <div className="relative rounded-[5px] border border-var-gray5 bg-white px-[12px] pb-[16px] pt-[20px]">
      <button onClick={handleDelete} className="absolute right-[12px] top-[16px]">
        <Image src="close-gray.svg" alt="X" width={24} height={24} />
      </button>
      <div>
        <div
          className={`size-5pxr rounded-[50%] ${isApprove ? 'bg-var-blue' : 'bg-var-red-dark'}`}
        />
        <p className="mt-[15px] break-keep text-14pxr leading-[157%]">
          {content[0]}{' '}
          <span className={isApprove ? 'text-var-blue' : 'text-var-red-dark'}>{content[1]}</span>
          {content[2]}
        </p>
        <time className="mt-[4px] text-12pxr text-var-gray3">
          {formatDateAgo(notification.updatedAt)}
        </time>
      </div>
    </div>
  );
}
