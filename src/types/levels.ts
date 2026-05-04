export type Level = {
  id: string;
  name: "Ordinary Level" | "Advanced Level";
  slug: "o_level" | "a_level";
  createdAt: string;
  updatedAt: string;
};

export type NewLevel = {
  name: "Ordinary Level" | "Advanced Level";
  slug: "o_level" | "a_level";
};

export type ApiResponse<T> = {
  message: string;
  success: boolean;
  data: T;
};
