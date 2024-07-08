import ImageCarousel from '@/components/molecules/image-carousel/ImageCarousel';
import ActivityHeader from '@/components/organisms/activity-header/ActivityHeader';

interface Props {
  params: { id: number };
}

const mockData = {
  id: 7,
  userId: 21,
  title: '함께 배우면 즐거운 스트릿댄스',
  description: '둠칫 둠칫 두둠칫',
  category: '투어',
  price: 10000,
  address: '서울특별시 강남구 테헤란로 427',
  bannerImageUrl:
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/5-3_3578_1717418681221.png',
  subImageUrls: [
    {
      id: 1,
      imageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/5-3_585_1720404945231.jpeg',
    },
    {
      id: 2,
      imageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/5-3_585_1720405314478.jpeg',
    },
    {
      id: 3,
      imageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/5-3_585_1720404945231.jpeg',
    },
  ],
  schedules: [
    {
      id: 1,
      date: '2023-12-01',
      startTime: '12:00',
      endTime: '13:00',
    },
    {
      id: 2,
      date: '2023-12-05',
      startTime: '12:00',
      endTime: '13:00',
    },
  ],
  reviewCount: 5,
  rating: 4.74,
  createdAt: '2023-12-31T21:28:50.589Z',
  updatedAt: '2023-12-31T21:28:50.589Z',
};

export default function Page({ params }: Props) {
  return (
    <main>
      <div>{params.id}</div>
      <ActivityHeader
        category={mockData.category}
        title={mockData.title}
        rating={mockData.rating}
        address={mockData.address}
        reviewCount={mockData.reviewCount}
      />
      <ImageCarousel bannerImg={mockData.bannerImageUrl} subImg={mockData.subImageUrls} />
    </main>
  );
}
