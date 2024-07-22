'use client';

import { ScheduleHashMap } from '@/models/activity-reservation/create-schedule-hash-map';
import Button from '@/components/atoms/button/Button';
import ParticipantCounter from '@/components/molecules/participant-counter/ParticipantCounter';
import PriceDisplay from '@/components/atoms/price-display/PriceDisplay';
import { useState } from 'react';
import { useReservation } from '@/models/activity-reservation/use-reservation';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import ScheduleButton from '@/components/atoms/schedule-button/ScheduleButton';
import postReservation from '@/queries/reservations/post-reservation';
import { ReservationFormProps } from '@/types/reservation-form-props';
import { toast } from 'react-toastify';

export default function ActivityReservationFormPC({
  price,
  scheduleHash,
  scheduledDates,
  activityId,
}: ReservationFormProps) {
  const { selectedSchedule, setSelectedSchedule, participants, setParticipants } = useReservation();
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleReservation = async (
    activityId: number,
    selectedScheduleId: number | undefined,
    participants: number,
  ) => {
    const res = await postReservation(activityId, selectedScheduleId, participants);
    if (res < 0) {
      toast('예약에 실패했습니다');
      return;
    }

    toast('예약에 성공했습니다');
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
        <div className="flex flex-col gap-[16px] border-b border-t border-var-gray6 px-[24px] pb-[24px] pt-[16px]">
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
          {formattedDate != '' && scheduleHash[formattedDate] ? (
            <div className="flex gap-12pxr">
              {scheduleHash[formattedDate].map((schedule) => (
                <ScheduleButton
                  key={schedule.id}
                  onClick={() => setSelectedSchedule({ ...schedule, date: formattedDate })}
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
            <ParticipantCounter
              value={participants}
              onChange={(diff: number) => setParticipants(participants + diff)}
            />
          </div>

          <Button
            text="예약하기"
            color="black"
            className="rounded-[4px] px-24pxr py-14pxr disabled:bg-var-gray3"
            disabled={!selectedSchedule}
            onClick={() => {
              handleReservation(activityId, selectedSchedule?.id, participants);
            }}
          ></Button>
        </div>
        <div className="flex justify-between p-[24px]">
          <span className="text-20pxr font-[700]">총 합계</span>
          <PriceDisplay price={participants * price} />
        </div>
      </div>
    </div>
  );
}
