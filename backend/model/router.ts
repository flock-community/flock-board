import * as z from "https://raw.githubusercontent.com/flock-community/zod-router/master/mod.ts";
import { Error, Project, Projects } from "./domain.ts";

const project = z.reference("Project", Project);
const projects = z.reference("Projects", Projects);

const errorResponse = z.response({
  status: 500,
  description: "Error occurred",
  type: "application/json",
  content: z.reference("Error", Error),
});

export const router = z.router([
  z.route({
    name: "GET_PROJECTS",
    summary: "List all projects",
    tags: [z.literal("projects")],
    method: "GET",
    path: [z.literal("api"), z.literal("projects")],
    responses: [
      z.response({
        status: 200,
        description: "A array of projects",
        type: "application/json",
        content: projects,
      }),
      errorResponse,
    ],
  }),

  z.route({
    name: "GET_PROJECT",
    summary: "Info for a specific project",
    tags: [z.literal("api"), z.literal("projects")],
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
        type: "application/json",
        content: project,
      }),
      errorResponse,
    ],
  }),

  z.route({
    name: "CREATE_PROJECT",
    summary: "Create a new project",
    tags: [z.literal("projects")],
    method: "POST",
    path: [
      z.literal("api"),
      z.literal("projects"),
    ],
    query: {},
    headers: {},
    type: "application/json",
    body: project,
    responses: [
      z.response({
        status: 201,
        description: "Project create",
        headers: {},
      }),
      errorResponse,
    ],
  }),

  z.route({
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
    type: "application/json",
    body: project,
    responses: [
      z.response({
        status: 201,
        description: "Project updated",
        type: "application/json",
      }),
      errorResponse,
    ],
  }),

  z.route({
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
        type: "application/json",
      }),
      errorResponse,
    ],
  }),
]);

const info = { version: "1.0.0", title: "Flock. board" };
export const openApi = z.openApi(router, info);
