import { Project } from '../../model/graphql/TypeScript/board';

export function getProjects(): Promise<Project[]> {
  return fetch('/projects', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then((it) => it.json() as Promise<Project[]>);

  // return Promise.resolve([
  //   {
  //     id: 'id',
  //     name: 'Project',
  //     description: 'project description',
  //     timestamp: new Date(),
  //     state: 'OPEN',
  //   },
  // ]);
}

export function postProject(project: Project): Promise<any> {
  return Promise.resolve({});
}
