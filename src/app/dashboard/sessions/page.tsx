"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { columns, Year } from "./columns";
import { DataTable } from "./data-table";
import { AddSessionSheet } from "@/components/AddSessionSheet";

const dummyYears: Year[] = [
  {
    id: "y1a2b3c4-d5e6-7890-abcd-111111111111",
    name: "2023",
    subjectId: "1a2b3c4d-5e6f-7890-abcd-111111111111",
    subjectName: "Mathematics",
    facultyName: "SCIENCE",
    levelName: "Ordinary Level",
    createdAt: new Date("2024-04-01T08:00:00Z"),
    updatedAt: new Date("2024-04-01T08:00:00Z"),
  },
  {
    id: "y2b3c4d5-e6f7-8901-bcde-222222222222",
    name: "2022",
    subjectId: "1a2b3c4d-5e6f-7890-abcd-111111111111",
    subjectName: "Mathematics",
    facultyName: "SCIENCE",
    levelName: "Ordinary Level",
    createdAt: new Date("2024-04-01T08:05:00Z"),
    updatedAt: new Date("2024-04-01T08:05:00Z"),
  },
  {
    id: "y3c4d5e6-f7a8-9012-cdef-333333333333",
    name: "2023",
    subjectId: "2b3c4d5e-6f7a-8901-bcde-222222222222",
    subjectName: "Physics",
    facultyName: "SCIENCE",
    levelName: "Ordinary Level",
    createdAt: new Date("2024-04-02T08:00:00Z"),
    updatedAt: new Date("2024-04-02T08:00:00Z"),
  },
  {
    id: "y4d5e6f7-a8b9-0123-defa-444444444444",
    name: "2021",
    subjectId: "3c4d5e6f-7a8b-9012-cdef-333333333333",
    subjectName: "Literature",
    facultyName: "ARTS",
    levelName: "Ordinary Level",
    createdAt: new Date("2024-04-03T08:00:00Z"),
    updatedAt: new Date("2024-04-03T08:00:00Z"),
  },
  {
    id: "y5e6f7a8-b9c0-1234-efab-555555555555",
    name: "2023",
    subjectId: "5e6f7a8b-9c0d-1234-efab-555555555555",
    subjectName: "Further Mathematics",
    facultyName: "SCIENCE",
    levelName: "Advanced Level",
    createdAt: new Date("2024-04-04T08:00:00Z"),
    updatedAt: new Date("2024-04-04T08:00:00Z"),
  },
];

const subjectList = [...new Set(dummyYears.map((y) => y.subjectName))];

export default function YearsPage() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Years / Papers
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage past paper years across subjects.
          </p>
        </div>
        <Button className="gap-2" onClick={() => setSheetOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Year
        </Button>
      </div>

      <DataTable data={dummyYears} subjects={subjectList} />

      <AddSessionSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        subjects={subjectList}
      />
    </div>
  );
}
