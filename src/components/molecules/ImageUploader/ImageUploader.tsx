'use client';
import GeneratedImage from '@/components/molecules/GeneratedImage/GeneratedImage';
import { apiInstance } from '@/lib/axios';
import Image from 'next/image';
import { useState } from 'react';

/** api 응답 인터페이스 */
interface ApiResponse {
  activityImageUrl: string;
}

export default function ImageUploader() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQ0LCJ0ZWFtSWQiOiI1LTMiLCJpYXQiOjE3MjAwOTQ2MDcsImV4cCI6MTcyMDA5NjQwNywiaXNzIjoic3AtZ2xvYmFsbm9tYWQifQ.S0zlNmbHD9Sd34AWRWW3vVUTPxrbMBGcwcNS5b3ds5w`,
        },
      });
      // 업로드된 이미지 배열이 4개 이하인 경우에만 추가
      if (uploadedImages.length < 4) {
        setUploadedImages((prevImages) => [...prevImages, response.activityImageUrl]);
      } else {
        alert('이미지는 최대 4개까지만 업로드할 수 있습니다.');
      }
    } catch (error) {
      alert(error);
    }
  };

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
        <GeneratedImage key={index} url={imageUrl} />
      ))}
    </div>
  );
}
