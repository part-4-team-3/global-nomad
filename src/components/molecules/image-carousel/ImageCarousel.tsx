import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

interface Props {
  bannerImg: string;
  subImg?: { id: number; imageUrl: string }[];
}

export default function ImageCarousel({ bannerImg, subImg }: Props) {
  return (
    <div className="px-[24px] pb-[32px]">
      <Carousel className="w-full rounded-[8px] border border-var-gray6">
        <CarouselContent className="h-310pxr w-full">
          <CarouselItem className="relative">
            <Image src={bannerImg} fill alt="" objectFit="contain" />
          </CarouselItem>

          {subImg?.map((img) => (
            <CarouselItem key={img.id} className="relative">
              <Image src={img.imageUrl} fill alt="" objectFit="contain" />
            </CarouselItem>
          ))}
        </CarouselContent>

        {subImg && (
          <>
            <CarouselPrevious className="absolute left-10pxr" />
            <CarouselNext className="absolute right-10pxr" />
          </>
        )}
      </Carousel>
    </div>
  );
}
