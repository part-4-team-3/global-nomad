import InnerLayout from '@/components/atoms/inner-layout/InnerLayout';
import DropdownMenu from '@/components/molecules/dropdown-menu/DropdownMenu';
import ActivityCardList from '@/components/organisms/card-list/ActivityCardList';
import FilteredNavList from '@/components/organisms/nav-list/FilteredNavList';
import ReviewPagination from '@/components/organisms/review-pagination/ReviewPagination';
import { getActivities } from '@/queries/activities/get-activities';
import { ActivityCategory } from '@/types/activity';
import React from 'react';

interface Props {
  searchParams: { category: ActivityCategory };
}

export default async function FilteredActivities({ searchParams }: Props) {
  const { activities } = await getActivities({
    method: 'offset',
    sort: 'latest',
    size: 8,
    category: searchParams.category,
  });

  return (
    <InnerLayout className="mb-[342px] mt-[60px]">
      <div className="flex justify-between">
        <FilteredNavList currentCategory={searchParams.category} />
        <DropdownMenu text="가격" className="!w-127pxr">
          <button className="w-full">가격이 낮은 순</button>
          <button className="w-full">가격이 높은 순</button>
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
