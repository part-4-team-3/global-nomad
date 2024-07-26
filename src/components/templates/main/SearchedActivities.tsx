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
    size: 16,
    keyword: searchParams.keyword,
    page: searchParams.page ? searchParams.page : 1,
  });

  return (
    <InnerLayout className="mb-[150px] mt-[24px] md:mb-[250px] lg:mt-[40px]">
      <div className="flex flex-col gap-[12px]">
        <h2 className="text-24pxr font-[400] md:text-32pxr">
          <b className="font-[700]">{searchParams.keyword}</b>(으)로 검색한 결과입니다.
        </h2>
        <data>총 {totalCount}개의 결과</data>
      </div>
      <ActivityCardList activityList={activities} />
      {!totalCount ? (
        <div className="mt-[30px] text-center">게시물이 없습니다.</div>
      ) : (
        <div className="mt-[72px] flex justify-center">
          <Pagination
            totalPage={Math.ceil(totalCount / 16)}
            currentPage={searchParams.page ? Number(searchParams.page) : 1}
            searchParams={searchParams}
          />
        </div>
      )}
    </InnerLayout>
  );
}
