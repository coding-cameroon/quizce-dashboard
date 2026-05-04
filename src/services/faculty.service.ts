import { axiosInstance } from "@/lib/axios";
import {
  Faculty,
  FacultyWithRelations,
  NewFaculty,
  ApiResponse,
} from "@/types";

const BASE = "/faculties";

export const facultyService = {
  getAll: async (): Promise<FacultyWithRelations[]> => {
    const { data } =
      await axiosInstance.get<ApiResponse<FacultyWithRelations[]>>(BASE);
    return data.data;
  },

  getById: async (facultyId: string): Promise<FacultyWithRelations> => {
    const { data } = await axiosInstance.get<ApiResponse<FacultyWithRelations>>(
      `${BASE}/${facultyId}`,
    );
    return data.data;
  },

  getByLevelId: async (levelId: string): Promise<FacultyWithRelations[]> => {
    const { data } = await axiosInstance.get<
      ApiResponse<FacultyWithRelations[]>
    >(`${BASE}/${levelId}/level`);
    return data.data;
  },

  create: async (payload: NewFaculty): Promise<FacultyWithRelations> => {
    const { data } = await axiosInstance.post<
      ApiResponse<FacultyWithRelations>
    >(`${BASE}/new`, payload);
    return data.data;
  },

  update: async (
    facultyId: string,
    payload: Partial<NewFaculty>,
  ): Promise<Faculty> => {
    const { data } = await axiosInstance.patch<ApiResponse<Faculty>>(
      `${BASE}/${facultyId}`,
      payload,
    );
    return data.data;
  },

  delete: async (facultyId: string): Promise<Faculty> => {
    const { data } = await axiosInstance.delete<ApiResponse<Faculty>>(
      `${BASE}/${facultyId}`,
    );
    return data.data;
  },
};
