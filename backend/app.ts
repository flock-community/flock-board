import {
  StaticServer,
  StaticServerDevelopment,
  StaticServerProduction,
} from "./services/static-server.ts";
import type { CrudService } from "./services/crud-service.ts";
import type { Project } from "../frontend/target/model/board.ts";
import { MemoryCrudService } from "./services/memory-crud-service.ts";
import { ProjectService } from "./services/project-service.ts";

interface App {
  staticServer: StaticServer;
  services: {
    projects: CrudService<Project>;
  };
}

export let app: App;

export function createApp() {
  const profiles = Deno.env.get("PROFILE")?.split(",") ?? [];
  const dev = profiles.includes("development");

  app = {
    staticServer: dev
      ? new StaticServerDevelopment({ baseUrl: "http://localhost:3000" })
      : new StaticServerProduction(),

    services: {
      projects: dev
        ? new MemoryCrudService<Project>("project", [])
        : new ProjectService(),
    },
  };
}
