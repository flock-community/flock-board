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
  return json.map((it: any) => ({ ...it, createdAt: new Date(it.createdAt), updatedAt: new Date(it.updatedAt) }));
}

export function postProject(project: Project) {
  return fetch('/api/project', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });
}
