import * as z from "../../zod-router/mod.ts";
import { router } from "./model/router.ts";

export const api: z.Api<typeof router> = {
  "GET_PROJECT": ({path}) =>{
      const id = path[2]
      return Promise.resolve({
          status: 200,
          content: {
              id: "1",
              name: "Project 1",
              description: "This is project 1",
              createdAt: new Date(),
              updatedAt: new Date(),
              state: "OPEN",
              color: "Red",
          },
      })
  },
  "GET_PROJECTS": () =>
    Promise.resolve({
      status: 200,
      content: [{
        id: "1",
        name: "Project 1",
        description: "This is project 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        state: "OPEN",
        color: "Red",
      }],
    }),
  "CREATE_PROJECT": () =>
    Promise.resolve({
      status: 201,
      content: {
        id: "1",
        name: "Project 1",
        description: "This is project 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        state: "OPEN",
        color: "Red",
      },
    }),
  "UPDATE_PROJECT": () =>
    Promise.resolve({
      status: 201,
    }),
  "DELETE_PROJECT": () =>
    Promise.resolve({
      status: 201,
    }),
};