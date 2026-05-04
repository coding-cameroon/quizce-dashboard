import { Level } from "./levels";
import { Subject } from "./subject";

export type Faculty = {
  id: string;
  name: "ARTS" | "SCIENCE" | "COMMERCIAL";
  levelId: string;
  createdAt: string;
  updatedAt: string;
  level: Level;
  subjects: Subject[];
};

export type FacultyWithRelations = Faculty & {
  level: Level;
  subjects: Subject[];
};

export type NewFaculty = {
  name: "ARTS" | "SCIENCE" | "COMMERCIAL";
  levelId: string;
};
