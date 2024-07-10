import Select from '@/components/molecules/select/Select';
import ReservationCalendar from '@/components/organisms/calendar/ReservationCalendar';

export default function MyReservation() {
  return (
    <div className="items-left flex w-750pxr flex-col justify-center">
      <h1 className="test-32pxr font-[700] text-[#000]">예약 현황</h1>

      <div className="relative mt-34pxr w-full">
        <p className="absolute left-[20px] top-[-10px] z-10 bg-white text-14pxr font-[400]">
          체험명
        </p>
        <Select options={['a', 'b']} />
      </div>

      <div className="mt-30pxr">
        <ReservationCalendar />
      </div>
    </div>
  );
}
