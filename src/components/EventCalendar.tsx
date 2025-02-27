"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  const router = useRouter();

  useEffect(() => {
    if (value instanceof Date) {
      router.push(`?date=${value}`);
    }
  }, [value, router]);


  // return (
  //   <Calendar
  //     onChange={onChange}
  //     value={value}
  //     className="p-4 rounded-lg bg-tertiary text-white border border-gray-600"
  //   />
  // );

  return (
    <div className="bg-tertiary">
      <Calendar
        onChange={onChange}
        value={value}
        className="custom-calendar"
      />
      <style jsx global>{`
        .custom-calendar {
          background-color: #889dc8; /* Cor de fundo */
          color: white; /* Cor do texto */
          border-radius: 8px;
          padding: 10px;
          border: 1px solid #444;
        }

        /* Estilizar os dias do calendário */
        .react-calendar__tile {
          background: transparent;
          color: white;
          border-radius: 6px;
          padding: 10px;
        }

        .react-calendar__tile--active {
          background: #151b54 !important;
          color: white !important;
        }

        .react-calendar__tile:hover {
          background: #4a90e2;
          color: white;
        }

        /* Cabeçalho do calendário */
        .react-calendar__navigation {
          background: #889dc8;
          border-radius: 6px;
          padding: 5px;
        }

        .react-calendar__navigation button {
          color: white;
          border-radius: 6px;
        }

        /* Dias da semana */
        .react-calendar__month-view__weekdays {
          background: #889dc8;
          color: white;
          border-radius: 6px;
          padding: 5px;
        }
      `}</style>
    </div>
  );
};

export default EventCalendar;