"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Upload, FileJson, Save } from "lucide-react";
import { MathJaxContext } from "better-react-mathjax";

import { useGetAllLevels } from "@/hooks/use-levels";
import { useGetFacultiesByLevelId } from "@/hooks/use-faculties";
import { useGetSubjectsByFacultyId } from "@/hooks/use-subjects";
import { useGetYearsBySubjectId } from "@/hooks/use-years";
import { useParsePDF, useCreateQuestions } from "@/hooks/use-questions";
import { ParsedQuestion } from "@/types/question";
import { ErrorMessage } from "@/components/ErrorMessage";

export default function ImportQuestionsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [levelId, setLevelId] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [yearId, setYearId] = useState("");
  const [questions, setQuestions] = useState<ParsedQuestion[]>([]);
  const [manualJson, setManualJson] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [activeTab, setActiveTab] = useState<"upload" | "manual">("upload");

  const { data: levels, isLoading: isLoadingLevels } = useGetAllLevels();
  const { data: faculties, isLoading: isLoadingFaculties } =
    useGetFacultiesByLevelId(levelId);
  const { data: subjects, isLoading: isLoadingSubjects } =
    useGetSubjectsByFacultyId(facultyId);
  const { data: years, isLoading: isLoadingYears } =
    useGetYearsBySubjectId(subjectId);

  const { mutate: parsePDF, isPending: isParsing } = useParsePDF();
  const {
    mutate: createQuestions,
    isPending: isSaving,
    error: saveError,
  } = useCreateQuestions();

  const handleLevelChange = (val: string) => {
    setLevelId(val);
    setFacultyId("");
    setSubjectId("");
    setYearId("");
  };

  const handleFacultyChange = (val: string) => {
    setFacultyId(val);
    setSubjectId("");
    setYearId("");
  };

  const handleSubjectChange = (val: string) => {
    setSubjectId(val);
    setYearId("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !yearId) return;
    parsePDF(
      { yearId, file },
      {
        onSuccess: (data) => {
          setQuestions(data);
          setManualJson(JSON.stringify(data, null, 2));
        },
      },
    );
  };

  const handleParseManual = () => {
    setJsonError("");

    let cleanJson = manualJson
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      const parsed = JSON.parse(manualJson);
      if (!Array.isArray(parsed)) {
        setJsonError("JSON must be an array of questions.");
        return;
      }
      setQuestions(parsed);
    } catch {
      // Try fixing single backslashes
      try {
        const fixed = manualJson.replace(/\\(?!\\)/g, "\\\\");
        const parsed = JSON.parse(fixed);
        if (!Array.isArray(parsed)) {
          setJsonError("JSON must be an array of questions.");
          return;
        }
        setQuestions(parsed);
      } catch {
        setJsonError("Invalid JSON. Please check the format and try again.");
      }
    }
  };

  const handleSave = () => {
    if (!questions.length || !yearId) return;
    const payload = questions.map((q) => ({ ...q, yearId }));
    createQuestions(
      { questions: payload },
      {
        onSuccess: () => router.push("/dashboard/questions"),
      },
    );
  };

  const canUpload = !!yearId;
  const hasQuestions = questions.length > 0;

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
      <div className="p-8 space-y-8 max-w-5xl mx-auto">
        {/* ── PAGE HEADER ── */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Import Questions
          </h1>
          <p className="text-sm text-muted-foreground">
            Select a session, upload a PDF or paste JSON manually.
          </p>
        </div>

        {/* ── CONTEXT SELECTORS ── */}
        <div className="flex flex-wrap gap-2">
          <Select
            value={levelId}
            onValueChange={handleLevelChange}
            disabled={isLoadingLevels}
          >
            <SelectTrigger className="w-44">
              <SelectValue
                placeholder={isLoadingLevels ? "Loading..." : "Select Level"}
              />
            </SelectTrigger>
            <SelectContent>
              {levels?.map((l) => (
                <SelectItem key={l.id} value={l.id}>
                  {l.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={facultyId}
            onValueChange={handleFacultyChange}
            disabled={!levelId || isLoadingFaculties}
          >
            <SelectTrigger className="w-44">
              <SelectValue
                placeholder={
                  !levelId
                    ? "Select level first"
                    : isLoadingFaculties
                      ? "Loading..."
                      : "Select Faculty"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {faculties?.map((f) => (
                <SelectItem key={f.id} value={f.id}>
                  {f.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={subjectId}
            onValueChange={handleSubjectChange}
            disabled={!facultyId || isLoadingSubjects}
          >
            <SelectTrigger className="w-44">
              <SelectValue
                placeholder={
                  !facultyId
                    ? "Select faculty first"
                    : isLoadingSubjects
                      ? "Loading..."
                      : "Select Subject"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {subjects?.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={yearId}
            onValueChange={setYearId}
            disabled={!subjectId || isLoadingYears}
          >
            <SelectTrigger className="w-44">
              <SelectValue
                placeholder={
                  !subjectId
                    ? "Select subject first"
                    : isLoadingYears
                      ? "Loading..."
                      : "Select Session"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {years?.map((y) => (
                <SelectItem key={y.id} value={y.id}>
                  {y.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* ── TABS ── */}
        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab("upload")}
            className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "upload"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Upload PDF
          </button>
          <button
            onClick={() => setActiveTab("manual")}
            className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "manual"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Manual JSON
          </button>
        </div>

        {/* ── UPLOAD TAB ── */}
        {activeTab === "upload" && (
          <div className="border-2 border-dashed rounded-xl p-12 text-center space-y-4">
            {isParsing ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">
                  Parsing PDF with AI...
                </p>
              </div>
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
                  disabled={!canUpload}
                >
                  Upload PDF Past Paper
                </Button>
                {!canUpload && (
                  <p className="text-xs text-muted-foreground">
                    Select a session above before uploading.
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Supports PDF files only. First 50 MCQs will be extracted.
                </p>
              </>
            )}
          </div>
        )}

        {/* ── MANUAL JSON TAB ── */}
        {activeTab === "manual" && (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Paste a JSON array of questions. Each question must have:{" "}
              <code className="bg-muted px-1 rounded text-xs">
                number, question, options, imageType, correctOption,
                explanation, yearId
              </code>
            </p>
            <Textarea
              value={manualJson}
              onChange={(e) => {
                setManualJson(e.target.value);
                setJsonError("");
              }}
              placeholder={`[\n  {\n    "number": 1,\n    "question": "What is...",\n    "options": ["A", "B", "C", "D"],\n    "imageType": "none",\n    "correctOption": "0",\n    "explanation": "Because...",\n    "yearId": ""\n  }\n]`}
              className="font-mono text-xs min-h-64 resize-y"
            />
            <ErrorMessage message={jsonError} />
            <Button
              onClick={handleParseManual}
              disabled={!manualJson.trim()}
              variant="outline"
              className="gap-2"
            >
              <FileJson className="h-4 w-4" />
              Parse JSON
            </Button>
          </div>
        )}
        {/* ── PREVIEW ── */}
        {hasQuestions && (
          <div className="space-y-4">
            {/* Preview header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">
                  Preview — {questions.length} question
                  {questions.length !== 1 ? "s" : ""}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Review the questions below before saving to the database.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuestions([]);
                    setManualJson("");
                  }}
                  disabled={isSaving}
                >
                  Clear
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving || !yearId}
                  className="gap-2"
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {isSaving ? "Saving..." : "Confirm & Save"}
                </Button>
              </div>
            </div>

            <ErrorMessage message={saveError?.message} />

            {!yearId && (
              <ErrorMessage message="Select a session above before saving." />
            )}

            {/* JSON preview */}
            <div className="rounded-xl border border-border bg-muted/40 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/60">
                <span className="text-xs font-medium text-muted-foreground">
                  JSON Preview
                </span>
                <span className="text-xs text-muted-foreground">
                  {questions.length} item{questions.length !== 1 ? "s" : ""}
                </span>
              </div>
              <pre
                style={{ whiteSpace: "pre", tabSize: 2 }}
                className="text-xs p-4 overflow-auto max-h-[500px] leading-relaxed font-mono text-foreground break-words"
              >
                {JSON.stringify(questions, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </MathJaxContext>
  );
}
