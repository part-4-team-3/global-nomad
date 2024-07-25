import { GetMyNotificationsResponse } from '@/queries/my-notifications/get-my-notifications';
import { NotificationsData } from '@/types/notification';
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

interface NotificationContextValue {
  notificationData: NotificationsData | undefined;
  setNotificationData: Dispatch<SetStateAction<NotificationsData | undefined>>;
}

const NotificationContext = createContext<NotificationContextValue>({
  notificationData: undefined,
  setNotificationData: () => {},
});

interface Props {
  children: ReactNode;
}

export function NotificationProvider({ children }: Props) {
  const [notificationData, setNotificationData] = useState<NotificationsData | undefined>(
    undefined,
  );

  return (
    <NotificationContext.Provider value={{ notificationData, setNotificationData }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const { notificationData, setNotificationData } = useContext(NotificationContext);

  return { notificationData, setNotificationData };
}
