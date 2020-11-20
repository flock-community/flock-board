import { Project } from "./../../target/model/board";

export function getRepoData(project: Project): Promise<any> {
  return fetch(
    `https://api.github.com/repos/${project.organization}/${project.repo}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  ).then((it) => it.json());
}

export function getPullsData(project: Project): Promise<any> {
  return fetch(
    `https://api.github.com/repos/${project.organization}/${project.repo}/pulls`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  ).then((it) => it.json());
}
