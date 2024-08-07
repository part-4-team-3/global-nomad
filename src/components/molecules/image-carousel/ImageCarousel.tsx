'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import ImageModal from '../image-modal/ImageModal';

interface Props {
  bannerImg: string;
  subImg?: { id: number; imageUrl: string }[];
}

export default function ImageCarousel({ bannerImg, subImg = [] }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState(bannerImg);
  const carouselRef = useRef<HTMLDivElement>(null);

  const imgs = [{ id: 0, imageUrl: bannerImg }, ...subImg];
  const imgUrls = imgs.map((img) => img.imageUrl);
  const currentIndex = imgUrls.indexOf(imgUrl);

  const handleImageClick = (imgUrl: string) => {
    setImgUrl(imgUrl);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    carouselRef.current?.focus();
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < imgs.length) {
      setImgUrl(imgUrls[nextIndex]);
    }
  };

  const handlePrev = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setImgUrl(imgUrls[prevIndex]);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      handleNext();
    } else if (event.key === 'ArrowLeft') {
      handlePrev();
    }
  };

  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [currentIndex, imgUrls]);

  useEffect(() => {
    if (!isOpen) {
      carouselRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div className="px-[24px] pb-[32px] lg:pl-[24px] lg:pr-[0px]">
      <Carousel
        className="w-full rounded-[8px] border border-var-gray6"
        tabIndex={0}
        autoFocus
        ref={carouselRef}
      >
        <CarouselContent className="h-310pxr w-full md:h-500pxr lg:h-675pxr">
          {imgs.map((img) => (
            <CarouselItem key={img.id} className="relative">
              <button onClick={() => handleImageClick(img.imageUrl)}>
                <Image src={img.imageUrl} fill alt="" objectFit="cover" />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {subImg.length > 0 && (
          <>
            <CarouselPrevious className="absolute left-10pxr" />
            <CarouselNext className="absolute right-10pxr" />
          </>
        )}
      </Carousel>
      {isOpen && (
        <ImageModal
          imgUrl={imgUrl}
          onClose={handleClose}
          onNext={handleNext}
          onPrev={handlePrev}
          curIdx={currentIndex}
          length={imgs.length}
        />
      )}
    </div>
  );
}
