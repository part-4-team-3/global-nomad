'use client';

import Button from '@/components/atoms/button/Button';
import SearchInput from '@/components/atoms/input/SearchInput';

export default function SearchActivity() {
  const handleSubmit = () => {};
  const handleChange = () => {};

  return (
    <div className="relative -top-60pxr flex flex-col gap-30pxr rounded-[16px] bg-white px-24pxr py-32pxr shadow-[0_4px_16px_0_rgba(17,34,17,0.05)]">
      <h3 className="text-20pxr font-[700]">무엇을 체험하고 싶으신가요?</h3>
      <form onSubmit={handleSubmit} className="flex w-full gap-12pxr">
        <SearchInput onChange={handleChange} />
        <Button
          text="검색하기"
          color="black"
          type="submit"
          className="rounded-4pxr h-56pxr px-40pxr"
        />
      </form>
    </div>
  );
}
