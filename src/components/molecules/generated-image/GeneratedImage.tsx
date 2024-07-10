import Image from 'next/image';
import CloseButton from '@/components/atoms/button/CloseButton';

interface Props {
  key: number;
  url: string;
  onClose: (index: number) => void;
}
export default function GeneratedImage({ key, url, onClose }: Props) {
  return (
    <>
      <div className="relative size-[167px] rounded-[24px] md:size-[206px] lg:size-[180px]">
        <CloseButton id={key} onClose={() => onClose(key)} />
        <div className="relative size-[167px] overflow-hidden rounded-[24px] md:size-[206px] lg:size-[180px]">
          {url && <Image fill src={url} alt="이미지 생성" className="object-cover" />}
        </div>
      </div>
    </>
  );
}
