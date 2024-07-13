import Image from 'next/image';
import Input from '@/components/atoms/input/Input';
import useTimeSlot from '@/models/activity/use-time-slot';
import { TimeSlotData } from '@/types/activity';

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
            <div className="relative flex h-40pxr flex-1 flex-col gap-[10px] md:h-56pxr">
              <Input size="full" type="text" value={slot.date} readOnly />
            </div>
            <div className="relative flex flex-1 items-center justify-center gap-[5px] lg:gap-[12px]">
              <Input size="full" type="time" value={slot.startTime} readOnly />
              <Input size="full" type="time" value={slot.endTime} readOnly />
            </div>
            <button
              className="relative size-[44px] md:size-[56px]"
              onClick={() => handleDeleteTimeSlot(index)}
              type="button"
            >
              <Image fill src="/delete-activity-button.svg" alt="체험시간 삭제하기" />
            </button>
          </div>
        ))}
    </div>
  );
}
