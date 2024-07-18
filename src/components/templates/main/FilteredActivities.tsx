import InnerLayout from '@/components/atoms/inner-layout/InnerLayout';
import DropdownMenu from '@/components/molecules/dropdown-menu/DropdownMenu';
import ActivityCardList from '@/components/organisms/card-list/ActivityCardList';
import FilteredNavList from '@/components/organisms/nav-list/FilteredNavList';
import ReviewPagination from '@/components/organisms/review-pagination/ReviewPagination';
import makeQueryString from '@/lib/query-string';
import { getActivities } from '@/queries/activities/get-activities';
import { ActivityCategory, ActivitySort } from '@/types/activity';
import Link from 'next/link';
import React from 'react';

interface Props {
  searchParams: { category: ActivityCategory; sort: ActivitySort };
}

export default async function FilteredActivities({ searchParams }: Props) {
  const { activities } = await getActivities({
    method: 'offset',
    size: 8,
    category: searchParams.category,
    sort: searchParams.sort ? searchParams.sort : 'latest',
  });

  const addSearchParam = (param: {}) => {
    const newParams = Object.assign(searchParams, param);
    return makeQueryString(newParams);
  };

  return (
    <InnerLayout className="mb-[342px] mt-[60px]">
      <div className="flex justify-between">
        <FilteredNavList currentCategory={searchParams.category} />
        <DropdownMenu text="가격" className="!w-127pxr">
          <Link className="w-full" href={addSearchParam({ sort: 'price_asc' })}>
            가격이 낮은 순
          </Link>
          <Link className="w-full" href={addSearchParam({ sort: 'price_desc' })}>
            가격이 높은 순
          </Link>
        </DropdownMenu>
      </div>
      <h2 className="mt-[40px] text-36pxr font-[700]">
        {searchParams.category ? searchParams.category : '🛼 모든 체험'}
      </h2>
      <ActivityCardList activityList={activities} />
      <div className="mt-[72px] flex justify-center">
        <ReviewPagination totalPage={1} currentPage={1} activityId={1} />
      </div>
    </InnerLayout>
  );
}
