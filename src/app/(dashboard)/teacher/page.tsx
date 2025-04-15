import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarConteiner";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import { auth } from "@clerk/nextjs/server";

const TeacherPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { userId } = await auth();

  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 ">
        <div className="p-4 rounded-xl bg-seclightyellow dark:bg-darkgrey">
          <h1 className="text-xl font-semibold text-darkgrey dark:text-extralightgrey">
            Schedule
          </h1>
          <BigCalendarContainer
            type="teacherId"
            id={userId!}
            dateParam={searchParams.date}
            className="h-[600px]"
          />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        <EventCalendarContainer searchParams={searchParams} />
        <Announcements dateParam={searchParams.date} />
      </div>
    </div>
  );
};

export default TeacherPage;
