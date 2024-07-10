import Image from 'next/image';

interface Props {
  id: number;
  onClose: (index: number) => void;
}

export default function CloseButton({ id, onClose }: Props) {
  return (
    <button
      onClick={() => onClose(id)}
      className="max-xl:right-[-16px] max-xl:top-[-16px] max-xl:size-[32px] max-sm:right-[-12px] max-sm:top-[-12px] max-sm:size-[24px] absolute z-10 xl:right-[-20px] xl:top-[-20px] xl:size-[40px]"
    >
      <Image fill src="/close-button-icon.svg" alt="등록 이미지 삭제" />
    </button>
  );
}
