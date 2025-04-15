import prisma from "@/lib/prisma";
import BigCalendar from "./BigCalender";
import { adjustScheduleToSelectedWeek } from "@/lib/utils";

const BigCalendarContainer = async ({
  type,
  id,
  dateParam,
  className = "",
}: {
  type: "teacherId" | "classId";
  id: string | number;
  dateParam?: string;
  className?: string;
}) => {
  const selectedDate = dateParam ? new Date(dateParam) : new Date();

  // Buscar lições do banco de dados
  const dataRes = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId"
        ? { teacherId: id as string }
        : { classId: Number(id) }),
    },
    include: {
      subject: true,
      class: true,
      teacher: true,
    },
  });

  const data = dataRes.map((lesson) => ({
    title: `${lesson.name} - ${lesson.subject?.name || ""} (${
      lesson.class?.name || ""
    })`, // Título mais descritivo
    start: new Date(lesson.startTime),
    end: new Date(lesson.endTime),
    resource: {
      teacher: `${lesson.teacher?.name || ""} ${lesson.teacher?.surname || ""}`, // Informações adicionais
      classInfo: lesson.class?.name || "",
      subject: lesson.subject?.name || "",
    },
  }));

  const schedule = adjustScheduleToSelectedWeek(data, selectedDate);

  return (
    <div
      className={`rounded-xl bg-seclightyellow dark:bg-darkgrey ${className}`}
    >
      <BigCalendar data={schedule} selectedDate={selectedDate} />
    </div>
  );
};

export default BigCalendarContainer;
