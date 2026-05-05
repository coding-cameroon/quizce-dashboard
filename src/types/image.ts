import { Question } from "./question";

export type Image = {
  id: string;
  questionId: string;
  imageUrl: string;
  publicId: string;
  optionIndex: number | null;
  createdAt: string;
  updatedAt: string;
  question: Question;
};

export type NewImage = {
  questionId: string;
  images: File[];
};
