"use client";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { FaMale, FaFemale } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const CountChart = ({ boys, girls }: { boys: number; girls: number }) => {
  const total = boys + girls;
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const isDarkTheme = theme === "dark" || resolvedTheme === "dark";

    setChartData([
      {
        name: "Total",
        count: total,
        fill: isDarkTheme ? "#333B41" : "#e6dcc5",
        visibility: "hidden",
        stroke: "transparent",
      },
      {
        name: "Girls",
        count: girls,
        fill: "#a484bc",
        stroke: "transparent",
      },
      {
        name: "Boys",
        count: boys,
        fill: "#295fb6",
        stroke: "transparent",
      },
    ]);
  }, [theme, resolvedTheme, mounted, boys, girls, total]);

  // if (!mounted) return null;

  return (
    <div className="w-full h-[200px] flex justify-center items-center my-2">
      <div className="relative w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="55%"
            outerRadius="115%"
            barSize={20}
            data={chartData}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar background dataKey="count" cornerRadius={50} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1">
          <FaMale size={80} className="text-boys -mr-4" />
          <FaFemale size={80} className="text-girls -ml-4" />
        </div>
      </div>
    </div>
  );
};

export default CountChart;
