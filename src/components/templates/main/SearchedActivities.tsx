import InnerLayout from '@/components/atoms/inner-layout/InnerLayout';
import Pagination from '@/components/molecules/pagination/Pagination';
import ActivityCardList from '@/components/organisms/card-list/ActivityCardList';
import { getActivities } from '@/queries/activities/get-activities';

interface Props {
  searchParams: { keyword: string; page: number };
}

export default async function SearchedActivities({ searchParams }: Props) {
  const { activities, totalCount } = await getActivities({
    method: 'offset',
    size: 8,
    keyword: searchParams.keyword,
    page: searchParams.page ? searchParams.page : 1,
  });

  return (
    <InnerLayout className="mb-[200px] mt-[40px] md:mb-[342px] md:mt-[60px]">
      <ActivityCardList activityList={activities} />
      {!totalCount ? (
        <div className="mt-[30px] text-center">게시물이 없습니다.</div>
      ) : (
        <div className="mt-[72px] flex justify-center">
          <Pagination
            totalPage={Math.ceil(totalCount / 8)}
            currentPage={searchParams.page ? Number(searchParams.page) : 1}
            searchParams={searchParams}
          />
        </div>
      )}
    </InnerLayout>
  );
}
