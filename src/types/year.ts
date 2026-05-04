import { Subject } from "./subject";

export type Year = {
  id: string;
  name: string;
  subjectId: string;
  createdAt: string;
  updatedAt: string;
  subject: Subject & {
    faculty: {
      id: string;
      name: "ARTS" | "SCIENCE" | "COMMERCIAL";
      level: {
        id: string;
        name: "Ordinary Level" | "Advanced Level";
        slug: "o_level" | "a_level";
      };
    };
  };
};

export type NewYear = {
  names: string;
  subjectId: string;
};
