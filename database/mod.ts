import { Database } from "https://deno.land/x/denodb/mod.ts";
import { Project } from "./model/Project.ts";

const profiles = Deno.env.get("PROFILE")?.split(",") ?? [];
const dev = profiles.includes("development");

const dbDev = new Database("postgres", {
  database: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "postgres",
  password: "gYlAptvf36Em",
});

const dbPro = new Database("postgres", {
  database: "postgres",
  host: "34.91.180.159",
  port: 5432,
  username: "postgres",
  password: "gYlAptvf36Em",
});

(dev ? dbDev : dbPro).link([Project]);

export { Project };
