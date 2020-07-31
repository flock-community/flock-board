import * as z from "../utils/myzod/mod.ts";
import { Infer, literal, string, tuple } from "../utils/myzod/mod.ts";
import { ObjectShape } from "../utils/myzod/types.ts";
import { projectSchema } from "./project.ts";

export const routesSchema = z.union([
  object({
    name: literal("GET_PROJECTS").default(),
    path: tuple([literal("api"), literal("project")]),
    method: literal("GET"),
    headers: object({
      accept: literal("application/json"),
    }),
  }),
  object({
    name: literal("GET_PROJECT").default(),
    path: z.tuple([literal("api"), literal("project"), string()]),
    method: literal("GET"),
    headers: object({
      accept: literal("application/json"),
    }),
  }),
  object({
    name: literal("CREATE_PROJECT").default(),
    path: tuple([literal("api"), literal("project")]),
    method: literal("POST"),
    body: projectSchema,
    headers: object({
      accept: literal("application/json"),
      "content-type": literal("application/json"),
    }),
  }),
  object({
    name: literal("UPDATE_PROJECT").default(),
    path: tuple([literal("api"), literal("project")]),
    method: literal("PUT"),
    body: projectSchema,
    headers: object({
      accept: literal("application/json"),
      "content-type": literal("application/json"),
    }),
  }),
  object({
    name: literal("DELETE_PROJECT").default(),
    path: tuple([literal("api"), literal("project")]),
    body: object({
      id: string(),
    }),
    method: literal("DELETE"),
    headers: object({
      "content-type": literal("application/json"),
    }),
  }),
]);

export type Routes = Infer<typeof routesSchema>;

export function object<T extends ObjectShape>(shape: T) {
  return z.object(shape, { allowUnknown: true });
}
