import Image from "next/image";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";
import { TfiMoreAlt } from "react-icons/tfi";

const EventCalendarContainer = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  const { date } = searchParams;
  return (
    <div className="bg-tertiary p-4 rounded-md">
      <div className="rounded-md bg-tertiary">
        <EventCalendar />
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl text-secondary font-semibold my-4">Events</h1>
        <TfiMoreAlt className="text-primary" />
      </div>
      <div className="flex flex-col gap-4">
        <EventList dateParam={date} />
      </div>
    </div>
  );
};

export default EventCalendarContainer;