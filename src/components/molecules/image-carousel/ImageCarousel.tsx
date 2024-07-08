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
    <Carousel className="relative w-[400px]">
      <CarouselContent className="h-[310px] w-full">
        <CarouselItem>
          <Image src={bannerImg} fill alt="" objectFit="contain" loading="eager" />
        </CarouselItem>
      </CarouselContent>

      <CarouselPrevious className="absolute left-10pxr" />
      <CarouselNext className="absolute right-10pxr" />
    </Carousel>
  );
}
