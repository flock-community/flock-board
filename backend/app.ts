import {
  StaticServer,
  StaticServerDevelopment,
  StaticServerProduction,
} from './services/static-server.ts';
import { CrudService } from './services/crud-service.ts';
import { Project } from '../frontend/model/graphql/TypeScript/board.ts';
import { MemoryCrudService } from './services/memory-crud-service.ts';
import {ProjectService} from "./services/project-service.ts";

interface App {
  staticServer: StaticServer;
  services: {
    projects: CrudService<Project>;
  };
}

export let app: App;

export function createApp() {
  const profiles = Deno.env.get('PROFILE')?.split(',') ?? [];
  const dev = profiles.includes('development');

  app = {
    staticServer: dev
      ? new StaticServerDevelopment({ baseUrl: 'http://localhost:3000' })
      : new StaticServerProduction(),

    services: {
      projects: new MemoryCrudService<Project>('project', []),
    },
  };
}
