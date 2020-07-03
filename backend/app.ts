import {
  StaticServer,
  StaticServerDevelopment,
  StaticServerProduction,
} from './services/static-server.ts';

interface App {
  staticServer: StaticServer;
}

export let app: App;

export function createApp() {
  const profiles = Deno.env.get('PROFILE')?.split(',') ?? [];
  const dev = profiles.includes('development');

  app = {
    staticServer: dev
      ? new StaticServerDevelopment({ baseUrl: 'http://localhost:3000' })
      : new StaticServerProduction(),
  };
}
