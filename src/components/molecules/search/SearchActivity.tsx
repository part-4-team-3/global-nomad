import Button from '@/components/atoms/button/Button';
import SearchInput from '@/components/atoms/input/SearchInput';

export default function SearchActivity() {
  const handleSubmit = () => {};
  const handleChange = () => {};

  return (
    <div>
      <h3>무엇을 체험하고 싶으신가요?</h3>
      <form onSubmit={handleSubmit} className="flex gap-12pxr">
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
