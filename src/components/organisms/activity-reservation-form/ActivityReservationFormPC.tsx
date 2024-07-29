'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@/components/atoms/button/Button';
import ParticipantCounter from '@/components/molecules/participant-counter/ParticipantCounter';
import PriceDisplay from '@/components/atoms/price-display/PriceDisplay';
import { useReservation } from '@/models/activity-reservation/use-reservation';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import ScheduleButton from '@/components/atoms/schedule-button/ScheduleButton';
import postReservation from '@/queries/reservations/post-reservation';
import { ReservationFormProps } from '@/types/reservation-form-props';
import { toast } from 'react-toastify';
import { Schedule } from '@/types/schedule';

export default function ActivityReservationFormPC({
  price,
  scheduleHash,
  scheduledDates,
  activityId,
}: ReservationFormProps) {
  const { setSelectedSchedule, participants, setParticipants, selectedSchedule } = useReservation();
  const [date, setDate] = useState<Date | undefined>(undefined);

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

  const handleScheduleSelect = (schedule: Schedule) => {
    const newSchedule = schedule;
    setSelectedSchedule(newSchedule);
    setValue('selectedSchedule', newSchedule);
  };

  const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';
  const message = date ? '해당 날짜에 가능한 스케줄이 없습니다' : '날짜를 선택해주세요';

  return (
    <div className="h-fit">
      <div className="hidden h-fit w-384pxr shrink-0 flex-col rounded-[8px] border border-var-gray6 shadow md:hidden lg:flex">
        <div className="flex items-center gap-[4px] p-[24px] pb-[16px]">
          <PriceDisplay price={price} fontSize={24} />
          <span className="text-var-gray1">/ 인</span>
        </div>

        <form
          onSubmit={handleSubmit(handleReservation)}
          className="flex flex-col gap-[16px] border-b border-t border-var-gray6 px-[24px] pb-[24px] pt-[16px]"
        >
          <div className="flex flex-col gap-[8px]">
            <span className="text-20pxr font-[700]">날짜</span>
          </div>

          <div className="flex justify-center">
            <Calendar
              mode="single"
              scheduled={scheduledDates}
              selected={date}
              onSelect={setDate}
              className="w-fit rounded-md border shadow"
            />
          </div>

          <p className="text-18pxr font-[700]">예약 가능한 시간</p>
          {formattedDate && scheduleHash[formattedDate] ? (
            <div className="flex flex-wrap gap-12pxr">
              {scheduleHash[formattedDate].map((schedule) => (
                <ScheduleButton
                  key={schedule.id}
                  isSelected={selectedSchedule?.id === schedule.id}
                  onClick={() => {
                    handleScheduleSelect({ ...schedule, date: formattedDate });
                    console.log(selectedSchedule);
                  }}
                >
                  {schedule.startTime}~{schedule.endTime}
                </ScheduleButton>
              ))}
            </div>
          ) : (
            <p className="h-46pxr w-full text-center">{message}</p>
          )}

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
      </div>
    </div>
  );
}
