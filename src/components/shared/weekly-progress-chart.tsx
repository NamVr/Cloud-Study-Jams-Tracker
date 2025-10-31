"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";

const chartConfig = {
  "Completion Rate": {
    label: "Completion Rate",
    color: "hsl(var(--google-yellow))",
  },
} satisfies ChartConfig;

export function WeeklyProgressChart({ data }: { data: any[] }) {
  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <BarChart data={data} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 6)}
        />
        <YAxis />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar
          dataKey="Completion Rate"
          fill="var(--color-Completion Rate)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
}
