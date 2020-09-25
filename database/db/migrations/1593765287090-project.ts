import { Migration } from "https://deno.land/x/nessie/mod.ts";
import { Schema } from "https://deno.land/x/nessie/qb.ts";

/** Runs on migrate */
export const up: Migration<Schema> = ({ queryBuilder }) => {
  queryBuilder.create("project", (table) => {
    table.string("id", 32);
    table.string("name", 100).nullable();
    table.string("description", 255).nullable();
    table.string("state", 255).nullable();
    table.timestamp("created_at");
    table.timestamp("updated_at");
  });
  return queryBuilder.query;
};

/** Runs on rollback */
export const down: Migration<Schema> = ({ queryBuilder }) => {
  return queryBuilder.drop("project");
};
