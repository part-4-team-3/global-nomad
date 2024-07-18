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
interface Props {
  params: { id: number };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: Props) {
  const data = await getActivityDetails(params.id);

  const scheduleHash = createScheduleHashMap(data.schedules);

  const scheduledDates = data.schedules?.map((schedule) => parseISO(schedule.date));

  const currentPage = Number(searchParams?.page) || 1;

  const reviewData = await getActivityReviews(params.id, currentPage);

  return (
    <main>
      <div className="m-auto lg:max-w-1200pxr">
        <ActivityHeader
          category={data.category}
          title={data.title}
          rating={data.rating}
          address={data.address}
          reviewCount={data.reviewCount}
        />
        <ImageCarousel bannerImg={data.bannerImageUrl} subImg={data.subImages} />
        <div className="relative flex lg:gap-[24px]">
          <div className="flex flex-grow flex-col">
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
          />
        </div>
      </div>
    </main>
  );
}
