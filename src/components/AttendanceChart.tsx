"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const AttendanceChart = ({
  data,
}: {
  data: { name: string; present: number; absent: number }[];
}) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Color management based on theme
  const [colors, setColors] = useState({
    gridStroke: "#717F88",
    tickFill: "#333B41",
    presentBar: "#DAA749",
    absentBar: "#997739",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const isDark = theme === "dark" || resolvedTheme === "dark";
    setColors({
      gridStroke: isDark ? "#717F88" : "#717F88",
      tickFill: isDark ? "#F2F4F6" : "#333B41",
      presentBar: isDark ? "#DAA749" : "#DAA749",
      absentBar: isDark ? "#997739" : "#997739",
    });
  }, [theme, resolvedTheme, mounted]);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-seclightyellow dark:bg-darkgrey"></div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart
        width={500}
        height={350}
        data={data}
        barSize={10}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke={colors.gridStroke}
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tick={{ fill: colors.tickFill }}
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          tick={{ fill: colors.tickFill }}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            borderRadius: "10px",
            borderColor: "black",
            backgroundColor: theme === "dark" ? "#333B41" : "#ffffff",
          }}
          labelStyle={{ color: theme === "dark" ? "#F2F4F6" : "#333B41" }}
        />
        <Legend
          align="right"
          verticalAlign="top"
          wrapperStyle={{ paddingTop: "10px", paddingBottom: "20px" }}
          formatter={(value) => (
            <span style={{ color: colors.tickFill }}>{value}</span>
          )}
        />
        <Bar
          dataKey="present"
          fill={colors.presentBar}
          legendType="circle"
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="absent"
          fill={colors.absentBar}
          legendType="circle"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AttendanceChart;
