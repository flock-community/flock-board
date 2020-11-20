import { Migration } from "https://deno.land/x/nessie/mod.ts";
import { Schema } from "https://deno.land/x/nessie/qb.ts";

/** Runs on migrate */
export const up: Migration<Schema> = ({ queryBuilder }) => {
  queryBuilder.queryString(
    "ALTER TABLE project ADD organization varchar(255);"
  );
  queryBuilder.queryString("ALTER TABLE project ADD repo varchar(255);");
  return queryBuilder.query;
};

/** Runs on rollback */
export const down: Migration<Schema> = ({ queryBuilder }) => {
  queryBuilder.queryString("ALTER TABLE project DROP COLUMN organization;");
  queryBuilder.queryString("ALTER TABLE project DROP COLUMN repo;");
  return queryBuilder.query;
};
