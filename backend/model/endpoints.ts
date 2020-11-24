import * as z from "https://unpkg.com/zod-endpoints@0.0.17/lib/deno/mod.ts";
import { Error, Project, Projects } from "./domain.ts";

const project = z.reference("Project", Project);
const projects = z.reference("Projects", Projects);

const errorResponse = z.response({
  status: 500,
  description: "Error occurred",
  body: z.body({
    type: "application/json",
    content: z.reference("Error", Error),
  }),
});

export const endpoints = z.union([
  z.endpoint({
    name: "GET_PROJECTS",
    summary: "List all projects",
    tags: [z.literal("projects")],
    method: "GET",
    path: [z.literal("api"), z.literal("projects")],
    responses: [
      z.response({
        status: 200,
        description: "A array of projects",
        body: z.body({
          type: "application/json",
          content: projects,
        }),
      }),
      errorResponse,
    ],
  }),

  z.endpoint({
    name: "GET_PROJECT",
    summary: "Info for a specific project",
    tags: [z.literal("projects")],
    method: "GET",
    path: [
      z.literal("api"),
      z.literal("projects"),
      z.parameter(z.string())
        .name("projectId")
        .description("The id of the project"),
    ],
    responses: [
      z.response({
        status: 200,
        description: "A array of projects",
        body: z.body({
          type: "application/json",
          content: project,
        }),
      }),
      errorResponse,
    ],
  }),

  z.endpoint({
    name: "CREATE_PROJECT",
    summary: "Create a new project",
    tags: [z.literal("projects")],
    method: "POST",
    path: [
      z.literal("api"),
      z.literal("projects"),
    ],
    body: z.body({
      type: "application/json",
      content: project,
    }),
    responses: [
      z.response({
        status: 201,
        description: "Project create",
      }),
      errorResponse,
    ],
  }),

  z.endpoint({
    name: "UPDATE_PROJECT",
    summary: "Update a project",
    tags: [z.literal("projects")],
    method: "PUT",
    path: [
      z.literal("api"),
      z.literal("projects"),
      z.parameter(z.string())
        .name("projectId")
        .description("The id of the project"),
    ],

    body: z.body({
      type: "application/json",
      content: project,
    }),
    responses: [
      z.response({
        status: 201,
        description: "Project updated",
      }),
      errorResponse,
    ],
  }),

  z.endpoint({
    name: "DELETE_PROJECT",
    summary: "Delete a project",
    tags: [z.literal("projects")],
    method: "DELETE",
    path: [
      z.literal("api"),
      z.literal("projects"),
      z.parameter(z.string())
        .name("projectId")
        .description("The id of the project"),
    ],
    responses: [
      z.response({
        status: 201,
        description: "Project deleted",
      }),
      errorResponse,
    ],
  }),
]);

const info = { version: "1.0.0", title: "Flock. board" };
export const openApi = z.openApi(endpoints, info);
