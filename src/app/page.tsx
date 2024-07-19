import InnerLayout from '@/components/atoms/inner-layout/InnerLayout';
import SearchActivity from '@/components/molecules/search/SearchActivity';
import Footer from '@/components/templates/footer/Footer';
import Header from '@/components/templates/header/Header';
import Banner from '@/components/templates/main/Banner';
import BestActivities from '@/components/templates/main/BestActivities';
import FilteredActivities from '@/components/templates/main/FilteredActivities';
import { getActivities } from '@/queries/activities/get-activities';
import { ActivityCategory, ActivitySort } from '@/types/activity';

interface Props {
  searchParams: { category: ActivityCategory; sort: ActivitySort; page: number };
}

export default async function Home({ searchParams }: Props) {
  const bestActivitiesData = await getActivities({
    method: 'offset',
    sort: 'most_reviewed',
    size: 9,
  });

  return (
    <>
      <Header />
      <Banner activity={bestActivitiesData.activities[0]} />
      <SearchActivity />
      <BestActivities activitiesData={bestActivitiesData} />
      <FilteredActivities searchParams={searchParams} />
      <Footer />
    </>
  );
}
