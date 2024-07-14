import ActivityCard from '@/components/molecules/card/ActivityCard';
import { ActivityResponse } from '@/types/activity';
import React, { LegacyRef } from 'react';

interface Props {
  activitiesData: ActivityResponse;
  carouselRef: LegacyRef<HTMLDivElement> | undefined;
}

export default function BestActivityCardList({ activitiesData, carouselRef }: Props) {
  return (
    <div
      ref={carouselRef}
      className="scrollbar-hide flex w-full snap-x snap-mandatory gap-[16px] overflow-x-auto md:gap-[24px]"
    >
      {activitiesData.activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} isBest />
      ))}
    </div>
  );
}
