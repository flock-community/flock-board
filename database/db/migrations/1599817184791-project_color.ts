import { Migration } from "https://deno.land/x/nessie/mod.ts";
import { Schema } from "https://deno.land/x/nessie/qb.ts";
import Dex from "https://deno.land/x/dex/mod.ts";

/** Runs on migrate */
export const up: Migration = ({ queryBuilder }) => {
    queryBuilder.queryString(
        "ALTER TABLE Customers ADD color varchar(255);",
    )
    return queryBuilder.query;
};

/** Runs on rollback */
export const down: Migration = ({ queryBuilder }) => {
    queryBuilder.queryString(
        "ALTER TABLE Customers DROP COLUMN color;",
    )
    return queryBuilder.query;
};
