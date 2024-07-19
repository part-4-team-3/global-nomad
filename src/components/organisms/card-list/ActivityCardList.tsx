import ActivityCard from '@/components/molecules/card/ActivityCard';
import { Activity } from '@/types/activity';

interface Props {
  activityList: Activity[];
}

export default function ActivityCardList({ activityList }: Props) {
  return (
    <ul className="mt-[24px] grid grid-cols-2 gap-x-[8px] gap-y-[24px] md:mt-[32px] md:gap-x-[16px] md:gap-y-[32px] lg:grid-cols-4 lg:gap-x-[24px] lg:gap-y-[48px]">
      {activityList.map((activity) => (
        <li key={activity.id}>
          <ActivityCard activity={activity} />
        </li>
      ))}
    </ul>
  );
}
