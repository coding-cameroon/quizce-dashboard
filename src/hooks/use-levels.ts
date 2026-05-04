import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { NewLevel } from "@/types/levels";
import { levelServices } from "@/services/level.service";

const LEVEL_KEYS = {
  all: ["levels"] as const,
  detail: (id: string) => ["levels", id] as const,
  slug: (slug: "o_level" | "a_level") => ["levels", "slug", slug] as const,
};

export const useGetAllLevels = () => {
  return useQuery({
    queryKey: LEVEL_KEYS.all,
    queryFn: levelServices.getAllLevels,
  });
};

export const useGetLevelById = (id: string) => {
  return useQuery({
    queryKey: LEVEL_KEYS.detail(id),
    queryFn: () => levelServices.getLevelById(id),
    enabled: !!id,
  });
};

export const useGetLevelBySlug = (slug: "o_level" | "a_level") => {
  return useQuery({
    queryKey: LEVEL_KEYS.slug(slug),
    queryFn: () => levelServices.getLevelBySlug(slug),
    enabled: !!slug,
  });
};

export const useCreateLevel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: NewLevel) => levelServices.createlevel(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: LEVEL_KEYS.all }),
  });
};

export const useUpdateLevel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      levelId,
      payload,
    }: {
      levelId: string;
      payload: Partial<NewLevel>;
    }) => levelServices.updateLevel(levelId, payload),
    onSuccess: (_, { id }: any) => {
      queryClient.invalidateQueries({ queryKey: LEVEL_KEYS.all });
      queryClient.invalidateQueries({ queryKey: LEVEL_KEYS.detail(id) });
    },
  });
};

export const useDeleteLevel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (levelId: string) => levelServices.deleteLevel(levelId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LEVEL_KEYS.all });
    },
  });
};
