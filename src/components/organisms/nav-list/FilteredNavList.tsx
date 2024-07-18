import Button from '@/components/atoms/button/Button';
import { ActivityCategory } from '@/types/activity';

interface Props {
  currentCategory: ActivityCategory;
}

export default function FilteredNavList({ currentCategory }: Props) {
  const categoryList = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

  return (
    <ul className="flex gap-[24px]">
      {categoryList.map((category) => (
        <li key={category}>
          <Button
            text={category}
            color="white"
            className={`w-127pxr !rounded-[15px] !border-var-green-dark py-[14px] !font-[500] ${currentCategory === category ? '!bg-var-green-dark !text-white' : '!text-var-green-dark'}`}
            link={`/?category=${category}`}
          />
        </li>
      ))}
    </ul>
  );
}
