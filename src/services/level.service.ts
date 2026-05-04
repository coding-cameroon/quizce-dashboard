import { axiosInstance } from "@/lib/axios";
import { ApiResponse, Level, NewLevel } from "@/types/levels";

const levelBaseURL = "/levels";

export const levelServices = {
  async getAllLevels(): Promise<Level[]> {
    const { data } =
      await axiosInstance.get<ApiResponse<Level[]>>(levelBaseURL);
    return data.data;
  },

  async getLevelById(levelId: string): Promise<Level> {
    const { data } = await axiosInstance.get<ApiResponse<Level>>(
      `${levelBaseURL}/${levelId}`,
    );
    return data.data;
  },

  async getLevelBySlug(slug: "o_level" | "a_level"): Promise<Level> {
    const { data } = await axiosInstance.get<ApiResponse<Level>>(
      `${levelBaseURL}/${slug}/slug`,
    );
    return data.data;
  },

  async createlevel(payload: NewLevel): Promise<Level> {
    const { data } = await axiosInstance.post<ApiResponse<Level>>(
      `${levelBaseURL}/new`,
      payload,
    );
    return data.data;
  },

  async updateLevel(
    levelId: string,
    payload: Partial<NewLevel>,
  ): Promise<Level> {
    const { data } = await axiosInstance.patch(
      `${levelBaseURL}/${levelId}`,
      payload,
    );
    return data.data;
  },

  async deleteLevel(levelId: string): Promise<Level> {
    const { data } = await axiosInstance.delete(`${levelBaseURL}/${levelId}`);
    return data.data;
  },
};
