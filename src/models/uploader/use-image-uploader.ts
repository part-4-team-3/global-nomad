'use client';
import { useModal } from '@/store/useModal';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { submitActivityImageMutationOptions } from '@/mutations/activity/activity-image-uploader';
import {
  submitProfileImageMutationOptions,
  updateProfileImageMutationOptions,
} from '@/mutations/users/profile-image-uploader';
import useUser from '@/store/useUser';

/** api 응답 인터페이스 */
interface ActivityImageUrlApiResponse {
  activityImageUrl: string;
}
interface ProfileImageUrlApiResponse {
  profileImageUrl: string;
}

/** 이미지 Url 받아오는 함수 */
export const useImageUploader = () => {
  const activityMutation = useMutation(submitActivityImageMutationOptions);
  const profileMutation = useMutation(submitProfileImageMutationOptions);
  const updateProfileMutation = useMutation(updateProfileImageMutationOptions);
  const [bannerImage, setBannerImage] = useState<string>('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string>(''); //초기값 수정 예정
  const { setIsClose } = useModal();
  const { user, setUser } = useUser.getState();

  const closeModal = () => {
    setIsClose();
  };

  /** 등록한 이미지를 url로 바꾸는 비동기 함수 */
  const handleUploadImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    title: 'banner' | 'intro',
  ) => {
    /* input 요소에서 선택된 파일 추출 */
    const { files } = e.target;

    /* 파일이 없을 시 리턴 */
    if (!files || files.length === 0) return;

    const uploadFile = files[0];
    const formData = new FormData();
    formData.append('image', uploadFile);
    try {
      const imageUrl: ActivityImageUrlApiResponse = await activityMutation.mutateAsync(formData);
      if (title === 'banner') {
        setBannerImage(imageUrl.activityImageUrl);
      } else if (title === 'intro') {
        if (uploadedImages.length < 4) {
          setUploadedImages((prevImages) => [...prevImages, imageUrl.activityImageUrl]);
        } else {
          alert('이미지는 최대 4개까지만 업로드할 수 있습니다.');
        }
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
      const imageUrl: ProfileImageUrlApiResponse = await profileMutation.mutateAsync(formData);
      setProfileImage(imageUrl.profileImageUrl);
    } catch (error) {
      alert(error);
    }
  };

  /** 이미지 삭제 처리 */
  const handleDeleteImage = (title: 'banner' | 'intro', index: number) => {
    if (title === 'banner') {
      setBannerImage('');
    } else {
      setUploadedImages((prevImages) => prevImages.filter((_, idx) => idx !== index));
    }
  };

  /** 프로필 이미지 서버에 전송하는 함수 */
  const submitProfileImage = async () => {
    const data = {
      profileImageUrl: profileImage,
    };
    try {
      const response = await updateProfileMutation.mutateAsync(data);
      alert('프로필 변경에 성공했습니다!');
      closeModal();
    } catch (error) {
      alert('이미지 업로드에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return {
    profileImage,
    bannerImage,
    setBannerImage,
    uploadedImages,
    setUploadedImages,
    handleUploadImage,
    handleEditProfileImage,
    handleDeleteImage,
    submitProfileImage,
  };
};
