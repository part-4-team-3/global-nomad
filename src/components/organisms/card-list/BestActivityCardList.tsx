import ActivityCard from '@/components/molecules/card/ActivityCard';
import { ActivityResponse } from '@/types/activity';
import React, { LegacyRef } from 'react';

interface Props {
  activitiesData: ActivityResponse;
  carouselRef: LegacyRef<HTMLDivElement> | undefined;
}

export default function BestActivityCardList({ activitiesData, carouselRef }: Props) {
  return (
    <div className="w-full">
      <div
        ref={carouselRef}
        className="flex snap-x snap-mandatory scroll-px-[16px] gap-[16px] overflow-x-auto px-[16px] scrollbar-hide md:scroll-px-[24px] md:gap-[24px] md:px-[24px]"
      >
        {activitiesData.activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} isBest />
        ))}
      </div>
    </div>
  );
}
