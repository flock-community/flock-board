export interface Project {
  id: string;
  name: string;
  description: string;
  timestamp: Date;
  state: ProjectState;
}

export type ProjectState = "OPEN" | "IN_PROGRESS" | "DONE";
