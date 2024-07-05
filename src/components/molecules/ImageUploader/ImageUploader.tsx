'use client';
import GeneratedImage from '@/components/molecules/GeneratedImage/GeneratedImage';
import { useImageUploader } from '@/models/useImageUploader';
import Image from 'next/image';

export default function ImageUploader() {
  const { uploadedImages, handleUploadImage, handleDeleteImage } = useImageUploader();

  return (
    /* 고정값으로 설정한 width는 페이지 레이아웃시 수정 예정입니다. */
    <div className="grid gap-[24px] max-xl:w-[428px] max-xl:grid-cols-2 max-sm:w-[342px] xl:w-[792px] xl:grid-cols-4">
      <label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          id="imageUpload"
          onChange={handleUploadImage}
        />
        <div className="relative cursor-pointer max-xl:h-[206px] max-xl:w-[206px] max-sm:h-[167px] max-sm:w-[167px] xl:h-[180px] xl:w-[180px]">
          <Image fill src="/UploadImage.svg" alt="이미지 등록하기" />
        </div>
      </label>
      {uploadedImages.map((imageUrl, index) => (
        <GeneratedImage key={index} url={imageUrl} onClose={() => handleDeleteImage(index)} />
      ))}
    </div>
  );
}
