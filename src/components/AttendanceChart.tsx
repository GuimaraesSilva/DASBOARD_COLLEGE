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
    return <div className="w-full h-full" />;
  }

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barSize={15}
          margin={{ top: 5, right: 5, left: -25, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke={colors.gridStroke}
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: colors.tickFill, fontSize: 12 }}
            tickLine={false}
            dy={5}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: colors.tickFill, fontSize: 12 }}
            tickLine={false}
            dx={-5}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "5px",
              borderColor: "transparent",
              backgroundColor: theme === "dark" ? "#333B41" : "#ffffff",
              padding: "5px 8px",
              fontSize: "12px",
            }}
            labelStyle={{ color: theme === "dark" ? "#F2F4F6" : "#333B41" }}
          />
          <Legend
            align="right"
            verticalAlign="top"
            iconSize={8}
            wrapperStyle={{
              paddingTop: "5px",
              paddingBottom: "8px",
              fontSize: "14px",
            }}
            formatter={(value) => (
              <span style={{ color: colors.tickFill }}>{value}</span>
            )}
          />
          <Bar
            dataKey="present"
            fill={colors.presentBar}
            legendType="circle"
            radius={[5, 5, 0, 0]}
          />
          <Bar
            dataKey="absent"
            fill={colors.absentBar}
            legendType="circle"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
