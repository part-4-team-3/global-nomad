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
      className="flex w-full snap-x snap-mandatory gap-[16px] overflow-x-auto scrollbar-hide md:gap-[24px] md:px-[24px]"
    >
      {activitiesData.activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} isBest />
      ))}
    </div>
  );
}
