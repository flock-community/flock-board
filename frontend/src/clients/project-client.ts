import { Project } from '../../model/graphql/TypeScript/board';

export function getProjects(): Promise<Project[]> {
  return fetch('/api/project', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((it) => it.json())
    .then(internalizeProject);

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

function internalizeProject(json: any) {
  return json.map((it: any) => ({ ...it, timestamp: new Date(it.timestamp) }));
}

export function postProject(project: Project): Promise<any> {
  return Promise.resolve({});
}
