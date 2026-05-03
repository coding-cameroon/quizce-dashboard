"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const data = [
  { subject: "Mathematics", questions: 300 },
  { subject: "Physics", questions: 250 },
  { subject: "Chemistry", questions: 240 },
  { subject: "Accounting", questions: 220 },
  { subject: "Economics", questions: 190 },
  { subject: "Commerce", questions: 180 },
  { subject: "Literature", questions: 180 },
  { subject: "Geography", questions: 160 },
  { subject: "History", questions: 150 },
  { subject: "Biology", questions: 200 },
  { subject: "F. Maths", questions: 120 },
];

const chartConfig = {
  questions: {
    label: "Questions",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function QuestionsBySubjectChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4">
        <p className="text-sm font-semibold">Questions per Subject</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Total questions across all sessions per subject.
        </p>
      </div>
      <ChartContainer config={chartConfig} className="h-56 w-full">
        <BarChart
          data={data}
          margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
        >
          <CartesianGrid vertical horizontal stroke="var(--border)" />
          <XAxis
            dataKey="subject"
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="questions"
            fill="var(--color-questions)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
