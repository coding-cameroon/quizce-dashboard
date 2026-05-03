import { StatsGrid } from "@/components/stats-grid";
import { ContentHierarchy } from "@/components/content-hierarchy";
import { QuestionsByLevelChart } from "@/components/questions-by-level-chart";
import { QuestionsBySubjectChart } from "@/components/questions-by-subject-chart";

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">
          A summary of all content in the system.
        </p>
      </div>

      <StatsGrid />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <QuestionsBySubjectChart />
        </div>
        <div className="xl:col-span-1">
          <QuestionsByLevelChart />
        </div>
      </div>
      <ContentHierarchy />
    </div>
  );
}
