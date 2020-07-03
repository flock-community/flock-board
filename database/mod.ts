import { Database } from 'https://deno.land/x/denodb/mod.ts';
import {Project} from "./model/Project.ts";

const db = new Database('postgres', {
    database: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "postgres",
    password: "gYlAptvf36Em",
});

db.link([Project]);

export {Project}
