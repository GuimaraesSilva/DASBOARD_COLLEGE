import Image from "next/image";
import AttendanceChart from "./AttendanceChart";
import prisma from "@/lib/prisma";
import { TfiMoreAlt } from "react-icons/tfi";

// Add dateParam as optional parameter
const AttendanceChartContainer = async ({
  dateParam,
}: {
  dateParam?: string;
}) => {
  // Use the provided date or default to today
  const selectedDate = dateParam ? new Date(dateParam) : new Date();
  const dayOfWeek = selectedDate.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  // Calculate the Monday of the week containing the selected date
  const weekStart = new Date(selectedDate);
  weekStart.setDate(selectedDate.getDate() - daysSinceMonday);
  weekStart.setHours(0, 0, 0, 0);

  // Calculate the end of the week (Friday)
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 4);
  weekEnd.setHours(23, 59, 59, 999);

  const resData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: weekStart,
        lte: weekEnd,
      },
    },
    select: {
      date: true,
      present: true,
    },
  });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const attendanceMap: { [key: string]: { present: number; absent: number } } =
    {
      Mon: { present: 0, absent: 0 },
      Tue: { present: 0, absent: 0 },
      Wed: { present: 0, absent: 0 },
      Thu: { present: 0, absent: 0 },
      Fri: { present: 0, absent: 0 },
    };

  resData.forEach((item) => {
    const itemDate = new Date(item.date);
    const dayOfWeek = itemDate.getDay();

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const dayName = daysOfWeek[dayOfWeek - 1];

      if (item.present) {
        attendanceMap[dayName].present += 1;
      } else {
        attendanceMap[dayName].absent += 1;
      }
    }
  });

  const data = daysOfWeek.map((day) => ({
    name: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }));

  return (
    <div className="bg-seclightyellow dark:bg-darkgrey rounded-xl p-4 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="capitalize text-md font-medium text-gray-500 dark:text-lightyellow">
          Attendance
        </h1>
        <TfiMoreAlt className="text-darkgrey/75 dark:text-yellow cursor-pointer" />
      </div>
      <div className="flex-1 w-full">
        <AttendanceChart data={data} />
      </div>
    </div>
  );
};

export default AttendanceChartContainer;
