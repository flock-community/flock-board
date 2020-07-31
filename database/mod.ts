import { Database } from "https://deno.land/x/denodb/mod.ts";
import { Project } from "./model/Project.ts";

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

const dbPro = () =>
  new Database("postgres", {
    database: "postgres",
    host: "34.91.180.159",
    port: 5432,
    username: "postgres",
    password: "gYlAptvf36Em",
  });

(dev ? dbDev() : dbPro()).link([Project]);

export { Project };
