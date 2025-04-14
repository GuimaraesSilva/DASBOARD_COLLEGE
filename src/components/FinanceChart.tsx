"use client";

import Image from "next/image";
import { TfiMoreAlt } from "react-icons/tfi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const data = [
  {
    name: "Jan",
    income: 4000,
    expense: 2400,
  },
  {
    name: "Feb",
    income: 3000,
    expense: 1398,
  },
  {
    name: "Mar",
    income: 2000,
    expense: 9800,
  },
  {
    name: "Apr",
    income: 2780,
    expense: 3908,
  },
  {
    name: "May",
    income: 1890,
    expense: 4800,
  },
  {
    name: "Jun",
    income: 2390,
    expense: 3800,
  },
  {
    name: "Jul",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Aug",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Sep",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Oct",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Nov",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Dec",
    income: 3490,
    expense: 4300,
  },
];

const FinanceChart = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

  return (
    <div
      className="rounded-xl w-full p-4 bg-seclightyellow dark:bg-darkgrey"
      style={{ height: "332px" }}
    >
      <div className="flex justify-between items-center mb-2">
        <h1 className="capitalize text-md font-medium text-gray-500 dark:text-lightyellow">
          Finance
        </h1>
        <TfiMoreAlt className="text-darkgrey/75 dark:text-yellow cursor-pointer" />
      </div>
      <div style={{ height: "calc(100% - 30px)" }}>
        {" "}
        {/* Reserva espaço para o título */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#717F88" : "#f1f0ff"}
              vertical={false}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{ fill: isDark ? "#F2F4F6" : "#717F88" }}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: isDark ? "#F2F4F6" : "#717F88" }}
              tickLine={false}
              tickMargin={20}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#333B41" : "#ffffff",
                borderColor: "transparent",
                borderRadius: "5px",
              }}
              labelStyle={{ color: isDark ? "#F2F4F6" : "#333B41" }}
            />
            <Legend
              align="center"
              verticalAlign="top"
              wrapperStyle={{
                paddingBottom: "15px",
              }}
              formatter={(value) => (
                <span style={{ color: isDark ? "#F2F4F6" : "#333B41" }}>
                  {value}
                </span>
              )}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke={isDark ? "#DAA749" : "#997739"}
              strokeWidth={3}
              dot={{ strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke={isDark ? "#D9C392" : "#333B41"}
              strokeWidth={3}
              dot={{ strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinanceChart;
