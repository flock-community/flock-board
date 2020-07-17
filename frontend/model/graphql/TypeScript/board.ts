export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  state: ProjectState;
}

export type ProjectState = "OPEN" | "IN_PROGRESS" | "DONE";
