import {
  BookOpen,
  CalendarDays,
  FileQuestion,
  GraduationCap,
  ImageIcon,
  Layers,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    label: "Levels",
    value: 2,
    icon: Layers,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    href: "/dashboard/levels",
  },
  {
    label: "Faculties",
    value: 5,
    icon: GraduationCap,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    href: "/dashboard/faculties",
  },
  {
    label: "Subjects",
    value: 12,
    icon: BookOpen,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    href: "/dashboard/subjects",
  },
  {
    label: "Sessions",
    value: 34,
    icon: CalendarDays,
    color: "text-green-400",
    bg: "bg-green-500/10",
    href: "/dashboard/years",
  },
  {
    label: "Questions",
    value: 1_240,
    icon: FileQuestion,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    href: "/dashboard/questions",
  },
  {
    label: "Images",
    value: 318,
    icon: ImageIcon,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    href: "/dashboard/images",
  },
];

export function StatsGrid() {
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
            <p className="text-2xl font-semibold tracking-tight">
              {stat.value.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
