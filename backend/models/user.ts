import { DATA_TYPES, Model } from "https://deno.land/x/denodb/mod.ts";

export class User extends Model {
  static table = "users";
  static timestamps = true;

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    name: DATA_TYPES.STRING,
  };
}
