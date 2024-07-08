import Header from '@/components/templates/header/Header';
import Banner from '@/components/templates/main/Banner';

const ACTIVITY = {
  id: 1587,
  userId: 593,
  title: '함께 배우면 즐거운 스트릿댄스',
  description: '둠칫 둠칫 두둠칫',
  category: '투어',
  price: 10000,
  address: '서울특별시 강남구 테헤란로 427',
  bannerImageUrl:
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/5-2_593_1720434318395.png',
  rating: 0,
  reviewCount: 0,
  createdAt: '2024-07-08T19:09:37.716Z',
  updatedAt: '2024-07-08T19:09:37.716Z',
};

const USER = {
  id: 593,
  email: 'daeun@codeit.com',
  nickname: '오다은',
  profileImageUrl: null,
  createdAt: '2024-07-08T19:06:23.037Z',
  updatedAt: '2024-07-08T19:06:23.037Z',
};

export default function Home() {
  return (
    <>
      <Header user={USER} />
      <Banner activity={ACTIVITY} />
    </>
  );
}
