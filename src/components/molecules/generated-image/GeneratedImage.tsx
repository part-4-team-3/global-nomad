import Image from 'next/image';
import CloseButton from '@/components/atoms/button/CloseButton';

interface Props {
  key: number;
  url: string;
  onClose: (url: string) => void;
}
export default function GeneratedImage({ key, url, onClose }: Props) {
  return (
    <>
      <div className="relative aspect-square max-w-167pxr rounded-[24px] md:max-w-206pxr lg:max-w-180pxr">
        <CloseButton id={key} onClose={() => onClose(url)} />
        <div className="relative aspect-square max-w-167pxr overflow-hidden rounded-[24px] md:max-w-206pxr lg:max-w-180pxr">
          {url && <Image fill src={url} alt="이미지 생성" className="object-cover" />}
        </div>
      </div>
    </>
  );
}
