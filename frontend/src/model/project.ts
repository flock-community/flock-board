import * as z from "myzod";
import { Project } from "../../target/model/board";

export const projectSchema: z.Type<Project> = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  state: z.literals("OPEN", "IN_PROGRESS", "DONE"),
});
