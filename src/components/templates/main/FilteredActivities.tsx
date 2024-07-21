import InnerLayout from '@/components/atoms/inner-layout/InnerLayout';
import DropdownMenu from '@/components/molecules/dropdown-menu/DropdownMenu';
import Pagination from '@/components/molecules/pagination/Pagination';
import ActivityCardList from '@/components/organisms/card-list/ActivityCardList';
import FilteredNavList from '@/components/organisms/nav-list/FilteredNavList';
import { addSearchParam } from '@/lib/query-string';
import { getActivities } from '@/queries/activities/get-activities';
import { ActivityCategory, ActivitySort } from '@/types/activity';
import Link from 'next/link';
import React from 'react';

interface Props {
  searchParams: { category: ActivityCategory | '모든 체험'; sort: ActivitySort; page: number };
}

export default async function FilteredActivities({ searchParams }: Props) {
  const { activities, totalCount } = await getActivities({
    method: 'offset',
    size: 8,
    category: searchParams.category === '모든 체험' ? undefined : searchParams.category,
    sort: searchParams.sort ? searchParams.sort : 'latest',
    page: searchParams.page ? searchParams.page : 1,
  });

  return (
    <InnerLayout className="mb-[150px] mt-[40px] md:mb-[250px] md:mt-[60px]">
      <div className="flex justify-between gap-[10px]">
        <FilteredNavList
          currentCategory={searchParams.category}
          searchParamsSort={searchParams.sort}
        />
        <DropdownMenu text="가격" className="!w-90pxr shrink-0 md:!w-127pxr">
          <Link
            className="w-full"
            href={addSearchParam({ sort: 'price_asc' }, searchParams)}
            scroll={false}
          >
            가격이 낮은 순
          </Link>
          <Link
            className="w-full"
            href={addSearchParam({ sort: 'price_desc' }, searchParams)}
            scroll={false}
          >
            가격이 높은 순
          </Link>
        </DropdownMenu>
      </div>
      <h2 className="mt-[22px] text-18pxr font-[700] md:mt-[40px] md:text-36pxr">
        {searchParams.category ? searchParams.category : '🛼 모든 체험'}
      </h2>
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
