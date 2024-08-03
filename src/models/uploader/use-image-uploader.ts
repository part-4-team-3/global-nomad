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
import { toast } from 'react-toastify';

/** api 응답 인터페이스 */
interface ActivityImageUrlApiResponse {
  activityImageUrl: string;
}
interface ProfileImageUrlApiResponse {
  profileImageUrl: string;
}

/** 이미지 Url 받아오는 함수 */
export const useImageUploader = () => {
  const { user, setUser } = useUser.getState();
  const activityMutation = useMutation(submitActivityImageMutationOptions);
  const profileMutation = useMutation(submitProfileImageMutationOptions);
  const updateProfileMutation = useMutation(updateProfileImageMutationOptions);
  const [bannerImage, setBannerImage] = useState<string>('');
  const [subImages, setSubImages] = useState<{ url: string; id: number }[]>([]);
  const [deletedImages, setDeletedImages] = useState<number[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [addImages, setAddImages] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string>(user?.profileImageUrl || '');
  const { setIsClose } = useModal();

  const closeModal = () => {
    setIsClose();
  };

  /** 등록한 이미지를 url로 바꾸는 비동기 함수 */
  const handleUploadImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    title: 'banner' | 'intro',
  ) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;

    const uploadFile = files[0];
    const formData = new FormData();
    formData.append('image', uploadFile);

    // 이미지 미리보기 URL 생성
    const previewUrl = URL.createObjectURL(uploadFile);

    // 낙관적 업데이트
    if (title === 'banner') {
      setBannerImage(previewUrl);
    } else if (title === 'intro') {
      if (uploadedImages.length < 4) {
        setAddImages((prevImages) => [...prevImages, previewUrl]);
        setUploadedImages((prevImages) => [...prevImages, previewUrl]);
      } else {
        toast('이미지는 최대 4개까지만 업로드할 수 있습니다.');
        return;
      }
    }

    try {
      const imageUrl: ActivityImageUrlApiResponse = await activityMutation.mutateAsync(formData);

      // 서버에서 받은 URL로 업데이트
      if (title === 'banner') {
        setBannerImage(imageUrl.activityImageUrl);
      } else if (title === 'intro') {
        setAddImages((prevImages) =>
          prevImages.map((img) => (img === previewUrl ? imageUrl.activityImageUrl : img)),
        );
        setUploadedImages((prevImages) =>
          prevImages.map((img) => (img === previewUrl ? imageUrl.activityImageUrl : img)),
        );
      }
    } catch (error) {
      alert(error);
      // 에러 발생 시 미리보기 이미지 제거
      if (title === 'banner') {
        setBannerImage('');
      } else if (title === 'intro') {
        setAddImages((prevImages) => prevImages.filter((img) => img !== previewUrl));
        setUploadedImages((prevImages) => prevImages.filter((img) => img !== previewUrl));
      }
    } finally {
      // 미리보기 URL을 해제하여 메모리 누수 방지
      URL.revokeObjectURL(previewUrl);
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
  const handleDeleteImage = (title: 'banner' | 'intro', imageUrl: string) => {
    if (title === 'banner') {
      setBannerImage('');
    } else {
      const imageToDelete = subImages.find((img) => img.url === imageUrl);
      if (imageToDelete) {
        setDeletedImages((prevDeleted) => [...prevDeleted, imageToDelete.id]);
      }
      setAddImages((prevImages) => prevImages.filter((image) => image !== imageUrl));
      setUploadedImages((prevImages) => prevImages.filter((image) => image !== imageUrl));
      setSubImages((prevImages) => prevImages.filter((img) => img.url !== imageUrl));
    }
  };

  /** 프로필 이미지 서버에 전송하는 함수 */
  const submitProfileImage = async () => {
    const data = {
      profileImageUrl: profileImage,
    };
    try {
      const response = await updateProfileMutation.mutateAsync(data);
      if (user && profileImage) {
        setUser({ ...user, profileImageUrl: profileImage });
      }
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
    subImages,
    setSubImages,
    deletedImages,
    addImages,
    setUploadedImages,
    handleUploadImage,
    handleEditProfileImage,
    handleDeleteImage,
    submitProfileImage,
  };
};
