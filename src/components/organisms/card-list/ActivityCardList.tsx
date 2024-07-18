import ActivityCard from '@/components/molecules/card/ActivityCard';
import { Activity } from '@/types/activity';

interface Props {
  activityList: Activity[];
}

export default function ActivityCardList({ activityList }: Props) {
  return (
    <ul className="mt-[32px]">
      {activityList.map((activity) => (
        <li key={activity.id}>
          <ActivityCard activity={activity} />
        </li>
      ))}
    </ul>
  );
}
