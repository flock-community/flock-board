import * as z from "https://raw.githubusercontent.com/flock-community/zod-router/master/mod.ts";
import {Error, Project, Projects} from "./domain.ts";

const errorResponse = z.response({
    status: 500,
    description: "Error occurred",
    headers: {},
    type: "application/json",
    content: z.reference("Error", Error),
})

export const router = z.router([
    z.route({
        name: "GET_PROJECTS",
        summary: "List all projects",
        tags: [z.literal("projects")],
        method: "GET",
        path: [z.literal("api"), z.literal("projects")],
        query: {},
        headers: {},
        responses: [
            z.response({
                status: 200,
                description: "A array of projects",
                headers: {},
                type: "application/json",
                content: z.reference("Projects", Projects),
            }),
            errorResponse
        ]
    }),

    z.route({
        name: "GET_PROJECT",
        summary: "Info for a specific project",
        tags: [z.literal("projects")],
        method: "GET",
        path: [
            z.literal("api"),
            z.literal("projects"),
            z.parameter(z.string().uuid())
                .name("projectId")
                .description("The id of the project"),
        ],
        query: {},
        headers: {},
        responses: [
            z.response({
                status: 200,
                description: "A array of projects",
                headers: {},
                type: "application/json",
                content: z.reference("Project", Project),
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
        responses: [
            z.response({
                status: 201,
                description: "Project create",
                headers: {},
                type: "application/json",
                content: z.reference("Project", Project),
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
            z.parameter(z.string().uuid())
                .name("projectId")
                .description("The id of the project"),
        ],
        query: {},
        headers: {},
        responses: [
            z.response({
                status: 201,
                description: "Project updated",
                headers: {},
                type: "application/json",
                content: z.reference("Project", Project),
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
            z.parameter(z.string().uuid())
                .name("projectId")
                .description("The id of the project"),
        ],
        query: {},
        headers: {},
        responses: [
            z.response({
                status: 201,
                description: "Project deleted",
                headers: {},
                type: "application/json",
                content: z.reference("Project", Project),
            }),
            errorResponse,
        ],
    }),
]);

export type RouterOutput = z.output<typeof router>
export type RouterInput = z.input<typeof router>

const info = {version: "1.0.0", title: "Flock. board"}
export const openApi = z.openApi(router, info)