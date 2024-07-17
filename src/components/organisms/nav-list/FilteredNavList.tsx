import Button from '@/components/atoms/button/Button';

export default function FilteredNavList() {
  const categoryList = [
    {
      title: '문화 · 예술',
      link: 'culture',
    },
    {
      title: '식음료',
      link: 'food',
    },
    {
      title: '스포츠',
      link: 'sports',
    },
    {
      title: '투어',
      link: 'tour',
    },
    {
      title: '관광',
      link: 'sightseeing',
    },
    {
      title: '웰빙',
      link: 'wellbeing',
    },
  ];
  return (
    <ul className="flex gap-[24px]">
      {categoryList.map((category) => (
        <li key={category.title}>
          <Button
            text={category.title}
            color="white"
            className="w-127pxr !rounded-[15px] py-[14px]"
            link={`/?category=${category.link}`}
          />
        </li>
      ))}
    </ul>
  );
}
