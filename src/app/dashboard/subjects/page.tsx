"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { columns, Subject } from "./columns";
import { DataTable } from "./data-table";
import { AddSubjectSheet } from "@/components/AddSubjectSheet";

const dummySubjects: Subject[] = [
  {
    id: "1a2b3c4d-5e6f-7890-abcd-111111111111",
    name: "Mathematics",
    slug: "mathematics",
    facultyId: "c3d4e5f6-a7b8-9012-cdef-123456789012",
    facultyName: "SCIENCE",
    levelName: "Ordinary Level",
    createdAt: new Date("2024-03-01T08:00:00Z"),
    updatedAt: new Date("2024-04-01T08:00:00Z"),
  },
  {
    id: "2b3c4d5e-6f7a-8901-bcde-222222222222",
    name: "Physics",
    slug: "physics",
    facultyId: "c3d4e5f6-a7b8-9012-cdef-123456789012",
    facultyName: "SCIENCE",
    levelName: "Ordinary Level",
    createdAt: new Date("2024-03-01T08:05:00Z"),
    updatedAt: new Date("2024-04-01T08:05:00Z"),
  },
  {
    id: "3c4d5e6f-7a8b-9012-cdef-333333333333",
    name: "Literature",
    slug: "literature",
    facultyId: "d4e5f6a7-b8c9-0123-defa-234567890123",
    facultyName: "ARTS",
    levelName: "Ordinary Level",
    createdAt: new Date("2024-03-02T08:00:00Z"),
    updatedAt: new Date("2024-04-02T08:00:00Z"),
  },
  {
    id: "4d5e6f7a-8b9c-0123-defa-444444444444",
    name: "Accounting",
    slug: "accounting",
    facultyId: "e5f6a7b8-c9d0-1234-efab-345678901234",
    facultyName: "COMMERCIAL",
    levelName: "Ordinary Level",
    createdAt: new Date("2024-03-03T08:00:00Z"),
    updatedAt: new Date("2024-04-03T08:00:00Z"),
  },
  {
    id: "5e6f7a8b-9c0d-1234-efab-555555555555",
    name: "Further Mathematics",
    slug: "further_mathematics",
    facultyId: "f6a7b8c9-d0e1-2345-fabc-456789012345",
    facultyName: "SCIENCE",
    levelName: "Advanced Level",
    createdAt: new Date("2024-03-04T08:00:00Z"),
    updatedAt: new Date("2024-04-04T08:00:00Z"),
  },
  {
    id: "6f7a8b9c-0d1e-2345-fabc-666666666666",
    name: "History",
    slug: "history",
    facultyId: "a7b8c9d0-e1f2-3456-abcd-567890123456",
    facultyName: "ARTS",
    levelName: "Advanced Level",
    createdAt: new Date("2024-03-05T08:00:00Z"),
    updatedAt: new Date("2024-04-05T08:00:00Z"),
  },
];

export default function SubjectsPage() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Subjects</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage subjects across faculties and levels.
          </p>
        </div>
        <Button className="gap-2" onClick={() => setSheetOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Subject
        </Button>
      </div>

      <DataTable columns={columns} data={dummySubjects} />

      <AddSubjectSheet open={sheetOpen} onOpenChange={setSheetOpen} />
    </div>
  );
}
