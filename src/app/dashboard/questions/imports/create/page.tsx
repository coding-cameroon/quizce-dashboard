"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Upload } from "lucide-react";
import { QuestionEditorCard } from "@/components/QuestionEditorCard";

const dummyQuestions: any[] = [
  {
    id: "1",
    number: 1,
    question: "What is $2x + 4 = 10$?",
    options: ["2", "3", "4", "5"],
    correctOption: "1",
    explanation: "Subtract 4, divide by 2.",
  },
  {
    id: "2",
    number: 2,
    question: "Simplify $\\frac{x^2 - 1}{x - 1}$",
    options: ["x-1", "x+1", "x^2", "1"],
    correctOption: "1",
    explanation: "Factor numerator.",
  },
];

export default function ImportQuestionsPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState({ subject: "", year: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setLoading(true);
    // Simulate AI parsing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setQuestions(dummyQuestions as any[]);
    setLoading(false);
  };

  const handleSave = async () => {
    // TODO: implement your saveQuestionsToDb(questions, context.year) action here
    console.log("Saving to DB:", questions);
  };

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Import Questions</h1>
        <p className="text-muted-foreground">
          Select context and upload your PDF past paper.
        </p>
      </div>

      {/* Filter Bar: Justified Start */}
      <div className="flex justify-start gap-2">
        <div className="w-full sm:w-64">
          <Select onValueChange={(v) => setContext({ ...context, subject: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>{/* Map your subjects here */}</SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-64">
          <Select onValueChange={(v) => setContext({ ...context, year: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>{/* Map your years here */}</SelectContent>
          </Select>
        </div>
      </div>

      {/* Upload Zone */}
      {questions.length === 0 ? (
        <div className="border-2 border-dashed rounded-lg p-12 text-center space-y-4">
          {loading ? (
            <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" />
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
              >
                Upload PDF Past Paper
              </Button>
              <p className="text-xs text-muted-foreground">
                Supports PDF files only
              </p>
            </>
          )}
        </div>
      ) : (
        /* Preview Workspace */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">
              Preview ({questions.length} questions)
            </h2>
            <Button onClick={handleSave} className="w-full sm:w-auto">
              Confirm & Save to Database
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions.map((q, idx) => (
              <QuestionEditorCard key={q.id || idx} data={q} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
