import { Calendar } from '@/components/ui/calendar';
import Input from '@/components/atoms/input/Input';
import Image from 'next/image';
import useTimeSlot from '@/models/activity/use-time-slot';
import TimeSlotList from '../activity-registration-form/TimeSlotList';
import { TimeSlotData } from '@/types/activity';
import TimeSlotInput from '@/components/atoms/input/TimeSlotInput';
import Select from '../select/Select';

interface Props {
  selectedDay: string;
  startTime: string;
  endTime: string;
  timeSlots: TimeSlotData[];
  isCalendarOpen: boolean;
  handleFormatDayClick: (day: Date) => void;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
  handleCalendarOpen: () => void;
  handleAddTimeSlot: () => void;
  handleDeleteTimeSlot: (index: number) => void;
}

export default function ReservationTimePicker({
  selectedDay,
  startTime,
  endTime,
  timeSlots,
  isCalendarOpen,
  handleFormatDayClick,
  setStartTime,
  setEndTime,
  handleCalendarOpen,
  handleAddTimeSlot,
  handleDeleteTimeSlot,
}: Props) {
  const options = Array.from({ length: 24 }, (_, hour) => `${hour.toString().padStart(2, '0')}:00`);

  return (
    <div>
      <div className="relative flex place-items-end gap-[5px] border-b pb-[16px] md:h-[92px] lg:gap-[20px] lg:pb-[20px]">
        <div className="relative flex flex-1 flex-col gap-[10px]">
          <label>날짜</label>
          <div className="relative min-w-132pxr">
            <TimeSlotInput type="text" value={selectedDay} readOnly={true} placeholder="YY/MM/DD" />
            <button
              className="absolute bottom-[8px] right-[12px] size-27pxr md:bottom-[16px] md:right-[16px]"
              onClick={handleCalendarOpen}
              type="button"
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
          <div className="flex max-w-80pxr flex-1 flex-col gap-[10px] md:min-w-104pxr md:max-w-none lg:min-w-140pxr">
            <label>시작 시간</label>
            <TimeSlotInput
              type="time"
              value={startTime}
              readOnly={false}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="flex max-w-80pxr flex-1 flex-col gap-[10px] md:min-w-104pxr md:max-w-none lg:min-w-140pxr">
            <label>종료 시간</label>
            <TimeSlotInput
              type="time"
              value={endTime}
              readOnly={false}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
        <button
          className="relative bottom-[0px] size-[44px] md:size-[56px]"
          onClick={handleAddTimeSlot}
          type="button"
        >
          <Image fill src="/add-activity-button.svg" alt="체험시간 추가하기" />
        </button>
      </div>
      <TimeSlotList timeSlots={timeSlots} handleDeleteTimeSlot={handleDeleteTimeSlot} />
    </div>
  );
}
