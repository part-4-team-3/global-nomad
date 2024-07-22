import Image from 'next/image';

export default function AlertCard() {
  return (
    <div className="relative rounded-[5px] border border-var-gray5 bg-white px-[12px] pb-[16px] pt-[20px]">
      <button className="absolute right-[12px] top-[16px]">
        <Image src="close-gray.svg" alt="X" width={24} height={24} />
      </button>
      <div>
        <div className="size-5pxr rounded-[50%] bg-var-blue" />
        <p className="mt-[15px] text-14pxr leading-[157%]">
          함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 승인되었어요.
        </p>
        <time className="mt-[4px] text-12pxr text-var-gray3">1분 전</time>
      </div>
    </div>
  );
}
