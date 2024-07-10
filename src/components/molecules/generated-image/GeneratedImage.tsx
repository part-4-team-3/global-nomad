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
      <div className="relative">
        <CloseButton id={key} onClose={() => onClose(key)} />
        {url && (
          <div className="max-xl:size-[206px] max-sm:size-[167px] relative overflow-hidden rounded-[24px] xl:size-[180px]">
            <Image fill src={url} alt="이미지 생성" className="object-cover" />
          </div>
        )}
      </div>
    </>
  );
}
