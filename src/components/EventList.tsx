import prisma from "@/lib/prisma";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  const date = dateParam ? new Date(dateParam) : new Date();

  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });

  return data.map((event) => (
    <div
      className="p-2 rounded-md border-2 border-yellow border-t-4 border-t-yellow dark:border-lightgrey dark:border-t-lightgrey "
      key={event.id}
    >
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-sm text-darkgrey/75 dark:text-yellow">
          {event.title}
        </h1>
        <span className="text-darkgrey/75 dark:text-yellow text-xs">
          {event.startTime.toLocaleTimeString("en-UK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </div>
      <p className="mt-2 text-xs text-darkgrey/75 dark:text-extralightgrey">
        {event.description}
      </p>
    </div>
  ));
};

export default EventList;
