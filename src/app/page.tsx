import InnerLayout from '@/components/atoms/inner-layout/InnerLayout';
import SearchActivity from '@/components/molecules/search/SearchActivity';
import Header from '@/components/templates/header/Header';
import Banner from '@/components/templates/main/Banner';
import BestActivities from '@/components/templates/main/BestActivities';
import { getActivities } from '@/queries/activities/get-activities';

export default async function Home() {
  const bestActivitiesData = await getActivities({
    method: 'offset',
    sort: 'most_reviewed',
    size: 9,
  });

  return (
    <>
      <Header />
      <Banner activity={bestActivitiesData.activities[0]} />
      <InnerLayout>
        <SearchActivity />
        <BestActivities activitiesData={bestActivitiesData} />
      </InnerLayout>
    </>
  );
}
