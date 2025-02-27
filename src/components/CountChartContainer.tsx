import { TfiMoreAlt } from "react-icons/tfi";
import CountChart from "./CountChart";
import prisma from "@/lib/prisma";

const CountChartContainer = async () => {
  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });

  const boys = data.find((d) => d.sex === "MALE")?._count || 0;
  const girls = data.find((d) => d.sex === "FEMALE")?._count || 0;

  return (
    <div className="bg-tertiary rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-secondary text-lg font-semibold">Students</h1>
        <TfiMoreAlt className="text-primary" />
      </div>
      {/* CHART */}
      <CountChart boys={boys} girls={girls} />
      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-boys rounded-full" />
          <h1 className="font-bold text-secondary">{boys}</h1>
          <h2 className="text-xs text-secondary">
            Boys ({Math.round((boys / (boys + girls)) * 100)}%)
          </h2> 
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-girls rounded-full" />
          <h1 className="text-secondary font-bold">{girls}</h1>
          <h2 className="text-xs text-secondary">
            Girls ({Math.round((girls / (boys + girls)) * 100)}%)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountChartContainer;