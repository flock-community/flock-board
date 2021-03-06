import { Database } from "./deps.ts";
import { Project } from "./model/Project.ts";

import { db } from "./config.ts";

const profiles = Deno.env.get("PROFILE")?.split(",") ?? [];
const dev = profiles.includes("development");

import config from "./nessie.config.ts";

if (config?.exposeQueryBuilder) {
  config.client.exposeQueryBuilder = config.exposeQueryBuilder;
}

await config.client.prepare();
await config.client.migrate(undefined);

const dbDev = () =>
  new Database("sqlite3", {
    filepath: "../sqlite.db",
  });

const dbPro = () => new Database("postgres", db);

(dev ? dbDev() : dbPro()).link([Project]);

export { Project };
