import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { imageService } from "@/services/image.service";

export const IMAGE_KEYS = {
  all: ["images"] as const,
  detail: (id: string) => ["images", id] as const,
  byQuestion: (questionId: string) =>
    ["images", "question", questionId] as const,
  byYear: (yearId: string) => ["images", "year", yearId] as const,
};

export function useGetAllImages() {
  return useQuery({
    queryKey: IMAGE_KEYS.all,
    queryFn: imageService.getAll,
  });
}

export function useGetImagesByQuestionId(questionId: string) {
  return useQuery({
    queryKey: IMAGE_KEYS.byQuestion(questionId),
    queryFn: () => imageService.getByQuestionId(questionId),
    enabled: !!questionId,
  });
}

export function useGetImagesByYearId(yearId: string) {
  return useQuery({
    queryKey: IMAGE_KEYS.byYear(yearId),
    queryFn: () => imageService.getByYearId(yearId),
    enabled: !!yearId,
  });
}

export function useUploadImages() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      questionId,
      files,
    }: {
      questionId: string;
      files: File[];
    }) => imageService.upload(questionId, files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: IMAGE_KEYS.all });
    },
  });
}

export function useDeleteImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (imageId: string) => imageService.delete(imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: IMAGE_KEYS.all });
    },
  });
}

export function useDeleteImagesByQuestionId() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (questionId: string) =>
      imageService.deleteByQuestionId(questionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: IMAGE_KEYS.all });
    },
  });
}
