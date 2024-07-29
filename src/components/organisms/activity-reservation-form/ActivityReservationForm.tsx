'use client';
import { useReservation } from '@/models/activity-reservation/use-reservation';
import { ActivityReservationSelector } from '@/components/molecules/activity-reservation-selector/ActivityReservationSelector';
import { Schedule } from '@/types/schedule';
import Button from '@/components/atoms/button/Button';
import { format } from 'date-fns';
import { useState } from 'react';
import postReservation from '@/queries/reservations/post-reservation';
import PriceDisplay from '@/components/atoms/price-display/PriceDisplay';
import ParticipantCounter from '@/components/molecules/participant-counter/ParticipantCounter';
import { ReservationFormProps } from '@/types/reservation-form-props';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';

// Define validation rules
const validateParticipants = (value: number) => value >= 1 || 'Participants must be at least 1';

export default function ActivityReservationForm({
  price,
  scheduleHash,
  scheduledDates,
  activityId,
}: ReservationFormProps) {
  const [isScheduleSelectorOpen, setIsScheduleSelectorOpen] = useState<boolean>(false);
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
    <div className="h-fit">
      <div className="relative hidden h-fit w-250pxr shrink-0 flex-col rounded-[8px] border border-var-gray6 md:flex lg:hidden">
        <div className="flex items-center gap-[4px] p-[24px] pb-[16px]">
          <PriceDisplay price={price} fontSize={24} />
          <span className="text-var-gray1">/ 인</span>
        </div>

        <form
          onSubmit={handleSubmit(handleReservation)}
          className="flex flex-col gap-[32px] border-b border-t border-var-gray6 px-[24px] pb-[24px] pt-[16px]"
        >
          <div className="flex flex-col gap-[8px]">
            <span className="text-20pxr font-[700]">날짜</span>
            <button
              type="button"
              className="w-fit text-14pxr font-[600] text-var-green-dark underline"
              onClick={() => setIsScheduleSelectorOpen(true)}
            >
              {dateButtonText}
            </button>
            {errors.selectedSchedule && (
              <p className="text-red-500">{errors.selectedSchedule.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-[8px]">
            <span className="text-20pxr font-[700]">참여 인원 수</span>
            <Controller
              name="participants"
              control={control}
              rules={{ validate: (value) => value >= 1 || 'Participants must be at least 1' }}
              render={({ field }) => (
                <ParticipantCounter
                  value={participants}
                  onChange={(value: number) => {
                    setValue('participants', value);
                    setParticipants(value);
                  }}
                />
              )}
            />
            {errors.participants && <p className="text-red-500">{errors.participants.message}</p>}
          </div>

          <Button
            text="예약하기"
            color="black"
            className="rounded-[4px] px-24pxr py-14pxr disabled:bg-var-gray3"
            disabled={!selectedSchedule}
          ></Button>
        </form>

        <div className="flex justify-between p-[24px]">
          <span className="text-20pxr font-[700]">총 합계</span>
          <PriceDisplay price={participants * price} />
        </div>

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
      </div>
    </div>
  );
}
