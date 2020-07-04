import { ClientPostgreSQL } from "https://deno.land/x/nessie/mod.ts";
import { ClientSQLite } from "https://deno.land/x/nessie/mod.ts";


const profiles = Deno.env.get("PROFILE")?.split(",") ?? [];
const dev = profiles.includes("development");

/** These are the default config options. */
const clientOptions = {
  migrationFolder: "./db/migrations",
  seedFolder: "./db/seeds",
};

const clientDev = new ClientSQLite(clientOptions, "./sqlite.db");

/** Select one of the supported clients */
const clientPro = new ClientPostgreSQL(clientOptions, {
  database: "postgres",
  hostname: "34.91.180.159",
  port: 5432,
  user: "postgres",
  password: "gYlAptvf36Em",
});

/** This is the final config object */
const config = {
  client: dev ? clientDev : clientPro,
  exposeQueryBuilder: true,
};

export default config;
