import InnerLayout from '@/components/atoms/inner-layout/InnerLayout';
import DropdownMenu from '@/components/molecules/dropdown-menu/DropdownMenu';
import ActivityCardList from '@/components/organisms/card-list/ActivityCardList';
import FilteredNavList from '@/components/organisms/nav-list/FilteredNavList';
import ReviewPagination from '@/components/organisms/review-pagination/ReviewPagination';
import { getActivities } from '@/queries/activities/get-activities';
import React from 'react';

export default async function FilteredActivities() {
  const activitiesData = await getActivities({
    method: 'offset',
    sort: 'latest',
    size: 8,
  });

  return (
    <InnerLayout className="mb-[342px] mt-[60px]">
      <div className="flex justify-between">
        <FilteredNavList />
        <DropdownMenu text="가격" className="!w-127pxr">
          <button className="w-full">가격이 낮은 순</button>
          <button className="w-full">가격이 높은 순</button>
        </DropdownMenu>
      </div>
      <h2 className="mt-[40px] text-36pxr font-[700]">🛼 모든 체험</h2>
      <ActivityCardList />
      <div className="mt-[72px] flex justify-center">
        <ReviewPagination totalPage={1} currentPage={1} activityId={1} />
      </div>
    </InnerLayout>
  );
}
