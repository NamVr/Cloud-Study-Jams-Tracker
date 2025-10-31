"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { type Team } from "@/lib/types";
import { Area, AreaChart, XAxis } from "recharts";

const chartConfig = {
  value: {
    label: "Progress",
  },
};

export function TeamProgressChart({ team }: { team: Team }) {
  return (
    <div className="h-[100px]">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <AreaChart
          accessibilityLayer
          data={team.progressHistory}
          margin={{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id={`fill-${team.rank}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={team.color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={team.color} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Area
            dataKey="value"
            type="natural"
            fill={`url(#fill-${team.rank})`}
            stroke={team.color}
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
