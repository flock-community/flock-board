import { Project } from "./../../model/graphql/TypeScript/board";

export function getProjects(): Promise<Project[]> {
  const project: Project = {
    id: "id",
    name: "Project",
    description: "project description",
    timestamp: new Date(),
    state: "OPEN"
  };

  return Promise.resolve([project]);
}

export function postProject(project: Project): Promise<any> {
  return Promise.resolve({});
}
