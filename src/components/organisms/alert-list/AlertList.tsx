import AlertCard from '@/components/molecules/card/AlertCard';

export default function AlertList() {
  return (
    <ol className="flex flex-col gap-[8px]">
      <AlertCard />
      <AlertCard />
    </ol>
  );
}
