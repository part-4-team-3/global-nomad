import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { format } from 'date-fns';
import Input from '@/components/atoms/input/Input';
import Image from 'next/image';

interface TimeSlot {
  date: string;
  startTime: string;
  endTime: string;
}

export default function ReservationTimePicker() {
  const [date, setDate] = useState(null);
  const [selectedDay, setSelectedDay] = useState<string>();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleCalendarOpen = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  const handleFormatDayClick = (day: Date) => {
    setSelectedDay(format(day, 'yy/MM/dd'));
  };

  console.log(startTime);
  return (
    <div className="relative flex place-items-end gap-[5px] md:h-[92px] lg:gap-[20px]">
      <div className="relative flex flex-col gap-[10px]">
        <label>날짜</label>
        <div className="date-picker-wrapper relative">
          <Input
            size="full"
            type="text"
            value={date ? format(date, 'yy/MM/dd') : ''}
            readOnly
            placeholder="YY/MM/DD"
          />
          <button
            className="top absolute right-[12px] top-[14px] size-[27px] md:right-[16px]"
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
      <div className="relative flex gap-[12px]">
        <div className="flex flex-col gap-[10px]">
          <label>시작 시간</label>
          <Input
            size="full"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        {/* 스타일 수정 중 */}
        {/* <div className="hidden gap-[12px] lg:flex">
          <span className="text-val-black h-[48px] text-20pxr font-bold">~</span>
        </div> */}
        <div className="flex flex-col gap-[10px]">
          <label>종료 시간</label>
          <Input
            size="full"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>
      <button className="relative bottom-[0px] size-[44px] md:size-[56px]">
        <Image fill src="/add-activity-button.svg" alt="체험시간 추가하기" />
      </button>
    </div>
  );
}
