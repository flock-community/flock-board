import { Project } from "../../target/model/board";
import * as z from "myzod";
import { projectSchema } from "../model/project";

export function getProjects(): Promise<Project[]> {
  return fetch("/api/projects", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((it) => it.json())
    .then((json) => z.array(projectSchema).parse(json));
}

export function postProject(project: Project) {
  return fetch("/api/projects", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
}

export function getProject(id: string): Promise<Project> {
  return fetch(`/api/projects/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((it) => it.json())
    .then((json) => projectSchema.parse(json));
}

export function updateProject(id: string, project: Project) {
  return fetch(`/api/projects/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
}

export function deleteProject(id: string) {
  return fetch(`/api/projects/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });
}
