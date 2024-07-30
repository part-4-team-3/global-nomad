import Image from 'next/image';
import { TimeSlotData } from '@/types/activity';
import TimeSlotInput from '@/components/atoms/input/TimeSlotInput';

interface Props {
  timeSlots: TimeSlotData[];
  handleDeleteTimeSlot: (date: string, startTime: string, endTime: string) => void;
}

export default function TimeSlotList({ timeSlots, handleDeleteTimeSlot }: Props) {
  return (
    <div className="flex flex-col gap-[8px] pt-[16px] md:gap-[16px] lg:gap-[20px] lg:pt-[20px]">
      {timeSlots &&
        timeSlots.map((slot, index) => (
          <div key={index} className="relative flex place-items-start gap-[5px] lg:gap-[20px]">
            <div className="relative flex h-40pxr min-w-132pxr flex-1">
              <TimeSlotInput type="text" value={slot.date} readOnly={true} />
            </div>
            <div className="relative flex flex-1 items-center justify-center gap-[5px] lg:gap-[12px]">
              <div className="max-w-80pxr flex-1 md:min-w-104pxr md:max-w-none lg:min-w-140pxr">
                <TimeSlotInput type="time" value={slot.startTime} readOnly={true} />
              </div>
              <div className="max-w-80pxr flex-1 md:min-w-104pxr md:max-w-none lg:min-w-140pxr">
                <TimeSlotInput type="time" value={slot.endTime} readOnly={true} />
              </div>
            </div>
            <button
              className="relative size-[44px] md:size-[56px]"
              onClick={() => handleDeleteTimeSlot(slot.date, slot.startTime, slot.endTime)}
              type="button"
            >
              <Image fill src="/delete-activity-button.svg" alt="체험시간 삭제하기" />
            </button>
          </div>
        ))}
    </div>
  );
}
