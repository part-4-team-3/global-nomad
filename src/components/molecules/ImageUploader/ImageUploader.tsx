'use client';
import GeneratedImage from '@/components/atoms/GeneratedImage/GeneratedImage';
import { apiInstance } from '@/lib/axios';
import Image from 'next/image';
import { useState } from 'react';

/** api 응답 인터페이스 */
interface ApiResponse {
  activityImageUrl: string;
}

export default function ImageUploader() {
  const [uploadedImage, setUploadedImage] = useState<string | undefined>();
  /** 등록한 이미지를 url로 바꾸는 비동기 함수 */
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    /* input 요소에서 선택된 파일 추출 */
    const { files } = e.target;

    /* 파일이 없을 시 리턴*/
    if (!files || files.length === 0) return;

    const uploadFile = files[0];
    const formData = new FormData();
    formData.append('image', uploadFile);

    try {
      const response: ApiResponse = await apiInstance.post('activities/image', formData, {
        headers: {
          /*임의로 발급한 엑세스토큰입니다. 추후 회원가입 기능 추가시 수정 예정 */
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQ0LCJ0ZWFtSWQiOiI1LTMiLCJpYXQiOjE3MjAwODUwMDgsImV4cCI6MTcyMDA4NjgwOCwiaXNzIjoic3AtZ2xvYmFsbm9tYWQifQ.QbROXNIc-9plr4Aa35wOJJQkOLVp6954e9X0nI3GTuI`,
        },
      });
      setUploadedImage(response.activityImageUrl);
    } catch (error) {
      alert(error);
    }
  };
  console.log(uploadedImage);

  return (
    <>
      <label className="inline-block">
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
      <GeneratedImage url={uploadedImage} />
    </>
  );
}
