'use client';
import GeneratedImage from '@/components/molecules/generated-image/GeneratedImage';
import Image from 'next/image';

interface Props {
  title: 'banner' | 'intro';
  images: string[] | string;
  handleUploadImage: (e: React.ChangeEvent<HTMLInputElement>, title: 'banner' | 'intro') => void;
  handleDeleteImage: (title: 'banner' | 'intro', url: string) => void;
  deleteImages?: string[];
}

export default function ImageUploader({
  images,
  title,
  handleUploadImage,
  handleDeleteImage,
}: Props) {
  return (
    <div className="grid max-w-436pxr grid-cols-2 gap-[24px] lg:max-w-800pxr lg:grid-cols-4">
      <label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          id="imageUpload"
          onChange={(e) => handleUploadImage(e, title)}
        />
        <div className="relative aspect-square max-w-167pxr cursor-pointer md:max-w-206pxr lg:max-w-180pxr">
          <Image fill src="/upload-image.svg" alt="이미지 등록하기" />
        </div>
      </label>
      {Array.isArray(images)
        ? images.map((imageUrl, index) => (
            <GeneratedImage
              key={index}
              url={imageUrl}
              onClose={() => handleDeleteImage(title, imageUrl)}
            />
          ))
        : images && (
            <GeneratedImage key={0} url={images} onClose={() => handleDeleteImage(title, '')} />
          )}
    </div>
  );
}
