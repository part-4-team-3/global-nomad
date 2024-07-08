import InnerLayout from '@/components/atoms/inner-layout/InnerLayout';
import Image from 'next/image';

interface Props {
  imageUrl: string;
}

export default function Banner({ imageUrl }: Props) {
  return (
    <div className="relative h-240pxr w-full overflow-hidden md:h-550pxr">
      <Image src={imageUrl} fill className="object-cover" alt="메인 배너" />
      <div
        className="relative h-full"
        style={{ background: 'linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 0.00) 100%)' }}
      >
        <InnerLayout
          mobilePx="keep"
          className="flex h-full flex-col justify-center gap-5pxr font-[700] text-white lg:gap-15pxr"
        >
          <h2 className="lg:text-68pxr max-w-[60vw] break-keep text-24pxr leading-[120%] md:max-w-[90%] md:text-54pxr lg:max-w-550pxr">
            함께 배우면 즐거운 스트릿 댄스
          </h2>
          <p className="text-14pxr md:text-20pxr lg:text-24pxr">1월의 인기 체험 BEST 🔥</p>
        </InnerLayout>
      </div>
    </div>
  );
}
