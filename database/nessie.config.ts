import { ClientPostgreSQL } from "https://deno.land/x/nessie/mod.ts";
import { ClientSQLite } from "https://deno.land/x/nessie/mod.ts";
import {db} from "./config.ts"

const profiles = Deno.env.get("PROFILE")?.split(",") ?? [];
const dev = profiles.includes("development");

/** These are the default config options. */
const clientOptions = {
  migrationFolder: Deno.cwd() + "/database/db/migrations",
  seedFolder: Deno.cwd() + "/database/db/migrations",
};

const clientDev = () =>  new ClientSQLite(clientOptions, "./sqlite.db");

/** Select one of the supported clients */
const clientPro = () => new ClientPostgreSQL(clientOptions, {
  ...db,
  hostname: db.host,
  user: db.username
});

/** This is the final config object */
const config = {
  client: dev ? clientDev() : clientPro(),
  exposeQueryBuilder: true,
};

export default config;
