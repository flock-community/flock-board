import * as z from "../utils/myzod/mod.ts";
import { literals } from "../utils/myzod/mod.ts";
import type { Project } from "../../frontend/target/model/board.ts";
import { object } from "./routes.ts";

export const projectSchema: z.Type<Project> = object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  state: literals("OPEN", "IN_PROGRESS", "DONE"),
  color: z.string()
});
