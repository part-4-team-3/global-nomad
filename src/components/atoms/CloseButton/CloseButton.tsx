import { on } from 'events';
import Image from 'next/image';

interface Props {
  key: number;
  onClose: (index: number) => void;
}

export default function CloseButton({ key, onClose }: Props) {
  return (
    <button
      key={key}
      onClick={() => onClose(key)}
      className="absolute z-10 max-xl:right-[-16px] max-xl:top-[-16px] max-xl:h-[32px] max-xl:w-[32px] max-sm:right-[-12px] max-sm:top-[-12px] max-sm:h-[24px] max-sm:w-[24px] xl:right-[-20px] xl:top-[-20px] xl:h-[40px] xl:w-[40px]"
    >
      <Image fill src="/CloseButtonIcon.svg" alt="등록 이미지 삭제" />
    </button>
  );
}
