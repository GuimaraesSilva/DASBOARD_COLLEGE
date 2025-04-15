// IT APPEARS THAT BIG CALENDAR SHOWS THE LAST WEEK WHEN THE CURRENT DAY IS A WEEKEND.
// FOR THIS REASON WE'LL GET THE LAST WEEK AS THE REFERENCE WEEK.
// IN THE TUTORIAL WE'RE TAKING THE NEXT WEEK AS THE REFERENCE WEEK.

const getLatestMonday = (): Date => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const latestMonday = today;
  latestMonday.setDate(today.getDate() - daysSinceMonday);
  return latestMonday;
};

export const adjustScheduleToCurrentWeek = (
  lessons: { title: string; start: Date; end: Date }[]
): { title: string; start: Date; end: Date }[] => {
  const latestMonday = getLatestMonday();

  return lessons.map((lesson) => {
    const lessonDayOfWeek = lesson.start.getDay();

    const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1;

    const adjustedStartDate = new Date(latestMonday);

    adjustedStartDate.setDate(latestMonday.getDate() + daysFromMonday);
    adjustedStartDate.setHours(
      lesson.start.getHours(),
      lesson.start.getMinutes(),
      lesson.start.getSeconds()
    );
    const adjustedEndDate = new Date(adjustedStartDate);
    adjustedEndDate.setHours(
      lesson.end.getHours(),
      lesson.end.getMinutes(),
      lesson.end.getSeconds()
    );

    return {
      title: lesson.title,
      start: adjustedStartDate,
      end: adjustedEndDate,
    };
  });
};

export const adjustScheduleToSelectedWeek = (
  lessons: { title: string; start: Date; end: Date }[],
  selectedDate: Date
): { title: string; start: Date; end: Date }[] => {
  if (!lessons || lessons.length === 0) {
    return [];
  }

  const selectedDateObj = new Date(selectedDate);

  const startOfWeek = new Date(selectedDateObj);
  const day = selectedDateObj.getDay() || 7;
  if (day !== 1) {
    startOfWeek.setDate(selectedDateObj.getDate() - (day - 1));
  }
  startOfWeek.setHours(0, 0, 0, 0);

  return lessons.map((lesson) => {
    const originalStart = new Date(lesson.start);
    const originalEnd = new Date(lesson.end);

    const lessonStartHour = originalStart.getHours();
    const lessonStartMinute = originalStart.getMinutes();
    const lessonStartSecond = originalStart.getSeconds();
    const lessonStartMs = originalStart.getMilliseconds();

    const lessonEndHour = originalEnd.getHours();
    const lessonEndMinute = originalEnd.getMinutes();
    const lessonEndSecond = originalEnd.getSeconds();
    const lessonEndMs = originalEnd.getMilliseconds();

    const lessonDayOfWeek = originalStart.getDay();

    const newStart = new Date(startOfWeek);
    newStart.setDate(
      startOfWeek.getDate() + (lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1)
    );
    newStart.setHours(
      lessonStartHour,
      lessonStartMinute,
      lessonStartSecond,
      lessonStartMs
    );

    const newEnd = new Date(startOfWeek);
    newEnd.setDate(
      startOfWeek.getDate() + (lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1)
    );
    newEnd.setHours(
      lessonEndHour,
      lessonEndMinute,
      lessonEndSecond,
      lessonEndMs
    );

    return {
      title: lesson.title,
      start: newStart,
      end: newEnd,
    };
  });
};
