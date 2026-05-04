import { axiosInstance } from "@/lib/axios";
import { ApiResponse } from "@/types";
import { Year, NewYear } from "@/types/year";

const BASE = "/years";

export const yearService = {
  getAll: async (): Promise<Year[]> => {
    const { data } = await axiosInstance.get<ApiResponse<Year[]>>(BASE);
    return data.data;
  },

  getById: async (yearId: string): Promise<Year> => {
    const { data } = await axiosInstance.get<ApiResponse<Year>>(
      `${BASE}/${yearId}`,
    );
    return data.data;
  },

  getBySubjectId: async (subjectId: string): Promise<Year[]> => {
    const { data } = await axiosInstance.get<ApiResponse<Year[]>>(
      `${BASE}/${subjectId}/subject`,
    );
    return data.data;
  },

  create: async (payload: NewYear): Promise<Year[]> => {
    const { data } = await axiosInstance.post<ApiResponse<Year[]>>(
      `${BASE}/new`,
      payload,
    );
    return data.data;
  },

  update: async (
    yearId: string,
    payload: { name?: string; subjectId?: string },
  ): Promise<Year> => {
    const { data } = await axiosInstance.patch<ApiResponse<Year>>(
      `${BASE}/${yearId}`,
      payload,
    );
    return data.data;
  },

  delete: async (yearId: string): Promise<Year> => {
    const { data } = await axiosInstance.delete<ApiResponse<Year>>(
      `${BASE}/${yearId}`,
    );
    return data.data;
  },
};
