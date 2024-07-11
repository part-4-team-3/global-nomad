import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { format } from 'date-fns';
import Input from '@/components/atoms/input/Input';
import Image from 'next/image';

interface TimeSlotData {
  date: string;
  startTime: string;
  endTime: string;
}

export default function ReservationTimePicker() {
  const [date, setDate] = useState<string>();
  const [selectedDay, setSelectedDay] = useState<Date>();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timeSlots, setTimeSlots] = useState<TimeSlotData[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleCalendarOpen = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  const handleFormatDayClick = (day: Date) => {
    setSelectedDay(day);
    setDate(format(day, 'yy/MM/dd'));
  };

  const handleAddTimeSlot = () => {
    if (date && startTime && endTime) {
      const newTimeSlot = { date, startTime, endTime };
      setTimeSlots((prevSlots) => [...prevSlots, newTimeSlot]);
      setDate('');
      setSelectedDay(undefined);
      setStartTime('');
      setEndTime('');
      setIsCalendarOpen(false);
    } else {
      alert('모든 필드를 채워주세요.');
    }
  };

  /** 이미지 삭제 처리 */
  const handleDeleteTimeSlot = (index: number) => {
    setTimeSlots((prev) => prev.filter((_, idx) => idx !== index));
  };
  console.log(timeSlots);

  return (
    <div>
      <div className="relative flex place-items-end gap-[5px] border-b pb-[16px] md:h-[92px] lg:gap-[20px] lg:pb-[20px]">
        <div className="relative flex flex-col gap-[10px]">
          <label>날짜</label>
          <div className="relative h-40pxr md:h-56pxr">
            <Input size="full" type="text" value={date} readOnly placeholder="YY/MM/DD" />
            <button
              className="top absolute bottom-[16px] right-[12px] size-[27px] md:right-[16px]"
              onClick={handleCalendarOpen}
            >
              <Image fill src="/calendar.png" alt="날짜 설정" />
            </button>
          </div>
          {isCalendarOpen && (
            <div className="absolute top-[0px] top-full z-10 bg-white">
              <Calendar selected={selectedDay} onDayClick={(day) => handleFormatDayClick(day)} />
            </div>
          )}
        </div>
        {/* 시작시간 / 종료시간 컴포넌트 분리예정 */}
        <div className="relative flex items-center justify-center gap-[5px] lg:gap-[12px]">
          <div className="flex flex-col gap-[10px]">
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
          <div className="flex flex-col gap-[10px]">
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
      <div className="flex flex-col gap-[8px] pt-[16px] md:gap-[16px] lg:gap-[20px] lg:pt-[20px]">
        {timeSlots &&
          timeSlots.map((slot, index) => (
            <div key={index} className="relative flex place-items-start gap-[5px] lg:gap-[20px]">
              <div className="h-40pxr md:h-56pxr">
                <Input size="full" type="text" value={slot.date} readOnly />
              </div>
              <div>
                <div className="flex gap-[5px] lg:gap-[20px]">
                  <Input size="full" type="time" value={slot.startTime} readOnly />
                  <Input size="full" type="time" value={slot.endTime} readOnly />
                </div>
              </div>
              <button
                className="relative size-[44px] md:size-[56px]"
                onClick={() => handleDeleteTimeSlot(index)}
              >
                <Image fill src="/delete-activity-button.svg" alt="체험시간 삭제하기" />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
