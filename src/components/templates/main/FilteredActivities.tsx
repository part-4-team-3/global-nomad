import DropdownMenu from '@/components/molecules/dropdown-menu/DropdownMenu';
import ActivityCardList from '@/components/organisms/card-list/ActivityCardList';
import FilteredNavList from '@/components/organisms/nav-list/FilteredNavList';
import ReviewPagination from '@/components/organisms/review-pagination/ReviewPagination';
import React from 'react';

export default function FilteredActivities() {
  return (
    <>
      <div>
        <FilteredNavList />
        <DropdownMenu text="테스트">
          <p>테스트1</p>
          <p>테스트2</p>
        </DropdownMenu>
      </div>
      <h2>🛼 모든 체험</h2>
      <ActivityCardList />
      <ReviewPagination totalPage={1} currentPage={1} activityId={1} />
    </>
  );
}
