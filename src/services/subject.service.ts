import { axiosInstance } from "@/lib/axios";
import { ApiResponse } from "@/types";
import { Subject, NewSubject } from "@/types/subject";

const BASE = "/subjects";

export const subjectService = {
  getAll: async (): Promise<Subject[]> => {
    const { data } = await axiosInstance.get<ApiResponse<Subject[]>>(BASE);
    return data.data;
  },

  getById: async (subjectId: string): Promise<Subject> => {
    const { data } = await axiosInstance.get<ApiResponse<Subject>>(
      `${BASE}/${subjectId}`,
    );
    return data.data;
  },

  getByFacultyId: async (facultyId: string): Promise<Subject[]> => {
    const { data } = await axiosInstance.get<ApiResponse<Subject[]>>(
      `${BASE}/${facultyId}/faculty`,
    );
    return data.data;
  },

  create: async (payload: NewSubject): Promise<Subject> => {
    const { data } = await axiosInstance.post<ApiResponse<Subject>>(
      `${BASE}/new`,
      payload,
    );
    return data.data;
  },

  update: async (
    subjectId: string,
    payload: Partial<NewSubject>,
  ): Promise<Subject> => {
    const { data } = await axiosInstance.patch<ApiResponse<Subject>>(
      `${BASE}/${subjectId}`,
      payload,
    );
    return data.data;
  },

  delete: async (subjectId: string): Promise<Subject> => {
    const { data } = await axiosInstance.delete<ApiResponse<Subject>>(
      `${BASE}/${subjectId}`,
    );
    return data.data;
  },
};
