import { GetMyNotificationsResponse } from '@/queries/my-notifications/get-my-notifications';
import { Notification, NotificationsData } from '@/types/notification';
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

interface NotificationContextValue {
  totalCount: number | undefined;
  setTotalCount: Dispatch<SetStateAction<number | undefined>>;
  notificationList: Notification[] | undefined;
  setNotificationList: Dispatch<SetStateAction<Notification[] | undefined>>;
}

const NotificationContext = createContext<NotificationContextValue>({
  totalCount: undefined,
  setTotalCount: () => {},
  notificationList: undefined,
  setNotificationList: () => {},
});

interface Props {
  children: ReactNode;
}

export function NotificationProvider({ children }: Props) {
  const [notificationList, setNotificationList] = useState<Notification[] | undefined>(undefined);
  const [totalCount, setTotalCount] = useState<number | undefined>(undefined);

  return (
    <NotificationContext.Provider
      value={{ totalCount, setTotalCount, notificationList, setNotificationList }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const { totalCount, setTotalCount, notificationList, setNotificationList } =
    useContext(NotificationContext);

  return { totalCount, setTotalCount, notificationList, setNotificationList };
}
