import Header from '@/components/templates/my-activity/Header';
import Main from '@/components/templates/my-activity/Main';

export default function ReservationList() {
  return (
    <div className="flex flex-col gap-16pxr lg:gap-24pxr">
      <Header />
      <Main />
    </div>
  );
}