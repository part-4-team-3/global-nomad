'use client';
import { apiInstance } from '@/lib/axios';
import { useModal } from '@/store/useModal';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

/** api 응답 인터페이스 */
interface ApiResponse {
  activityImageUrl: string;
  profileImageUrl: string;
}

/** 이미지 Url 받아오는 함수 */
export const useImageUploader = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string>('/close-button-icon.svg'); //초기값 수정 예정
  const { setIsClose } = useModal();

  const closeModal = () => {
    setIsClose();
  };

  /** 등록한 이미지를 url로 바꾸는 비동기 함수 */
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    /* input 요소에서 선택된 파일 추출 */
    const { files } = e.target;

    /* 파일이 없을 시 리턴 */
    if (!files || files.length === 0) return;

    const uploadFile = files[0];
    const formData = new FormData();
    formData.append('image', uploadFile);

    try {
      const response: ApiResponse = await apiInstance.post('activities/image', formData);
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

  /** 프로필이미지 URL 받아오는 함수 */
  const handleEditProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    /* input 요소에서 선택된 파일 추출 */
    const { files } = e.target;

    /* 파일이 없을 시 리턴 */
    if (!files || files.length === 0) return;

    const uploadFile = files[0];
    const formData = new FormData();
    formData.append('image', uploadFile);

    try {
      const response: ApiResponse = await apiInstance.post('users/me/image', formData);
      setProfileImage(response.profileImageUrl);
    } catch (error) {
      alert(error);
    }
  };

  /** 이미지 삭제 처리 */
  const handleDeleteImage = (index: number) => {
    setUploadedImages((prevImages) => prevImages.filter((_, idx) => idx !== index));
  };

  /** 프로필 이미지 서버에 전송하는 함수 */
  const submitProfileImage = async () => {
    if (!profileImage) {
      alert('이미지를 선택해 주세요.');
      return;
    }

    const uploadFile = profileImage;
    const formData = new FormData();
    formData.append('image', uploadFile);

    try {
      const response = await apiInstance.patch<ApiResponse>('users/me', {
        profileImageUrl: profileImage,
      });
      console.log(response);
      alert('프로필 변경에 성공했습니다!');
      closeModal();
    } catch (error) {
      alert('이미지 업로드에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return {
    profileImage,
    uploadedImages,
    handleUploadImage,
    handleEditProfileImage,
    handleDeleteImage,
    submitProfileImage,
  };
};
