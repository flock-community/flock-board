import { DataTypes, Model } from "https://deno.land/x/denodb/mod.ts";

export class Project extends Model {
  static table = "project";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    state: DataTypes.enum(["OPEN", "IN_PROGRESS", "DONE"]),
  };

  static defaults = { };

}
