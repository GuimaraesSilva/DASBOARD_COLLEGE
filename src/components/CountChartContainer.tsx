import Image from "next/image";
import CountChart from "./CountChart";
import prisma from "@/lib/prisma";
import { TfiMoreAlt } from "react-icons/tfi";
import { FaCircle } from "react-icons/fa";

const CountChartContainer = async () => {
  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });

  const boys = data.find((d) => d.sex === "MALE")?._count || 0;
  const girls = data.find((d) => d.sex === "FEMALE")?._count || 0;

  return (
    <div className="rounded-xl w-full h-full p-4 bg-seclightyellow dark:bg-darkgrey">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="capitalize text-md font-medium text-gray-500 dark:text-lightyellow">
          Students
        </h1>
        <TfiMoreAlt className="text-darkgrey/75 dark:text-yellow cursor-pointer" />
      </div>
      {/* CHART */}
      <CountChart boys={boys} girls={girls} />
      {/* BOTTOM */}
      <div className="flex justify-center gap-4">
        <div className="flex items-center gap-1">
          <FaCircle className="text-2xl text-boys" />
          <h1 className="font-bold text-gray-500 dark:text-lightyellow">
            {boys}
          </h1>
          <h2 className="text-xs text-darkgrey/75 dark:text-yellow">Boys</h2>
          <h2 className="text-xs text-darkgrey/75 dark:text-yellow">
            ({Math.round((boys / (boys + girls)) * 100)}%)
          </h2>
        </div>
        <div className="flex items-center gap-1">
          <FaCircle className="text-2xl text-girls" />
          <h1 className="font-bold text-gray-500 dark:text-lightyellow">
            {girls}
          </h1>
          <h2 className="text-xs text-darkgrey/75 dark:text-yellow">Girls</h2>
          <h2 className="text-xs text-darkgrey/75 dark:text-yellow">
            ({Math.round((girls / (boys + girls)) * 100)}%)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountChartContainer;
