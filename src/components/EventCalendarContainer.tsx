import Image from "next/image";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";
import { TfiMoreAlt } from "react-icons/tfi";

interface EventCalendarContainerProps {
  searchParams: { [key: string]: string | undefined };
}

const EventCalendarContainer = async ({
  searchParams,
}: EventCalendarContainerProps) => {
  const date = searchParams.date;
  return (
    <div className="rounded-xl w-full min-h-[403px] p-4 bg-seclightyellow dark:bg-darkgrey flex flex-col gap-6">
      <EventCalendar />
      <div className="flex justify-between items-center">
        <h1 className="capitalize text-md font-medium text-gray-500 dark:text-lightyellow">
          Events
        </h1>
        <TfiMoreAlt className="text-darkgrey/75 dark:text-yellow cursor-pointer" />
      </div>
      <div className="flex flex-col gap-6">
        <EventList dateParam={date} />
      </div>
    </div>
  );
};

export default EventCalendarContainer;
