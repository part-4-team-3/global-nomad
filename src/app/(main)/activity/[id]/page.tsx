import ImageCarousel from '@/components/molecules/image-carousel/ImageCarousel';
import ActivityHeader from '@/components/organisms/activity-header/ActivityHeader';
import { parseISO } from 'date-fns';
import { createScheduleHashMap } from '@/models/activity-reservation/create-schedule-hash-map';
import { getActivityDetails } from '@/queries/activities/get-activity-details';
import ReviewTemplate from '@/components/templates/review-template/ReviewTemplate';
import Map from '@/components/molecules/map/Map';
import ActivityDescription from '@/components/molecules/activity-description/ActivityDescription';
import ActivityReservationContainer from '@/components/templates/activity-reservation-container/ActivityReservationContainer';
import { getActivityReviews } from '@/queries/activities/get-activity-reviews';
import type { Metadata } from 'next';
import { getCookie } from '@/app/(action)/(cookie)/cookie';
interface Props {
  params: { id: number };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getActivityDetails(params.id);
  return {
    title: `${product.title} | Global Nomad`,
    icons: {
      icon: '/favicon/favicon.ico',
    },
    openGraph: {
      title: `${product.title} | Global Nomad`,
      description: product.description,
      url: `https://glabal-nomad.vercel.app/activity/${params.id}`,
      type: 'article',
      images: [
        {
          url: product.bannerImageUrl,
          alt: `${product.title} image`,
        },
      ],
      siteName: 'Global Nomad',
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const data = await getActivityDetails(params.id);

  const scheduleHash = createScheduleHashMap(data.schedules);

  const scheduledDates = data.schedules?.map((schedule) => parseISO(schedule.date));

  const currentPage = Number(searchParams?.page) || 1;

  const reviewData = await getActivityReviews(params.id, currentPage);

  const userId = await getCookie('userId');

  const isNotLoggedIn = userId ? false : true;

  return (
    <main>
      <div className="m-auto lg:max-w-1248pxr">
        <section id="overview">
          <ActivityHeader
            category={data.category}
            title={data.title}
            rating={data.rating}
            address={data.address}
            reviewCount={data.reviewCount}
            activityId={params.id}
            creatorId={data.userId}
            userId={userId}
          />
          <ImageCarousel bannerImg={data.bannerImageUrl} subImg={data.subImages} />
        </section>
        <div className="relative flex">
          <div className="flex flex-grow flex-col px-[24px]">
            <ActivityDescription description={data.description} />

            <Map address={data.address} />

            <ReviewTemplate
              ratings={data.rating}
              reviewCount={data.reviewCount}
              reviews={reviewData.reviews}
              currentPage={currentPage}
              activityId={params.id}
            />
          </div>
          <ActivityReservationContainer
            price={data.price}
            scheduleHash={scheduleHash}
            scheduledDates={scheduledDates}
            activityId={params.id}
            creatorId={data.userId}
            isNotLoggedIn={isNotLoggedIn}
            userId={isNotLoggedIn ? -1 : Number(userId)}
          />
        </div>
      </div>
    </main>
  );
}
