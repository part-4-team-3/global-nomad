import Image from "next/image";
interface Props {
  url: string;
}
export default function GeneratedImage({ url }: Props) {
  return (
    <div>
      {url && (
        <div className="relative rounded-3xl max-xl:h-[206px] max-xl:w-[206px] max-sm:h-[167px] max-sm:w-[167px] xl:h-[180px] xl:w-[180px]">
          <div className="relative max-xl:h-[40px] max-xl:w-[40px] max-sm:h-[35px] max-sm:w-[35px] xl:h-[24px] xl:w-[24px]">
            <Image fill src="/CloseButtonIcon.svg" alt="등록 이미지 삭제" />
          </div>
          <Image fill src={url} alt="이미지 생성" />
        </div>
      )}
    </div>
  );
}
