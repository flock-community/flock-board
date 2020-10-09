import { DataTypes, Model } from "../deps.ts";

export class Project extends Model {
  static table = "project";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    state: DataTypes.enum(["OPEN", "IN_PROGRESS", "DONE"]),
    color: DataTypes.STRING,
    people: DataTypes.STRING
  };

  static defaults = {};
}
