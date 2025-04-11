import Image from "next/image";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";

interface EventCalendarContainerProps {
  searchParams: { [key: string]: string | undefined };
}

const EventCalendarContainer = async ({
  searchParams,
}: EventCalendarContainerProps) => {
  const date = searchParams.date;
  return (
    <div className="bg-white p-4 rounded-md">
      <EventCalendar />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        <EventList dateParam={date} />
      </div>
    </div>
  );
};

export default EventCalendarContainer;
