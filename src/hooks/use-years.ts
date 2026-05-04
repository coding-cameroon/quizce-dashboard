import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { yearService } from "@/services/year.service";
import { NewYear } from "@/types/year";

export const YEAR_KEYS = {
  all: ["years"] as const,
  detail: (id: string) => ["years", id] as const,
  bySubject: (subjectId: string) => ["years", "subject", subjectId] as const,
};

export function useGetAllYears() {
  return useQuery({
    queryKey: YEAR_KEYS.all,
    queryFn: yearService.getAll,
  });
}

export function useGetYearById(yearId: string) {
  return useQuery({
    queryKey: YEAR_KEYS.detail(yearId),
    queryFn: () => yearService.getById(yearId),
    enabled: !!yearId,
  });
}

export function useGetYearsBySubjectId(subjectId: string) {
  return useQuery({
    queryKey: YEAR_KEYS.bySubject(subjectId),
    queryFn: () => yearService.getBySubjectId(subjectId),
    enabled: !!subjectId,
  });
}

export function useCreateYear() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: NewYear) => yearService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: YEAR_KEYS.all });
    },
  });
}

export function useUpdateYear() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      yearId,
      payload,
    }: {
      yearId: string;
      payload: { name?: string; subjectId?: string };
    }) => yearService.update(yearId, payload),
    onSuccess: (_, { yearId }) => {
      queryClient.invalidateQueries({ queryKey: YEAR_KEYS.all });
      queryClient.invalidateQueries({ queryKey: YEAR_KEYS.detail(yearId) });
    },
  });
}

export function useDeleteYear() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (yearId: string) => yearService.delete(yearId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: YEAR_KEYS.all });
    },
  });
}
