"use client";

import { useState } from "react";
import { Loader2, Plus, Search } from "lucide-react";

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

import { useGetAllLevels } from "@/hooks/use-levels";
import { useGetFacultiesByLevelId } from "@/hooks/use-faculties";
import { useGetSubjectsByFacultyId } from "@/hooks/use-subjects";
import { useGetYearsBySubjectId } from "@/hooks/use-years";
import {
  useDeleteImage,
  useDeleteImagesByQuestionId,
  useGetImagesByYearId,
} from "@/hooks/use-images";
import { ErrorMessage } from "@/components/ErrorMessage";

export default function AdminImagesPage() {
  const [levelId, setLevelId] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [yearId, setYearId] = useState("");
  const [questionId, setQuestionId] = useState("");

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);

  // ✅ API HOOKS (correct usage)
  const { data: levels, isLoading: loadingLevels } = useGetAllLevels();
  const { data: faculties, isLoading: loadingFaculties } =
    useGetFacultiesByLevelId(levelId);
  const { data: subjects, isLoading: loadingSubjects } =
    useGetSubjectsByFacultyId(facultyId);
  const { data: years, isLoading: loadingYears } =
    useGetYearsBySubjectId(subjectId);
  const { data: images, isLoading: loadingImages } =
    useGetImagesByYearId(yearId);

  const {
    mutateAsync: deleteImage,
    isPending,
    error,
  } = useDeleteImagesByQuestionId();

  const handleDeleteImage = async (imageId: string) => {
    await deleteImage(imageId);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 w-full">
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

        {/* QUESTION
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
        </Select> */}

        {/* SEARCH */}
        <div className="relative w-full min-w-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search images..." className="pl-9 w-full" />
        </div>
      </div>

      {isPending && (
        <Button disabled={isPending} variant={"ghost"}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          processing...
        </Button>
      )}

      <ErrorMessage message={error?.message} />

      {/* IMAGES */}
      {!yearId ? (
        <div className="p-20 border-2 border-dashed rounded-lg text-center text-muted-foreground">
          Select up to a year to view images
        </div>
      ) : loadingImages ? (
        <div className="text-center">Loading images...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {images && images.length > 0 ? (
            images.map((img: any) => (
              <ImageCard
                key={img.id}
                image={img}
                onEdit={setEditingImage}
                onDelete={handleDeleteImage}
              />
            ))
          ) : (
            <div className="col-span-full py-10">
              <p className="text-md font-bold text-center text-muted-foreground">
                No images found for {years?.at(0)?.name || "this year"}
              </p>
            </div>
          )}
        </div>
      )}

      <AddImageSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </div>
  );
}
