import * as z from "https://unpkg.com/zod-endpoints@0.0.17/lib/deno/mod.ts";
import { endpoints } from "./model/endpoints.ts";
import { app } from "./app.ts";

export const api: z.Api<typeof endpoints> = {
  "GET_PROJECT": ({ path }) =>
    app.services.projects.get(path[2]).then((it) => ({
      status: 200,
      body: { type: "application/json", content: it },
    })),
  "GET_PROJECTS": () =>
    app.services.projects.getAll().then((it) => ({
      status: 200,
      body: { type: "application/json", content: it },
    })),
  "CREATE_PROJECT": ({ body }) =>
    app.services.projects.create(body.content).then((_) => ({ status: 201 })),
  "UPDATE_PROJECT": ({ path, body }) =>
    app.services.projects.update(path[2], body.content).then((_) => ({
      status: 201,
    })),
  "DELETE_PROJECT": ({ path }) =>
    app.services.projects.delete(path[2]).then((_) => ({ status: 201 })),
};
