import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { questionService } from "@/services/question.service";
import { CreateQuestionsPayload } from "@/types/question";

export const QUESTION_KEYS = {
  all: ["questions"] as const,
  byYear: (yearId: string) => ["questions", "year", yearId] as const,
  detail: (id: string) => ["questions", id] as const,
};

export function useGetAllQuestions(yearId?: string) {
  return useQuery({
    queryKey: yearId ? QUESTION_KEYS.byYear(yearId) : QUESTION_KEYS.all,
    queryFn: () => questionService.getAll(yearId),
  });
}

export function useGetQuestionById(questionId: string) {
  return useQuery({
    queryKey: QUESTION_KEYS.detail(questionId),
    queryFn: () => questionService.getById(questionId),
    enabled: !!questionId,
  });
}

export function useGetQuestionsByYearId(yearId: string) {
  return useQuery({
    queryKey: QUESTION_KEYS.byYear(yearId),
    queryFn: () => questionService.getByYearId(yearId),
    enabled: !!yearId,
  });
}

export function useCreateQuestions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateQuestionsPayload) =>
      questionService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUESTION_KEYS.all });
    },
  });
}

export function useDeleteQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (questionId: string) => questionService.delete(questionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUESTION_KEYS.all });
    },
  });
}

export function useDeleteQuestionsByYearId() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (yearId: string) => questionService.deleteByYearId(yearId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUESTION_KEYS.all });
    },
  });
}

export function useParsePDF() {
  return useMutation({
    mutationFn: ({ yearId, file }: { yearId: string; file: File }) =>
      questionService.parsePDF(yearId, file),
  });
}
