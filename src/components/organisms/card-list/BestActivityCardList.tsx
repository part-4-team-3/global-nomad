import ActivityCard from '@/components/molecules/card/ActivityCard';
import { ActivityResponse } from '@/types/activity';
import React from 'react';

interface Props {
  activitiesData: ActivityResponse;
}

export default function BestActivityCardList({ activitiesData }: Props) {
  return (
    <ul className="flex flex-wrap gap-[24px]">
      {activitiesData.activities.map((activity) => (
        <li key={activity.id}>
          <ActivityCard activity={activity} isBest />
        </li>
      ))}
    </ul>
  );
}
