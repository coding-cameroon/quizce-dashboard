"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import { AddSubjectSheet } from "@/components/AddSubjectSheet";
import { Subject } from "@/types/subject";
import { useGetAllSubjects, useDeleteSubject } from "@/hooks/use-subjects";

export default function SubjectsPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const { data: subjects } = useGetAllSubjects();
  const { mutate: deleteSubject } = useDeleteSubject();

  const handleDelete = (subjectId: string) => {
    deleteSubject(subjectId);
  };

  const handleEdit = (subject: Subject) => {
    setSelectedSubject(subject);
    setSheetOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setSheetOpen(open);
    if (!open) setSelectedSubject(null);
  };

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

      <DataTable
        columns={columns(handleDelete, handleEdit)}
        data={subjects ?? []}
      />

      <AddSubjectSheet
        open={sheetOpen}
        onOpenChange={handleOpenChange}
        subject={selectedSubject}
      />
    </div>
  );
}
