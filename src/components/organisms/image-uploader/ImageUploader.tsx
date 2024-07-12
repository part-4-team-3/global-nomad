'use client';
import GeneratedImage from '@/components/molecules/generated-image/GeneratedImage';
import { useImageUploader } from '@/models/uploader/use-image-uploader';
import Image from 'next/image';

interface Props {
  title: 'banner' | 'intro';
  images: string[] | string;
  handleUploadImage: (e: React.ChangeEvent<HTMLInputElement>, title: 'banner' | 'intro') => void;
  handleDeleteImage: (title: 'banner' | 'intro', index: number) => void;
}

export default function ImageUploader({
  images,
  title,
  handleUploadImage,
  handleDeleteImage,
}: Props) {
  return (
    /* 고정값으로 설정한 width는 페이지 레이아웃시 수정 예정입니다. */
    <div className="grid w-[342px] grid-cols-2 gap-[24px] md:w-[428px] lg:w-[792px] lg:grid-cols-4">
      <label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          id="imageUpload"
          onChange={(e) => handleUploadImage(e, title)}
        />
        <div className="relative size-[167px] cursor-pointer md:size-[206px] lg:size-[180px]">
          <Image fill src="/upload-image.svg" alt="이미지 등록하기" />
        </div>
      </label>
      {Array.isArray(images)
        ? images.map((imageUrl, index) => (
            <GeneratedImage
              key={index}
              url={imageUrl}
              onClose={() => handleDeleteImage(title, index)}
            />
          ))
        : images && (
            <GeneratedImage key={0} url={images} onClose={() => handleDeleteImage(title, 0)} />
          )}
    </div>
  );
}
