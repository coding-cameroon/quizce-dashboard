import { Badge } from "@/components/ui/badge";
import { BookOpen, ChevronRight } from "lucide-react";

type SubjectEntry = {
  name: string;
  sessions: number;
  questions: number;
};

type FacultyEntry = {
  name: "ARTS" | "SCIENCE" | "COMMERCIAL";
  subjects: SubjectEntry[];
};

type LevelEntry = {
  name: "Ordinary Level" | "Advanced Level";
  slug: "o_level" | "a_level";
  faculties: FacultyEntry[];
};

const facultyColorMap: Record<string, string> = {
  ARTS: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  SCIENCE: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  COMMERCIAL: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const hierarchy: LevelEntry[] = [
  {
    name: "Ordinary Level",
    slug: "o_level",
    faculties: [
      {
        name: "SCIENCE",
        subjects: [
          { name: "Mathematics", sessions: 6, questions: 300 },
          { name: "Physics", sessions: 5, questions: 250 },
          { name: "Chemistry", sessions: 5, questions: 240 },
          { name: "Biology", sessions: 4, questions: 200 },
        ],
      },
      {
        name: "ARTS",
        subjects: [
          { name: "Literature in English", sessions: 4, questions: 180 },
          { name: "History", sessions: 3, questions: 150 },
          { name: "Geography", sessions: 4, questions: 160 },
        ],
      },
      {
        name: "COMMERCIAL",
        subjects: [
          { name: "Accounting", sessions: 5, questions: 220 },
          { name: "Commerce", sessions: 4, questions: 180 },
          { name: "Economics", sessions: 4, questions: 190 },
        ],
      },
    ],
  },
  {
    name: "Advanced Level",
    slug: "a_level",
    faculties: [
      {
        name: "SCIENCE",
        subjects: [
          { name: "Further Mathematics", sessions: 3, questions: 120 },
          { name: "Physics", sessions: 3, questions: 130 },
        ],
      },
      {
        name: "ARTS",
        subjects: [{ name: "History", sessions: 2, questions: 90 }],
      },
    ],
  },
];

export function ContentHierarchy() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-semibold tracking-tight">
          Content Hierarchy
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Breakdown of content by level, faculty and subject.
        </p>
      </div>

      <div className="space-y-4">
        {hierarchy.map((level) => (
          <div
            key={level.slug}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            {/* Level header */}
            <div className="flex items-center gap-3 px-5 py-3 bg-muted/40 border-b border-border">
              <Badge variant="secondary" className="font-mono text-xs">
                {level.slug}
              </Badge>
              <span className="text-sm font-semibold">{level.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {level.faculties.reduce((acc, f) => acc + f.subjects.length, 0)}{" "}
                subjects
              </span>
            </div>

            {/* Faculties */}
            <div className="divide-y divide-border">
              {level.faculties.map((faculty) => (
                <div key={faculty.name}>
                  {/* Faculty row */}
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-muted/20">
                    <ChevronRight className="h-3 w-3 text-muted-foreground" />
                    <Badge
                      variant="outline"
                      className={`text-xs font-semibold ${facultyColorMap[faculty.name]}`}
                    >
                      {faculty.name}
                    </Badge>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {faculty.subjects.length} subject
                      {faculty.subjects.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Subjects */}
                  <div className="divide-y divide-border/50">
                    {faculty.subjects.map((subject) => (
                      <div
                        key={subject.name}
                        className="flex items-center gap-3 px-5 py-3 hover:bg-accent/30 transition-colors"
                      >
                        <div className="w-4" />
                        <BookOpen className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span className="text-sm flex-1">{subject.name}</span>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>
                            <span className="font-medium text-foreground">
                              {subject.sessions}
                            </span>{" "}
                            sessions
                          </span>
                          <span>
                            <span className="font-medium text-foreground">
                              {subject.questions.toLocaleString()}
                            </span>{" "}
                            questions
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
