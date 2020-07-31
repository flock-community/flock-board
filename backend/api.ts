import { app } from "./app.ts";
import { Routes } from "./model/routes.ts";
import { Response } from "https://deno.land/std/http/server.ts";

export async function api(route: Routes): Promise<Response> {
  switch (route.name) {
    case "GET_PROJECTS":
      return {
        body: JSON.stringify(await app.services.projects.getAll()),
      };
    case "GET_PROJECT":
      return {
        body: JSON.stringify(await app.services.projects.get(route.path[2])),
      };
    case "CREATE_PROJECT":
      return {
        body: JSON.stringify(await app.services.projects.create(route.body)),
      };
    case "UPDATE_PROJECT":
      return {
        body: JSON.stringify(
          await app.services.projects.update(route.body.id, route.body)
        ),
      };
    case "DELETE_PROJECT":
      await app.services.projects.delete(route.body.id);
      return {
        status: 204,
      };
  }
}
