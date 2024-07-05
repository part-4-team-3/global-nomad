import Image from 'next/image';
import CloseButton from '@/components/atoms/CloseButton/CloseButton';
export interface Props {
  key: number;
  url: string;
  onClose: (index: number) => void;
}
export default function GeneratedImage({ key, url, onClose }: Props) {
  return (
    <>
      <div className="relative">
        <CloseButton id={key} onClose={() => onClose(key)} />
        {url && (
          <div className="relative overflow-hidden rounded-[24px] max-xl:h-[206px] max-xl:w-[206px] max-sm:h-[167px] max-sm:w-[167px] xl:h-[180px] xl:w-[180px]">
            <Image fill src={url} alt="이미지 생성" className="object-cover" />
          </div>
        )}
      </div>
    </>
  );
}
