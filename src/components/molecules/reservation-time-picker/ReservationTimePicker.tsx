import { Calendar } from '@/components/ui/calendar';
import Input from '@/components/atoms/input/Input';
import Image from 'next/image';
import useTimeSlot from '@/models/activity/use-time-slot';
import TimeSlotList from '../activity-registration-form/TimeSlotList';

export default function ReservationTimePicker() {
  const {
    selectedDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    timeSlots,
    isCalendarOpen,
    handleCalendarOpen,
    handleFormatDayClick,
    handleAddTimeSlot,
    handleDeleteTimeSlot,
  } = useTimeSlot();

  return (
    <div>
      <div className="relative flex place-items-end gap-[5px] border-b pb-[16px] md:h-[92px] lg:gap-[20px] lg:pb-[20px]">
        <div className="relative flex flex-1 flex-col gap-[10px]">
          <label>날짜</label>
          <div className="relative h-40pxr md:h-56pxr">
            <Input size="full" type="text" value={selectedDay} readOnly placeholder="YY/MM/DD" />
            <button
              className="top absolute bottom-[16px] right-[12px] size-[27px] md:right-[16px]"
              onClick={handleCalendarOpen}
            >
              <Image fill src="/calendar.png" alt="날짜 설정" />
            </button>
          </div>
          {isCalendarOpen && (
            <div className="absolute top-[0px] top-full z-10 bg-white">
              <Calendar onDayClick={(day) => handleFormatDayClick(day)} />
            </div>
          )}
        </div>
        {/* 시작시간 / 종료시간 컴포넌트 분리예정 */}
        <div className="relative flex flex-1 items-center justify-center gap-[5px] lg:gap-[12px]">
          <div className="flex flex-1 flex-col gap-[10px]">
            <label>시작 시간</label>
            <div className="h-40pxr md:h-56pxr">
              <Input
                size="full"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-[10px]">
            <label>종료 시간</label>
            <div className="h-40pxr md:h-56pxr">
              <Input
                size="full"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          className="relative bottom-[0px] size-[44px] md:size-[56px]"
          onClick={handleAddTimeSlot}
        >
          <Image fill src="/add-activity-button.svg" alt="체험시간 추가하기" />
        </button>
      </div>
      <TimeSlotList timeSlots={timeSlots} handleDeleteTimeSlot={handleDeleteTimeSlot} />
    </div>
  );
}
