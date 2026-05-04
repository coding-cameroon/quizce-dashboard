import { NewFaculty } from "@/types";
import { facultyService } from "@/services/faculty.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const FACULTY_KEYS = {
  all: ["faculties"] as const,
  detail: (id: string) => ["faculties", id] as const,
  byLevel: (levelId: string) => ["faculties", "level", levelId] as const,
};

export function useGetAllFaculties() {
  return useQuery({
    queryKey: FACULTY_KEYS.all,
    queryFn: facultyService.getAll,
  });
}

export function useGetFacultyById(facultyId: string) {
  return useQuery({
    queryKey: FACULTY_KEYS.detail(facultyId),
    queryFn: () => facultyService.getById(facultyId),
    enabled: !!facultyId,
  });
}

export function useGetFacultiesByLevelId(levelId: string) {
  return useQuery({
    queryKey: FACULTY_KEYS.byLevel(levelId),
    queryFn: () => facultyService.getByLevelId(levelId),
    enabled: !!levelId,
  });
}

export function useCreateFaculty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: NewFaculty) => facultyService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FACULTY_KEYS.all });
    },
  });
}

export function useUpdateFaculty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      facultyId,
      payload,
    }: {
      facultyId: string;
      payload: Partial<NewFaculty>;
    }) => facultyService.update(facultyId, payload),
    onSuccess: (_, { facultyId }) => {
      queryClient.invalidateQueries({ queryKey: FACULTY_KEYS.all });
      queryClient.invalidateQueries({
        queryKey: FACULTY_KEYS.detail(facultyId),
      });
    },
  });
}

export function useDeleteFaculty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (facultyId: string) => facultyService.delete(facultyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FACULTY_KEYS.all });
    },
  });
}
