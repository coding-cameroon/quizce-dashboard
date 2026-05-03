"use client";

import { useState, useMemo } from "react";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ImageCard } from "@/components/ImageCard";
import { AddImageSheet } from "@/components/AddImageSheet";

export const dummyData = {
  subjects: [
    { id: "s1", name: "Mathematics" },
    { id: "s2", name: "Physics" },
  ],
  years: [
    { id: "y1", subjectId: "s1", name: "2024" },
    { id: "y2", subjectId: "s1", name: "2023" },
    { id: "y3", subjectId: "s2", name: "2024" },
  ],
  questions: [
    {
      id: "q1",
      yearId: "y1",
      number: 1,
      question: "Calculate the integral...",
    },
  ],
  images: [
    { id: "img1", questionId: "q1", publicId: "math_q1", optionIndex: null },
    { id: "img2", questionId: "q1", publicId: "math_opt1", optionIndex: 0 },
  ],
};

export default function AdminImagesPage() {
  const [subjectId, setSubjectId] = useState<string>("");
  const [yearId, setYearId] = useState<string>("");
  const [questionId, setQuestionId] = useState<string>("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);

  // Filter logic
  const filteredYears = dummyData.years.filter(
    (y) => y.subjectId === subjectId,
  );
  const filteredQuestions = dummyData.questions.filter(
    (q) => q.yearId === yearId,
  );

  const filteredImages = useMemo(() => {
    if (!subjectId || !yearId) return [];

    return dummyData.images.filter((img) => {
      const question = dummyData.questions.find((q) => q.id === img.questionId);
      const yearMatches = question?.yearId === yearId;
      const questionMatches = questionId ? img.questionId === questionId : true;
      return yearMatches && questionMatches;
    });
  }, [subjectId, yearId, questionId]);

  return (
    <div className="p-8 space-y-6">
      {/* Header with responsive Add Image Button */}
      <div className="flex w-full flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Quiz images</h1>
          <p className="text-muted-foreground">
            Manage the images used in your questions.
          </p>
        </div>

        <Button
          onClick={() => {
            setEditingImage(null);
            setIsSheetOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add image
        </Button>
      </div>

      {/* Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 items-center">
        {/* Subject Select */}
        <Select
          onValueChange={(v) => {
            setSubjectId(v);
            setYearId("");
            setQuestionId("");
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            {dummyData.subjects.map((s: any) => (
              <SelectItem key={s.id} value={s.id}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Year Select */}
        <Select
          disabled={!subjectId}
          onValueChange={(v) => {
            setYearId(v);
            setQuestionId("");
          }}
          value={yearId}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {filteredYears.map((y) => (
              <SelectItem key={y.id} value={y.id}>
                {y.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Question Select (Optional) */}
        <Select
          disabled={!yearId}
          onValueChange={setQuestionId}
          value={questionId}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Questions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Questions</SelectItem>
            {filteredQuestions.map((q) => (
              <SelectItem key={q.id} value={q.id}>
                Q{q.number}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search Input */}
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search images..." className="pl-9 w-full" />
        </div>
      </div>

      {/* Gallery State Handling */}
      {!subjectId || !yearId ? (
        <div className="p-20 border-2 border-dashed rounded-lg text-center text-muted-foreground">
          Select subject and year to view images
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredImages.map((img: any) => (
            <ImageCard
              key={img.id}
              image={img}
              onEdit={setEditingImage}
              onDelete={() => {}}
            />
          ))}
        </div>
      )}

      <AddImageSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        initialData={editingImage}
      />
    </div>
  );
}
