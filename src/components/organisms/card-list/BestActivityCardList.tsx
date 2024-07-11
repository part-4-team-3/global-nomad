import ActivityCard from '@/components/molecules/card/ActivityCard';
import BestActivityCard from '@/components/molecules/card/BestActivityCard';
import React from 'react';

export default function BestActivityCardList() {
  return (
    <div>
      <BestActivityCard />
      <br />
      <ActivityCard />
    </div>
  );
}
