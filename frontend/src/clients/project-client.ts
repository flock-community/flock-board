import type { Project } from "../../target/model/board";
import * as z from "myzod";
import { projectSchema } from "../model/project";

export function getProjects(): Promise<Project[]> {
  return fetch("/api/project", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((it) => it.json())
    .then((json) => z.array(projectSchema).parse(json));
}

export function postProject(project: Project) {
  return fetch("/api/project", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
}
