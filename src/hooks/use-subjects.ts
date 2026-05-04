import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { subjectService } from "@/services/subject.service";
import { NewSubject } from "@/types/subject";

export const SUBJECT_KEYS = {
  all: ["subjects"] as const,
  detail: (id: string) => ["subjects", id] as const,
  byFaculty: (facultyId: string) => ["subjects", "faculty", facultyId] as const,
};

export function useGetAllSubjects() {
  return useQuery({
    queryKey: SUBJECT_KEYS.all,
    queryFn: subjectService.getAll,
  });
}

export function useGetSubjectById(subjectId: string) {
  return useQuery({
    queryKey: SUBJECT_KEYS.detail(subjectId),
    queryFn: () => subjectService.getById(subjectId),
    enabled: !!subjectId,
  });
}

export function useGetSubjectsByFacultyId(facultyId: string) {
  return useQuery({
    queryKey: SUBJECT_KEYS.byFaculty(facultyId),
    queryFn: () => subjectService.getByFacultyId(facultyId),
    enabled: !!facultyId,
  });
}

export function useCreateSubject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: NewSubject) => subjectService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUBJECT_KEYS.all });
    },
  });
}

export function useUpdateSubject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      subjectId,
      payload,
    }: {
      subjectId: string;
      payload: Partial<NewSubject>;
    }) => subjectService.update(subjectId, payload),
    onSuccess: (_, { subjectId }) => {
      queryClient.invalidateQueries({ queryKey: SUBJECT_KEYS.all });
      queryClient.invalidateQueries({
        queryKey: SUBJECT_KEYS.detail(subjectId),
      });
    },
  });
}

export function useDeleteSubject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (subjectId: string) => subjectService.delete(subjectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUBJECT_KEYS.all });
    },
  });
}
