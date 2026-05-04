import { Faculty } from "./faculty";

export type Subject = {
  id: string;
  name: string;
  slug: string;
  facultyId: string;
  createdAt: string;
  updatedAt: string;
  faculty: Faculty & {
    level: {
      id: string;
      name: "Ordinary Level" | "Advanced Level";
      slug: "o_level" | "a_level";
    };
  };
};

export type NewSubject = {
  name: string;
  slug: string;
  facultyId: string;
};
