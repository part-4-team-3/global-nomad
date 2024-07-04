import Image from 'next/image';
import CloseButton from '../../atoms/CloseButton/CloseButton';
interface Props {
  key: number;
  url: string;
  onClose: (index: number) => void;
}
export default function GeneratedImage({ key, url, onClose }: Props) {
  return (
    <div className="relative rounded-3xl max-xl:h-[206px] max-xl:w-[206px] max-sm:h-[167px] max-sm:w-[167px] xl:h-[180px] xl:w-[180px]">
      {url && (
        <>
          <CloseButton key={key} onClose={() => onClose(key)} />
          <Image fill src={url} alt="이미지 생성" />
        </>
      )}
    </div>
  );
}
