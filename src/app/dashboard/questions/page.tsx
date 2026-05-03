"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { columns, Question } from "./columns";
import { DataTable } from "./data-table";

const dummySessions = [
  { id: "y1a2b3c4-d5e6-7890-abcd-111111111111", name: "Mathematics 2023" },
  { id: "y2b3c4d5-e6f7-8901-bcde-222222222222", name: "Mathematics 2022" },
  { id: "y3c4d5e6-f7a8-9012-cdef-333333333333", name: "Physics 2023" },
];

const dummyQuestions: Question[] = [
  {
    id: "q1000001-0000-0000-0000-000000000001",
    number: 1,
    question: "What is the value of $x$ if $2x + 4 = 10$?",
    options: ["2", "3", "4", "5"],
    imageType: "none",
    correctOption: "1",
    explanation:
      "Subtract 4 from both sides to get $2x = 6$, then divide by 2.",
    yearId: "y1a2b3c4-d5e6-7890-abcd-111111111111",
    yearName: "Mathematics 2023",
    createdAt: new Date("2024-05-01T08:00:00Z"),
    updatedAt: new Date("2024-05-01T08:00:00Z"),
  },
  {
    id: "q1000001-0000-0000-0000-000000000002",
    number: 2,
    question: "Simplify $\\frac{x^2 - 1}{x - 1}$",
    options: ["x - 1", "x + 1", "x^2", "1"],
    imageType: "none",
    correctOption: "1",
    explanation: "Factor the numerator as $(x+1)(x-1)$ and cancel $(x-1)$.",
    yearId: "y1a2b3c4-d5e6-7890-abcd-111111111111",
    yearName: "Mathematics 2023",
    createdAt: new Date("2024-05-01T08:05:00Z"),
    updatedAt: new Date("2024-05-01T08:05:00Z"),
  },
  {
    id: "q1000001-0000-0000-0000-000000000003",
    number: 3,
    question: null,
    options: ["Option A", "Option B", "Option C", "Option D"],
    imageType: "question_image",
    correctOption: "2",
    explanation: "See the image for the question details.",
    yearId: "y1a2b3c4-d5e6-7890-abcd-111111111111",
    yearName: "Mathematics 2023",
    createdAt: new Date("2024-05-01T08:10:00Z"),
    updatedAt: new Date("2024-05-01T08:10:00Z"),
  },
  {
    id: "q2000001-0000-0000-0000-000000000001",
    number: 1,
    question: "What is Newton's second law of motion?",
    options: ["F = ma", "F = mv", "F = m/a", "F = a/m"],
    imageType: "none",
    correctOption: "0",
    explanation:
      "Newton's second law states that Force equals mass times acceleration.",
    yearId: "y3c4d5e6-f7a8-9012-cdef-333333333333",
    yearName: "Physics 2023",
    createdAt: new Date("2024-05-02T08:00:00Z"),
    updatedAt: new Date("2024-05-02T08:00:00Z"),
  },
  {
    id: "q2000001-0000-0000-0000-000000000002",
    number: 2,
    question: "What is the unit of electric current?",
    options: ["Volt", "Ohm", "Ampere", "Watt"],
    imageType: "none",
    correctOption: "2",
    explanation: "Electric current is measured in Amperes (A).",
    yearId: "y3c4d5e6-f7a8-9012-cdef-333333333333",
    yearName: "Physics 2023",
    createdAt: new Date("2024-05-02T08:05:00Z"),
    updatedAt: new Date("2024-05-02T08:05:00Z"),
  },
];

export default function QuestionsPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Questions</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage questions across all sessions.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Question
        </Button>
      </div>

      <DataTable data={dummyQuestions} sessions={dummySessions} />
    </div>
  );
}
