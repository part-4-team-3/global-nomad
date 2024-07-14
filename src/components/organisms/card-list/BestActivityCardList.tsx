import ActivityCard from '@/components/molecules/card/ActivityCard';
import { ActivityResponse } from '@/types/activity';
import React, { LegacyRef } from 'react';

interface Props {
  activitiesData: ActivityResponse;
  carouselRef: LegacyRef<HTMLUListElement> | undefined;
}

export default function BestActivityCardList({ activitiesData, carouselRef }: Props) {
  return (
    <ul
      ref={carouselRef}
      className="scrollbar-hide flex w-full snap-x snap-proximity gap-[24px] overflow-x-auto"
    >
      {activitiesData.activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} isBest />
      ))}
    </ul>
  );
}
