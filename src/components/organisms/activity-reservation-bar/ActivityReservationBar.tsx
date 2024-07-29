'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@/components/atoms/button/Button';
import { ActivityReservationSelector } from '@/components/molecules/activity-reservation-selector/ActivityReservationSelector';
import { Schedule } from '@/types/schedule';
import { format } from 'date-fns';
import { ActivityParticipantSelector } from '@/components/molecules/activity-participant-selector/ActivityParticipantSelector';
import { useReservation } from '@/models/activity-reservation/use-reservation';
import PriceDisplay from '@/components/atoms/price-display/PriceDisplay';
import { ReservationFormProps } from '@/types/reservation-form-props';
import { toast } from 'react-toastify';
import postReservation from '@/queries/reservations/post-reservation';

export default function ActivityReservationBar({
  price,
  scheduleHash,
  scheduledDates,
  activityId,
}: ReservationFormProps) {
  const [isScheduleSelectorOpen, setIsScheduleSelectorOpen] = useState<boolean>(false);
  const [isParticipantSelectorOpen, setIsParticipantSelectorOpen] = useState<boolean>(false);
  const { selectedSchedule, setSelectedSchedule, participants, setParticipants } = useReservation();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      selectedSchedule: selectedSchedule,
      participants: participants,
    },
  });

  const handleReservation = async (data: {
    selectedSchedule: Schedule | undefined;
    participants: number;
  }) => {
    const { selectedSchedule, participants } = data;
    const res = await postReservation(activityId, selectedSchedule?.id, participants);
    if (res < 0) {
      toast('예약에 실패했습니다');
      return;
    }
    toast('예약에 성공했습니다');
    setSelectedSchedule(undefined);
    setParticipants(1);
  };

  const dateButtonText = selectedSchedule
    ? `${format(selectedSchedule.date, 'yy/MM/dd')} ${selectedSchedule.startTime} ~ ${selectedSchedule.endTime}`
    : '날짜 선택하기';

  return (
    <div className="fixed bottom-[0px] left-[0px] right-[0px] z-10 w-screen border-t border-[#a1a1a1] bg-white p-[16px] md:hidden lg:hidden">
      <form onSubmit={handleSubmit(handleReservation)} className="flex w-full justify-between">
        <div className="flex flex-col gap-[8px]">
          <div className="flex gap-6pxr font-[500]">
            <PriceDisplay price={price * participants} />
            <span className="text-20pxr font-[600]">/</span>
            <button
              type="button"
              className="text-18pxr text-var-green-dark underline"
              onClick={() => setIsParticipantSelectorOpen(true)}
            >
              {participants}명
            </button>
          </div>
          <button
            type="button"
            className="w-fit text-14pxr font-[600] text-var-green-dark underline"
            onClick={() => setIsScheduleSelectorOpen(true)}
          >
            {dateButtonText}
          </button>
        </div>

        <Button
          text="예약하기"
          color="black"
          className="px-24pxr py-14pxr disabled:bg-var-gray3"
          disabled={!selectedSchedule}
        ></Button>

        {isScheduleSelectorOpen && (
          <ActivityReservationSelector
            scheduleHash={scheduleHash}
            scheduledDates={scheduledDates}
            onClose={() => setIsScheduleSelectorOpen(false)}
            onSelect={(schedule: Schedule | undefined) => {
              setValue('selectedSchedule', schedule);
              setSelectedSchedule(schedule);
            }}
          />
        )}

        {isParticipantSelectorOpen && (
          <ActivityParticipantSelector
            initialValue={participants}
            onClose={() => setIsParticipantSelectorOpen(false)}
            onSelect={(value) => {
              setValue('participants', value);
              setParticipants(value);
            }}
          />
        )}
      </form>
    </div>
  );
}
