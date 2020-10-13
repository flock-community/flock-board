import * as z from "https://raw.githubusercontent.com/flock-community/zod-router/master/mod.ts";
import { router } from "./model/router.ts";
import { app } from "./app.ts";

export const api: z.Api<typeof router> = {
  "GET_PROJECT": ({path}) => app.services.projects.get(path[2]).then(it => ({status: 200, content:it})),
  "GET_PROJECTS": () => app.services.projects.getAll().then(it => ({status: 200, content:it})),
  "CREATE_PROJECT": ({body}) => app.services.projects.create(body).then(_ => ({status: 201})),
  "UPDATE_PROJECT": ({path, body}) => app.services.projects.update(path[2], body).then(_ => ({status: 201})),
  "DELETE_PROJECT": ({path}) => app.services.projects.delete(path[2]).then(_ => ({status: 201})),
};