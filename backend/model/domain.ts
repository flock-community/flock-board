import * as z from "https://raw.githubusercontent.com/flock-community/zod-router/master/mod.ts";
import { ProjectState } from "../../frontend/target/model/board.ts";

export const Error = z.object({
  code: z.integer(),
  message: z.string()
});

export const Project = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  state: z.union([
    z.literal("OPEN"),
    z.literal("IN_PROGRESS"),
    z.literal("DONE")
  ]),
  color: z.string(),
  people: z.array(z.string()),
  organization: z.string(),
  repo: z.string()
});

export const Projects = z.array(z.reference("Project", Project));
