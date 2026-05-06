"use client";

import {
  BookOpen,
  CalendarDays,
  FileQuestion,
  GraduationCap,
  ImageIcon,
  Layers,
} from "lucide-react";
import Link from "next/link";

import { useGetAllLevels } from "@/hooks/use-levels";
import { useGetAllFaculties } from "@/hooks/use-faculties";
import { useGetAllSubjects } from "@/hooks/use-subjects";
import { useGetAllYears } from "@/hooks/use-years";
import { useGetAllQuestions } from "@/hooks/use-questions";
import { useGetAllImages } from "@/hooks/use-images";
import { Skeleton } from "@/components/ui/skeleton";

export function StatsGrid() {
  const { data: levels, isLoading: l1 } = useGetAllLevels();
  const { data: faculties, isLoading: l2 } = useGetAllFaculties();
  const { data: subjects, isLoading: l3 } = useGetAllSubjects();
  const { data: years, isLoading: l4 } = useGetAllYears();
  const { data: questions, isLoading: l5 } = useGetAllQuestions();
  const { data: images, isLoading: l6 } = useGetAllImages();

  const stats = [
    {
      label: "Levels",
      value: levels?.length ?? 0,
      isLoading: l1,
      icon: Layers,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      href: "/dashboard/levels",
    },
    {
      label: "Faculties",
      value: faculties?.length ?? 0,
      isLoading: l2,
      icon: GraduationCap,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      href: "/dashboard/faculties",
    },
    {
      label: "Subjects",
      value: subjects?.length ?? 0,
      isLoading: l3,
      icon: BookOpen,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      href: "/dashboard/subjects",
    },
    {
      label: "Sessions",
      value: years?.length ?? 0,
      isLoading: l4,
      icon: CalendarDays,
      color: "text-green-400",
      bg: "bg-green-500/10",
      href: "/dashboard/sessions",
    },
    {
      label: "Questions",
      value: questions?.length ?? 0,
      isLoading: l5,
      icon: FileQuestion,
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      href: "/dashboard/questions",
    },
    {
      label: "Images",
      value: images?.length ?? 0,
      isLoading: l6,
      icon: ImageIcon,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      href: "/dashboard/images",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <Link
          key={stat.label}
          href={stat.href}
          className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4 hover:border-border/80 hover:bg-accent/40 transition-colors"
        >
          <div
            className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center`}
          >
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </div>
          <div>
            {stat.isLoading ? (
              <Skeleton className="h-8 w-16 mb-1" />
            ) : (
              <p className="text-2xl font-semibold tracking-tight">
                {stat.value.toLocaleString()}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
