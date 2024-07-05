import Image from 'next/image';

export interface Props {
  id: number;
  onClose: (index: number) => void;
}

export default function CloseButton({ id, onClose }: Props) {
  return (
    <button
      onClick={() => onClose(id)}
      className="absolute z-10 max-xl:right-[-16px] max-xl:top-[-16px] max-xl:h-[32px] max-xl:w-[32px] max-sm:right-[-12px] max-sm:top-[-12px] max-sm:h-[24px] max-sm:w-[24px] xl:right-[-20px] xl:top-[-20px] xl:h-[40px] xl:w-[40px]"
    >
      <Image fill src="/CloseButtonIcon.svg" alt="등록 이미지 삭제" />
    </button>
  );
}
