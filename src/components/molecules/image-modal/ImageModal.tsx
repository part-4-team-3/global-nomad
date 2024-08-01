import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  imgUrl: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  curIdx: number;
  length: number;
}

export default function ImageModal({ imgUrl, onClose, onPrev, onNext, curIdx, length }: Props) {
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNext();
  };

  const handlePrevClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPrev();
  };

  useEffect(() => {
    const img = document.createElement('img');
    img.src = imgUrl;
    img.onload = () => {
      let { width, height } = img;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (viewportWidth >= 1024 && width > viewportWidth - 100) {
        const aspectRatio = height / width;
        width = viewportWidth - 100;
        height = width * aspectRatio;
      }

      if (height > viewportHeight - 100) {
        const aspectRatio = width / height;
        height = viewportHeight - 100;
        width = height * aspectRatio;
      }

      setImageSize({ width, height });
    };
  }, [imgUrl]);
  if (!imageSize) {
    return null;
  }

  return (
    <div
      className="fixed left-[0px] right-[0px] top-[0px] z-[100] flex h-screen w-screen items-center justify-between bg-black bg-opacity-80 lg:gap-[20px] lg:p-[100px]"
      onClick={onClose}
    >
      <button
        className="rounded-full bg-transparent disabled:opacity-30"
        onClick={handlePrevClick}
        disabled={curIdx <= 0}
      >
        <ChevronLeft className="h-[40px] w-[40px]" color="white" />
      </button>
      <div className="relative" onClick={handleImageClick}>
        <Image src={imgUrl} alt="" width={imageSize.width} height={imageSize.height} />
        <button onClick={onClose} className="absolute right-[0px] top-[-50px]">
          <Image src="/close-white.svg" width={44} height={44} alt="close" />
        </button>
      </div>
      <button
        className="rounded-full bg-transparent disabled:opacity-30"
        onClick={handleNextClick}
        disabled={curIdx >= length - 1}
      >
        <ChevronRight className="h-[40px] w-[40px]" color="white" />
      </button>
    </div>
  );
}
