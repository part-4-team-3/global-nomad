import Button from '@/components/atoms/button/Button';

export default function FilteredNavList() {
  const categoryList = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];
  return (
    <ul className="flex gap-[24px]">
      {categoryList.map((category) => (
        <li key={category}>
          <Button
            text={category}
            color="white"
            className="w-127pxr !rounded-[15px] py-[14px]"
            link={`/?category=${category}`}
          />
        </li>
      ))}
    </ul>
  );
}
