"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Cell, Pie, PieChart } from "recharts";

const data = [
  { level: "Ordinary Level", questions: 1_120 },
  { level: "Advanced Level", questions: 340 },
];

const chartConfig = {
  "Ordinary Level": {
    label: "Ordinary Level",
    color: "var(--chart-1)",
  },
  "Advanced Level": {
    label: "Advanced Level",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function QuestionsByLevelChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4">
        <p className="text-sm font-semibold">Questions by Level</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Distribution of questions between academic levels.
        </p>
      </div>
      <ChartContainer config={chartConfig} className="h-56 w-full">
        <PieChart>
          <Pie
            data={data}
            dataKey="questions"
            nameKey="level"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                key={entry.level}
                fill={
                  entry.level === "Ordinary Level"
                    ? "hsl(var(--chart-1))"
                    : "hsl(var(--chart-2))"
                }
              />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
