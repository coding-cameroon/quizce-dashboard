"use client";

import { useState, useEffect, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GalleryVerticalEndIcon, Loader2 } from "lucide-react";

import { useGetAllLevels } from "@/hooks/use-levels";
import { useGetFacultiesByLevelId } from "@/hooks/use-faculties";
import { useGetSubjectsByFacultyId } from "@/hooks/use-subjects";
import { useGetYearsBySubjectId } from "@/hooks/use-years";
import { useGetQuestionsByYearId } from "@/hooks/use-questions";
import { useGetImagesByQuestionId, useUploadImages } from "@/hooks/use-images";

export const AddImageSheet = ({
  open,
  onOpenChange,
  initialData,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: any;
}) => {
  const isEdit = !!initialData;
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [levelId, setLevelId] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [yearId, setYearId] = useState("");
  const [questionId, setQuestionId] = useState("");

  const { data: levels, isLoading: loadingLevels } = useGetAllLevels();
  const { data: faculties, isLoading: loadingFaculties } =
    useGetFacultiesByLevelId(levelId);
  const { data: subjects, isLoading: loadingSubjects } =
    useGetSubjectsByFacultyId(facultyId);
  const { data: years, isLoading: loadingYears } =
    useGetYearsBySubjectId(subjectId);
  const { data: questions, isLoading: loadingQuestions } =
    useGetQuestionsByYearId(yearId);

  const { mutateAsync: uploadImages, isPending } = useUploadImages();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [previews]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    console.log(Array.from(e.target.files));
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleSubmit = async () => {
    if (!questionId || files.length === 0) return;

    try {
      await uploadImages({ questionId, files });
      handleCloseSheet();
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const handleCloseSheet = () => {
    reset();
    setPreviews([]);
    onOpenChange(false);
  };

  const reset = () => {
    setFiles([]);
    setPreviews([]);
    setLevelId("");
    setFacultyId("");
    setSubjectId("");
    setYearId("");
    setQuestionId("");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{isEdit ? "Edit Image" : "Add New Image"}</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6 px-6">
          {/* Select Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Subject</Label>
              {/* LEVEL */}
              <Select
                value={levelId}
                onValueChange={(val) => {
                  setLevelId(val);
                  setFacultyId("");
                  setSubjectId("");
                  setYearId("");
                  setQuestionId("");
                }}
              >
                <SelectTrigger className="w-full min-w-0">
                  <SelectValue
                    placeholder={loadingLevels ? "Loading..." : "Select Level"}
                    className="truncate"
                  />
                </SelectTrigger>
                <SelectContent className="w-[var(--radix-select-trigger-width)] max-w-full">
                  {levels
                    ?.filter((l) => l.id)
                    .map((l) => (
                      <SelectItem key={l.id} value={l.id} className="truncate">
                        {l.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Faculty</Label>
              {/* FACULTY */}
              <Select
                value={facultyId}
                disabled={!levelId || loadingFaculties}
                onValueChange={(val) => {
                  setFacultyId(val);
                  setSubjectId("");
                  setYearId("");
                  setQuestionId("");
                }}
              >
                <SelectTrigger className="w-full min-w-0">
                  <SelectValue
                    placeholder={
                      !levelId
                        ? "Select level first"
                        : loadingFaculties
                          ? "Loading..."
                          : "Select Faculty"
                    }
                    className="truncate"
                  />
                </SelectTrigger>
                <SelectContent className="w-[var(--radix-select-trigger-width)]">
                  {faculties
                    ?.filter((f) => f.id)
                    .map((f) => (
                      <SelectItem key={f.id} value={f.id} className="truncate">
                        {f.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Subject</Label>
              {/* SUBJECT */}
              <Select
                value={subjectId}
                disabled={!facultyId || loadingSubjects}
                onValueChange={(val) => {
                  setSubjectId(val);
                  setYearId("");
                  setQuestionId("");
                }}
              >
                <SelectTrigger className="w-full min-w-0">
                  <SelectValue
                    placeholder={
                      !facultyId
                        ? "Select faculty first"
                        : loadingSubjects
                          ? "Loading..."
                          : "Select Subject"
                    }
                    className="truncate"
                  />
                </SelectTrigger>
                <SelectContent className="w-[var(--radix-select-trigger-width)]">
                  {subjects
                    ?.filter((s) => s.id)
                    .map((s) => (
                      <SelectItem key={s.id} value={s.id} className="truncate">
                        {s.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Year</Label>
              {/* YEAR */}
              <Select
                value={yearId}
                disabled={!subjectId || loadingYears}
                onValueChange={(val) => {
                  setYearId(val);
                  setQuestionId("");
                }}
              >
                <SelectTrigger className="w-full min-w-0">
                  <SelectValue
                    placeholder={
                      !subjectId
                        ? "Select subject first"
                        : loadingYears
                          ? "Loading..."
                          : "Select Year"
                    }
                    className="truncate"
                  />
                </SelectTrigger>
                <SelectContent className="w-[var(--radix-select-trigger-width)]">
                  {years
                    ?.filter((y) => y.id)
                    .map((y) => (
                      <SelectItem key={y.id} value={y.id} className="truncate">
                        {y.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Question</Label>
              {/* QUESTION */}
              <Select
                value={questionId}
                disabled={!yearId || loadingQuestions}
                onValueChange={setQuestionId}
              >
                <SelectTrigger className="w-full min-w-0">
                  <SelectValue
                    placeholder={
                      !yearId
                        ? "Select year first"
                        : loadingQuestions
                          ? "Loading..."
                          : "Select Question"
                    }
                    className="truncate"
                  />
                </SelectTrigger>
                <SelectContent className="w-[var(--radix-select-trigger-width)]">
                  {questions
                    ?.filter((q) => q.id)
                    .map((q) => (
                      <SelectItem key={q.id} value={q.id} className="truncate">
                        Q{q.number}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            {/* File Upload */}
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />

            {/* 4. Custom button that triggers the hidden input */}
            <Button
              type="button"
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
            >
              <GalleryVerticalEndIcon className="mr-2 h-4 w-4" />
              Select image(s)
            </Button>
          </div>

          {/* Preview Section */}
          {previews.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {previews.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt="Preview"
                  className="w-full h-20 object-cover rounded-md border"
                />
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              disabled={isPending}
              onClick={handleCloseSheet}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              disabled={isPending}
              onClick={() => handleSubmit()}
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "Adding..." : "Add Images"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
