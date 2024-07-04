import Image from 'next/image';
import CloseButton from '../../atoms/CloseButton/CloseButton';
interface Props {
  url?: string;
}
export default function GeneratedImage({ url }: Props) {
  return (
    <div className="relative inline-block">
      {url && (
        <>
          <CloseButton />
          <div className="relative rounded-3xl max-xl:h-[206px] max-xl:w-[206px] max-sm:h-[167px] max-sm:w-[167px] xl:h-[180px] xl:w-[180px]">
            <Image fill src={url} alt="이미지 생성" />
          </div>
        </>
      )}
    </div>
  );
}
