'use client';
import GeneratedImage from '@/components/molecules/generatedImage/GeneratedImage';
import { useImageUploader } from '@/models/uploader/useImageUploader';
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
        <div className="relative cursor-pointer max-xl:size-[206px] max-sm:size-[167px] xl:size-[180px]">
          <Image fill src="/UploadImage.svg" alt="이미지 등록하기" />
        </div>
      </label>
      {uploadedImages.map((imageUrl, index) => (
        <GeneratedImage key={index} url={imageUrl} onClose={() => handleDeleteImage(index)} />
      ))}
    </div>
  );
}
