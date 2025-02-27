"use client";
import Image from "next/image";
import { FaFemale, FaMale } from "react-icons/fa";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";


const CountChart = ({ boys, girls }: { boys: number; girls: number }) => {
  const data = [
    {
      name: "Total",
      count: boys+girls,
      fill: "#cfddf1",
    },
    {
      name: "Girls",
      count: girls,
      fill: "#a484bc",
    },
    {
      name: "Boys",
      count: boys,
      fill: "#295fb6",
    },
  ];
  return (
    <div className="relative w-full h-[70%]">
      <ResponsiveContainer>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="40%"
          outerRadius="100%"
          barSize={28}
          data={data}
        >
          <RadialBar background dataKey="count" />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center text-6xl">
        <FaMale className="text-boys" />
        <FaFemale className="text-girls" />
      </div>
    </div>
  );
};

export default CountChart;