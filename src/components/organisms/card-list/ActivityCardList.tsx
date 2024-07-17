import ActivityCard from '@/components/molecules/card/ActivityCard';

// 테스트용 mock 데이터 넣어둠
export default function ActivityCardList() {
  return (
    <ul className="mt-[32px]">
      <ActivityCard
        activity={{
          id: 0,
          userId: 0,
          title: 'string',
          description: 'string',
          category: 'string',
          price: 0,
          address: 'string',
          bannerImageUrl:
            'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/5-3_547_1720439740814.png',
          rating: 0,
          reviewCount: 0,
          createdAt: '2024-07-15T22:24:48.809Z',
          updatedAt: '2024-07-15T22:24:48.809Z',
        }}
      />
    </ul>
  );
}
