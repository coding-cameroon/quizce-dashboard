import { axiosInstance } from "@/lib/axios";
import { ApiResponse } from "@/types";
import {
  CreateQuestionsPayload,
  ParsedQuestion,
  Question,
} from "@/types/question";

const BASE = "/questions";

export const questionService = {
  getAll: async (yearId?: string): Promise<Question[]> => {
    const { data } = await axiosInstance.get<ApiResponse<Question[]>>(BASE, {
      params: yearId ? { yearId } : undefined,
    });
    return data.data;
  },

  getById: async (questionId: string): Promise<Question> => {
    const { data } = await axiosInstance.get<ApiResponse<Question>>(
      `${BASE}/${questionId}`,
    );
    return data.data;
  },

  getByYearId: async (yearId: string): Promise<Question[]> => {
    const { data } = await axiosInstance.get<ApiResponse<Question[]>>(
      `${BASE}/${yearId}/year`,
    );
    return data.data;
  },

  create: async (payload: CreateQuestionsPayload): Promise<Question[]> => {
    const { data } = await axiosInstance.post<ApiResponse<Question[]>>(
      `${BASE}/new`,
      payload,
    );
    return data.data;
  },

  delete: async (questionId: string): Promise<Question> => {
    const { data } = await axiosInstance.delete<ApiResponse<Question>>(
      `${BASE}/${questionId}`,
    );
    return data.data;
  },

  deleteByYearId: async (yearId: string): Promise<Question[]> => {
    const { data } = await axiosInstance.delete<ApiResponse<Question[]>>(
      `${BASE}/${yearId}/year`,
    );
    return data.data;
  },

  parsePDF: async (yearId: string, file: File): Promise<ParsedQuestion[]> => {
    const formData = new FormData();
    formData.append("pdf", file);
    const { data } = await axiosInstance.post<ApiResponse<ParsedQuestion[]>>(
      `${BASE}/${yearId}/parse-pdf`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );

    console.log(JSON.stringify(data.data));

    return data.data;
  },
};
