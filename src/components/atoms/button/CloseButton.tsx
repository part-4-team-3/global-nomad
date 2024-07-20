import Image from 'next/image';

interface Props {
  id: number;
  onClose: (index: number) => void;
}

export default function CloseButton({ id, onClose }: Props) {
  return (
    <button
      type="button"
      onClick={() => onClose(id)}
      className="absolute right-[-12px] top-[-12px] z-10 size-[24px] md:right-[-16px] md:top-[-16px] md:size-[32px] lg:right-[-20px] lg:top-[-20px] lg:size-[40px]"
    >
      <Image fill src="/close-button-icon.svg" alt="등록 이미지 삭제" />
    </button>
  );
}
