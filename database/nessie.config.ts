import { ClientPostgreSQL } from "https://deno.land/x/nessie/mod.ts";
import { ClientMySQL } from "https://deno.land/x/nessie/mod.ts";
import { ClientSQLite } from "https://deno.land/x/nessie/mod.ts";

/** These are the default config options. */
const clientOptions = {
  migrationFolder: "./db/migrations",
  seedFolder: "./db/seeds",
};

/** Select one of the supported clients */
const clientPg = new ClientPostgreSQL(clientOptions, {
  database: "postgres",
  hostname: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: "gYlAptvf36Em",
});

const clientMySql = new ClientMySQL(clientOptions, {
  hostname: "localhost",
  port: 3306,
  username: "root",
  // password: "pwd", // uncomment this line for <8
  db: "nessie",
});
const clientSqLite = new ClientSQLite(clientOptions, "./sqlite.db");

/** This is the final config object */
const config = {
  client: clientPg,
  // Defaults to false, if you want the query builder exposed in migration files, set this to true.
  exposeQueryBuilder: true,
};

export default config;
