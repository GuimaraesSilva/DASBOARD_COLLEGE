"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const localizer = momentLocalizer(moment);

const BigCalendar = ({
  data,
  selectedDate,
}: {
  data: { title: string; start: Date; end: Date }[];
  selectedDate?: Date;
}) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);
  const [currentDate, setCurrentDate] = useState<Date>(
    selectedDate || new Date()
  );
  const searchParams = useSearchParams();
  const router = useRouter();

  const events = useMemo(() => {
    return data.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));
  }, [data]);

  useEffect(() => {
    const dateParam = searchParams.get("date");
    if (dateParam) {
      const parsedDate = new Date(dateParam);
      if (!isNaN(parsedDate.getTime())) {
        setCurrentDate(parsedDate);
      }
    } else if (selectedDate && !isNaN(selectedDate.getTime())) {
      setCurrentDate(selectedDate);
    } else {
      setCurrentDate(new Date());
    }
  }, [searchParams, selectedDate]);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate);

    const params = new URLSearchParams(searchParams.toString());
    const formattedDate = moment(newDate).format("YYYY-MM-DD");
    params.set("date", formattedDate);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "100%" }}
      onView={handleOnChangeView}
      date={currentDate}
      onNavigate={handleNavigate}
      min={new Date(2023, 1, 1, 8, 0, 0)}
      max={new Date(2023, 1, 1, 17, 0, 0)}
      defaultView={Views.WORK_WEEK}
    />
  );
};

export default BigCalendar;
