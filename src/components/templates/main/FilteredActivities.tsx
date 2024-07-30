import InnerLayout from '@/components/atoms/inner-layout/InnerLayout';
import DropdownMenu from '@/components/molecules/dropdown-menu/DropdownMenu';
import Pagination from '@/components/molecules/pagination/Pagination';
import ActivityCardList from '@/components/organisms/card-list/ActivityCardList';
import FilteredNavList from '@/components/organisms/nav-list/FilteredNavList';
import makeQueryString from '@/lib/query-string';
import { getActivities } from '@/queries/activities/get-activities';
import { ActivityCategory, ActivitySort } from '@/types/activity';
import Link from 'next/link';
import React from 'react';

const sortList = [
  {
    title: '최신 순',
    query: 'latest',
  },
  {
    title: '가격이 낮은 순',
    query: 'price_asc',
  },
  {
    title: '가격이 높은 순',
    query: 'price_desc',
  },
  {
    title: '댓글 많은 순',
    query: 'most_reviewed',
  },
];

interface Props {
  searchParams: { category: ActivityCategory | '모든 체험'; sort: ActivitySort; page: number };
}

export default async function FilteredActivities({ searchParams }: Props) {
  const sortMethod = searchParams.sort ? searchParams.sort : 'latest';

  const { activities, totalCount } = await getActivities({
    method: 'offset',
    size: 8,
    category: searchParams.category === '모든 체험' ? undefined : searchParams.category,
    sort: searchParams.sort ? searchParams.sort : 'latest',
    page: searchParams.page ? searchParams.page : 1,
  });

  const getDropDownTitleByQuery = (queryString: string) => {
    const result = sortList.find((sort) => sort.query === queryString);
    return result ? result.title : '최신 순';
  };

  return (
    <InnerLayout className="mb-[150px] mt-[30px] md:mb-[250px] md:mt-[50px]">
      <div className="flex flex-col items-end justify-between gap-[30px] md2:flex-row md2:items-center">
        <FilteredNavList
          currentCategory={searchParams.category}
          searchParamsSort={searchParams.sort}
        />
        <DropdownMenu text={getDropDownTitleByQuery(sortMethod)} className="!w-fit shrink-0">
          {sortList.map((sort) => (
            <Link
              key={sort.query}
              className="w-full"
              href={makeQueryString({ ...searchParams, ...{ sort: sort.query } })}
              scroll={false}
            >
              {sort.title}
            </Link>
          ))}
        </DropdownMenu>
      </div>
      <h2 className="-mt-[35px] text-18pxr font-[700] md:-mt-[52px] md:text-36pxr md2:mt-[30px]">
        {searchParams.category === '모든 체험' || !searchParams.category
          ? '🛼 모든 체험'
          : searchParams.category}
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
