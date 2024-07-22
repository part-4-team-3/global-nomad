import Button from '@/components/atoms/button/Button';
import { addSearchParam } from '@/lib/query-string';
import { ActivityCategory } from '@/types/activity';

interface Props {
  currentCategory: ActivityCategory | '모든 체험';
  searchParamsSort: {};
}

export default function FilteredNavList({
  currentCategory = '모든 체험',
  searchParamsSort,
}: Props) {
  const categoryList = ['모든 체험', '문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

  return (
    <div className="relative w-[calc(100%-300px)] grow after:absolute after:right-[0] after:top-[0] after:block after:h-full after:w-70pxr after:bg-gradient-to-r after:from-transparent after:to-white">
      <ul className="flex w-full gap-[8px] overflow-x-auto pr-[70px] scrollbar-hide md:gap-[16px] lg:gap-[24px]">
        {categoryList.map((category) => (
          <li key={category}>
            <Button
              text={category}
              color="white"
              className={`w-80pxr !rounded-[15px] !border-var-green-dark py-[8px] !font-[500] md:w-120pxr md:py-[14px] lg:w-127pxr ${currentCategory === category ? '!bg-var-green-dark !text-white' : '!text-var-green-dark'}`}
              link={
                category === '모든 체험'
                  ? addSearchParam({ category: '모든 체험' }, searchParamsSort)
                  : addSearchParam({ category }, searchParamsSort)
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
