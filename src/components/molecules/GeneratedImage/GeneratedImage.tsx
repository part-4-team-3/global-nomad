import Image from 'next/image';
import CloseButton from '@/components/atoms/CloseButton/CloseButton';
export interface Props {
  key: number;
  url: string;
  onClose: (index: number) => void;
}
export default function GeneratedImage({ key, url, onClose }: Props) {
  return (
    <div className="relative rounded-3xl max-xl:h-[206px] max-xl:w-[206px] max-sm:h-[167px] max-sm:w-[167px] xl:h-[180px] xl:w-[180px]">
      {url && (
        <>
          <CloseButton id={key} onClose={() => onClose(key)} />
          <Image fill src={url} alt="이미지 생성" />
        </>
      )}
    </div>
  );
}
