"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTheme } from "next-themes";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const { theme, resolvedTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (value instanceof Date) {
      router.push(`?date=${value}`);
    }
  }, [value, router]);

  const isDark = theme === "dark" || resolvedTheme === "dark";

  return (
    <div className="overflow-hidden">
      <Calendar
        className="custom-calendar border-none text-darkgrey dark:text-lightyellow"
        onChange={onChange}
        value={value}
        tileClassName={({ date, view }) => {
          const isCurrentMonth =
            date.getMonth() ===
            (value instanceof Date ? value.getMonth() : new Date().getMonth())
              ? value instanceof Date
                ? value.getMonth()
                : new Date().getMonth()
              : new Date().getMonth();

          if (view === "month") {
            const isToday =
              date.getDate() === new Date().getDate() &&
              date.getMonth() === new Date().getMonth() &&
              date.getFullYear() === new Date().getFullYear();

            return `
              calendar-tile 
              ${isCurrentMonth ? "current-month" : "other-month"} 
              ${isToday ? "today" : ""}
              text-sm p-1  transition-colors duration-200
              ${
                isCurrentMonth
                  ? "text-darkgrey dark:text-lightyellow"
                  : "text-gray-400 dark:text-gray-500"
              }
              ${isToday ? "bg-yellow/20 dark:bg-yellow/30 font-semibold" : ""}
              hover:bg-yellow/30 dark:hover:bg-lightyellow/20
              dark:hover:text-black
            `;
          }
          return null;
        }}
        navigationLabel={({ date }) =>
          date.toLocaleDateString("default", { month: "long", year: "numeric" })
        }
        prevLabel={<span className="navigation-arrow">❮</span>}
        nextLabel={<span className="navigation-arrow">❯</span>}
        prev2Label={<span className="navigation-arrow">❮❮</span>}
        next2Label={<span className="navigation-arrow">❯❯</span>}
        showNeighboringMonth={false}
        formatDay={(locale, date) => date.getDate().toString()}
        formatShortWeekday={(locale, date) =>
          ["D", "S", "T", "Q", "Q", "S", "S"][date.getDay()]
        }
        tileContent={({ date, view }) => {
          if (view === "month") {
            const hasEvent = false;
            return (
              <div className="tile-content flex justify-center mt-1">
                {hasEvent && (
                  <div className="h-1 w-1 rounded-full bg-yellow dark:bg-lightyellow"></div>
                )}
              </div>
            );
          }
          return null;
        }}
      />
    </div>
  );
};

export default EventCalendar;
