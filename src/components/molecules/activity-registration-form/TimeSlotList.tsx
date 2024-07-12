import Image from 'next/image';
import Input from '@/components/atoms/input/Input';
import useTimeSlot from '@/models/activity/use-time-slot';

interface TimeSlotData {
  date: string;
  startTime: string;
  endTime: string;
}

interface Props {
  timeSlots: TimeSlotData[];
  handleDeleteTimeSlot: (index: number) => void;
}

export default function TimeSlotList({ timeSlots, handleDeleteTimeSlot }: Props) {
  return (
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
  );
}
