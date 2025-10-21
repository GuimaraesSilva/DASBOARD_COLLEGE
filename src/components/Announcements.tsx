import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

const Announcements = async ({ dateParam }: { dateParam?: string }) => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };

  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          { class: roleConditions[role as keyof typeof roleConditions] || {} },
        ],
      }),
    },
  });

  return (
    <div className="p-4 rounded-xl bg-seclightyellow dark:bg-darkgrey">
      <div className="flex items-center justify-between">
        <h1 className="capitalize text-md font-medium text-gray-500 dark:text-lightyellow">
          Announcements
        </h1>
        <Link
          href={`/list/announcements?month=${currentMonth}&year=${currentYear}`}
          className="text-xs text-darkgrey/75 dark:text-yellow hover:underline cursor-pointer"
        >
          View All
        </Link>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {data.length > 0 ? (
          <>
            {data[0] && (
              <div className="dark:bg-lightgrey bg-lightyellow rounded-md p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-md text-darkgrey dark:text-seclightyellow">
                    {data[0].title}
                  </h2>
                  <span className="text-xs text-black rounded-md px-1 py-1">
                    {new Intl.DateTimeFormat("en-GB").format(data[0].date)}
                  </span>
                </div>
                <p className="text-xs text-black dark:text-text mt-1">
                  {data[0].description}
                </p>
              </div>
            )}
            {data[1] && (
              <div className="dark:bg-lightgrey bg-lightyellow rounded-md p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-md text-darkgrey dark:text-seclightyellow">
                    {data[1].title}
                  </h2>
                  <span className="text-xs text-black rounded-md px-1 py-1">
                    {new Intl.DateTimeFormat("en-GB").format(data[1].date)}
                  </span>
                </div>
                <p className="text-xs text-black dark:text-text mt-1">
                  {data[1].description}
                </p>
              </div>
            )}
            {data[2] && (
              <div className="dark:bg-lightgrey bg-lightyellow rounded-md p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-md text-darkgrey dark:text-seclightyellow">
                    {data[2].title}
                  </h2>
                  <span className="text-xs text-black rounded-md px-1 py-1">
                    {new Intl.DateTimeFormat("en-GB").format(data[2].date)}
                  </span>
                </div>
                <p className="text-xs text-black dark:text-text mt-1">
                  {data[2].description}
                </p>
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-lightgrey dark:text-lightyellow text-center py-4">
            No announcements available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Announcements;
