import { axiosInstance } from "@/lib/axios";
import { ApiResponse } from "@/types";
import { Image } from "@/types/image";

const BASE = "/images";

export const imageService = {
  getAll: async (): Promise<Image[]> => {
    const { data } = await axiosInstance.get<ApiResponse<Image[]>>(BASE);
    return data.data;
  },

  getById: async (imageId: string): Promise<Image> => {
    const { data } = await axiosInstance.get<ApiResponse<Image>>(
      `${BASE}/${imageId}`,
    );
    return data.data;
  },

  getByQuestionId: async (questionId: string): Promise<Image[]> => {
    const { data } = await axiosInstance.get<ApiResponse<Image[]>>(
      `${BASE}/${questionId}/question`,
    );
    return data.data;
  },

  getByYearId: async (yearId: string): Promise<Image[]> => {
    const { data } = await axiosInstance.get<ApiResponse<Image[]>>(
      `${BASE}/${yearId}/year`,
    );
    return data.data;
  },

  upload: async (questionId: string, files: File[]): Promise<Image[]> => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    const { data } = await axiosInstance.post<ApiResponse<Image[]>>(
      `${BASE}/${questionId}/upload`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return data.data;
  },

  delete: async (imageId: string): Promise<Image> => {
    const { data } = await axiosInstance.delete<ApiResponse<Image>>(
      `${BASE}/${imageId}`,
    );
    return data.data;
  },

  deleteByQuestionId: async (questionId: string): Promise<Image[]> => {
    const { data } = await axiosInstance.delete<ApiResponse<Image[]>>(
      `${BASE}/${questionId}/question`,
    );
    return data.data;
  },
};
