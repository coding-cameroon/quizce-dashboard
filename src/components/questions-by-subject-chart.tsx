"use client";

import { useMemo } from "react";
import { useGetAllSubjects } from "@/hooks/use-subjects";
import { useGetAllQuestions } from "@/hooks/use-questions";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  questions: {
    label: "Questions",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function QuestionsBySubjectChart() {
  const { data: subjects = [] } = useGetAllSubjects();
  const { data: questions = [] } = useGetAllQuestions();

  const chartData = useMemo(() => {
    // 1. Create a map for quick lookup: { [subjectId]: count }
    const counts = questions.reduce(
      (acc, q) => {
        // Assuming q.year.subjectId exists in your data structure
        const subId = q.year?.subjectId;
        if (subId) {
          acc[subId] = (acc[subId] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    // 2. Map subjects to the format Recharts expects
    return subjects.map((sub) => ({
      subject: sub.name,
      questions: counts[sub.id] || 0,
    }));
  }, [subjects, questions]);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4">
        <p className="text-sm font-semibold">Questions per Subject</p>
      </div>
      <ChartContainer config={chartConfig} className="h-56 w-full">
        <BarChart
          data={chartData}
          margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
        >
          <CartesianGrid vertical={false} stroke="var(--border)" />
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
