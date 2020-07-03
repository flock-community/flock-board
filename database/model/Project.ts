import { DataTypes, Model } from 'https://deno.land/x/denodb/mod.ts';

export class Project extends Model {
    static table = 'project';
    static timestamps = true;

    static fields = {
        id: { primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
        destination: DataTypes.STRING,
    };

    static defaults = {
        flightDuration: 2.5,
    };
}
