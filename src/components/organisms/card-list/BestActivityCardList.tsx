import ActivityCard from '@/components/molecules/card/ActivityCard';
import React from 'react';

export default function BestActivityCardList() {
  return (
    <div>
      <ActivityCard isBest />
      <br />
      <ActivityCard />
    </div>
  );
}
