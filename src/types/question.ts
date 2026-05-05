import { Year } from "./year";

export type ImageType = "none" | "question_image" | "option_images";

export type QuestionImage = {
  id: string;
  questionId: string;
  imageUrl: string;
  publicId: string;
  optionIndex: number | null;
  createdAt: string;
  updatedAt: string;
};

export type Question = {
  id: string;
  number: number;
  question: string | null;
  options: string[];
  imageType: ImageType;
  correctOption: string;
  explanation: string;
  yearId: string;
  createdAt: string;
  updatedAt: string;
  year: Year;
  images: QuestionImage[];
};

export type NewQuestion = {
  yearId: string;
  number: number;
  question: string | null;
  options: string[];
  imageType?: ImageType;
  correctOption: string;
  explanation: string;
};

export type CreateQuestionsPayload = {
  questions: NewQuestion[];
};

export type ParsedQuestion = {
  number: number;
  question: string | null;
  options: string[];
  imageType: ImageType;
  correctOption: string;
  explanation: string;
  yearId: string;
};
