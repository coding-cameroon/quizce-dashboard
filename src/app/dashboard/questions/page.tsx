"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MathJaxContext } from "better-react-mathjax";
import { useRouter } from "next/navigation";

import { DataTable } from "./data-table";
import { useGetAllQuestions, useDeleteQuestion } from "@/hooks/use-questions";
import { useGetAllYears as useYears } from "@/hooks/use-years";

export default function QuestionsPage() {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: questions } = useGetAllQuestions();
  const { data: years } = useYears();
  const { mutate: deleteQuestion } = useDeleteQuestion();

  const handleDelete = (questionId: string) => {
    setDeletingId(questionId);
    deleteQuestion(questionId, {
      onSuccess: () => setDeletingId(null),
      onError: () => setDeletingId(null),
    });
  };

  console.log(questions);

  return (
    <MathJaxContext
      config={{
        tex: {
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
          ],
          displayMath: [
            ["$$", "$$"],
            ["\\[", "\\]"],
          ],
        },
      }}
    >
      <div className="p-8 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Questions</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage questions across all sessions.
            </p>
          </div>
          <Button
            className="gap-2"
            onClick={() => router.push("/dashboard/questions/imports/create")}
          >
            <Plus className="h-4 w-4" />
            Add Question
          </Button>
        </div>

        <DataTable
          data={questions ?? []}
          sessions={years ?? []}
          onDelete={handleDelete}
          isDeletingId={deletingId}
        />
      </div>
    </MathJaxContext>
  );
}
