import {app} from "./app.ts";
import type {Routes} from "./model/routes.ts";
import type {Response} from "https://deno.land/std/http/server.ts";
import * as z from "../../zod-router/mod.ts";
import {router} from "./model/router.ts";

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
                    await app.services.projects.update(route.body.id, route.body),
                ),
            };
        case "DELETE_PROJECT":
            await app.services.projects.delete(route.body.id);
            return {
                status: 204,
            };
    }
}

const gets: z.ApiFragment<typeof router, 'GET_PROJECT' | "GET_PROJECTS"> = {
    "GET_PROJECT": ({method, path,}) => Promise.resolve({
        status: 200,
        headers: {},
        content: {
            id: "1",
            name: "Project 1",
            description: "This is project 1",
            createdAt: new Date(),
            updatedAt: new Date(),
            state: "OPEN",
            color: "Red"
        }
    }),
    "GET_PROJECTS": ({method, path,}) => Promise.resolve({
        status: 200,
        headers: {},
        content: [{
            id: "1",
            name: "Project 1",
            description: "This is project 1",
            createdAt: new Date(),
            updatedAt: new Date(),
            state: "OPEN",
            color: "Red"
        }]
    }),
};

const mutations: z.ApiFragment<typeof router, 'CREATE_PROJECT' | "UPDATE_PROJECT" | "DELETE_PROJECT">  = {
    "CREATE_PROJECT": ({method, headers}) => Promise.resolve({
        status: 201,
        headers: {},
    }),
    "UPDATE_PROJECT": ({method}) => Promise.resolve({
        status: 201,
        headers: {},
    }),
    "DELETE_PROJECT": ({method}) => Promise.resolve({
        status: 201,
        headers: {},
    })
}

const api_zod: z.Api<typeof router> = {
    ...gets,
    ...mutations
}