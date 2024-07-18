import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Schedule } from '@/types/schedule';

interface ReservationContextType {
  selectedSchedule: Schedule | undefined;
  setSelectedSchedule: (schedule: Schedule | undefined) => void;
  participants: number;
  setParticipants: (count: number) => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

const ReservationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | undefined>();
  const [participants, setParticipants] = useState<number>(1);

  return (
    <ReservationContext.Provider
      value={{ selectedSchedule, setSelectedSchedule, participants, setParticipants }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

const useReservation = () => {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
};

export { ReservationProvider, useReservation };
