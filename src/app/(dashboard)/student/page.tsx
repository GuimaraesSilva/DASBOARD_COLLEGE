import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarConteiner";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const StudentPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { userId } = await auth();

  const classItem = await prisma.class.findMany({
    where: {
      students: { some: { id: userId! } },
    },
  });

  if (classItem.length === 0) {
    return <div>No class found for this student</div>;
  }

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full p-4 rounded-xl bg-seclightyellow dark:bg-darkgrey">
          <h1 className="text-xl font-semibold text-darkgrey dark:text-extralightgrey">
            Schedule {classItem[0].name}
          </h1>
          <BigCalendarContainer
            type="classId"
            id={classItem[0].id}
            dateParam={searchParams.date}
            className="h-[600px]"
          />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <EventCalendarContainer searchParams={searchParams} />
        <Announcements dateParam={searchParams.date} />
      </div>
    </div>
  );
};

export default StudentPage;
