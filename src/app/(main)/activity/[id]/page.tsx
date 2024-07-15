import ImageCarousel from '@/components/molecules/image-carousel/ImageCarousel';
import ActivityHeader from '@/components/organisms/activity-header/ActivityHeader';
import ActivityReservationBar from '@/components/organisms/activity-reservation-bar/ActivityReservationBar';
import { parseISO } from 'date-fns';
import { createScheduleHashMap } from '@/models/activity-reservation/create-schedule-hash-map';
import { getActivityDetails } from '@/queries/activities/get-activity-details';
import ParticipantCounter from '@/components/molecules/participant-counter/ParticipantCounter';
import ReviewCard from '@/components/molecules/review-card/ReviewCard';
import ReviewList from '@/components/organisms/review-list/ReviewList';
import ReviewPagination from '@/components/templates/review-template/ReviewTemplate';
import ReviewTemplate from '@/components/templates/review-template/ReviewTemplate';
interface Props {
  params: { id: number };
  searchParams: { [key: string]: string | string[] | undefined };
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
      date: '2024-07-07',
      startTime: '12:00',
      endTime: '13:00',
    },
    {
      id: 2,
      date: '2024-07-25',
      startTime: '12:00',
      endTime: '13:00',
    },
    {
      id: 3,
      date: '2024-07-25',
      startTime: '14:00',
      endTime: '15:00',
    },
  ],
  reviewCount: 5,
  rating: 4.74,
  createdAt: '2023-12-31T21:28:50.589Z',
  updatedAt: '2023-12-31T21:28:50.589Z',
};

const mockRevs = [
  {
    id: 1234,
    user: {
      profileImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/5-3_585_1720404945231.jpeg',
      nickname: '죄송합니다 열심히 할게요',
      id: 2222,
    },
    activityId: 12323,
    rating: 4.9,
    content:
      '저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을 적극 추천합니다!',
    createdAt: '2023-12-31T21:28:50.589Z',
    updatedAt: '2023-12-31T21:28:50.589Z',
  },
  {
    id: 1235,
    user: {
      profileImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/5-3_585_1720404945231.jpeg',
      nickname: '죄송합니다 열심히 할게요',
      id: 2222,
    },
    activityId: 12323,
    rating: 4.9,
    content:
      '저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을 적극 추천합니다!',
    createdAt: '2023-12-31T21:28:50.589Z',
    updatedAt: '2023-12-31T21:28:50.589Z',
  },
  {
    id: 1236,
    user: {
      profileImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/5-3_585_1720404945231.jpeg',
      nickname: '죄송합니다 열심히 할게요',
      id: 2222,
    },
    activityId: 12323,
    rating: 4.9,
    content:
      '저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을 적극 추천합니다!',
    createdAt: '2023-12-31T21:28:50.589Z',
    updatedAt: '2023-12-31T21:28:50.589Z',
  },
  {
    id: 1237,
    user: {
      profileImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/5-3_585_1720404945231.jpeg',
      nickname: '죄송합니다 열심히 할게요',
      id: 2222,
    },
    activityId: 12323,
    rating: 4.9,
    content:
      '저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을 적극 추천합니다!',
    createdAt: '2023-12-31T21:28:50.589Z',
    updatedAt: '2023-12-31T21:28:50.589Z',
  },
  {
    id: 1238,
    user: {
      profileImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/5-3_585_1720404945231.jpeg',
      nickname: '죄송합니다 열심히 할게요',
      id: 2222,
    },
    activityId: 12323,
    rating: 4.9,
    content:
      '저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을 적극 추천합니다!',
    createdAt: '2023-12-31T21:28:50.589Z',
    updatedAt: '2023-12-31T21:28:50.589Z',
  },
];

export default async function Page({ params, searchParams }: Props) {
  const data = await getActivityDetails(params.id);

  const scheduleHash = createScheduleHashMap(mockData.schedules);

  const scheduledDates = mockData.schedules?.map((schedule) => parseISO(schedule.date));

  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main>
      <ActivityHeader
        category={mockData.category}
        title={mockData.title}
        rating={mockData.rating}
        address={mockData.address}
        reviewCount={mockData.reviewCount}
      />
      <ImageCarousel bannerImg={mockData.bannerImageUrl} subImg={mockData.subImageUrls} />

      <ActivityReservationBar
        price={mockData.price}
        scheduleHash={scheduleHash}
        scheduledDates={scheduledDates}
      />

      <ReviewTemplate
        ratings={4.5}
        reviewCount={80}
        reviews={mockRevs}
        currentPage={currentPage}
        activityId={params.id}
      />
    </main>
  );
}
