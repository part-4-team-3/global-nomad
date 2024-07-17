import { Reservation } from '@/types/reservation';

interface Props {
  nickname: string;
  headCount: number;
}

export default function ReservationCard({ nickname, headCount }: Props) {
  return (
    <div className="rounded-[4px] border border-var-gray6 p-16pxr">
      <p className="text-16pxr font-[600] text-var-gray2">
        닉네임 <span className="font[600] ml-10pxr text-16pxr text-var-black">{nickname}</span>
      </p>
      <p className="text-16pxr font-[600] text-var-gray2">
        인원 <span className="font[600] ml-10pxr text-16pxr text-var-black">{headCount}명</span>
      </p>
      <div className="flex justify-end gap-6pxr">
        <button className="rounded-[6px] bg-[#121] px-20pxr py-10pxr text-white">승인하기</button>
        <button className="rounded-[6px] border border-[#121] bg-white px-20pxr py-10pxr text-[#121]">
          거절하기
        </button>
      </div>
    </div>
  );
}
