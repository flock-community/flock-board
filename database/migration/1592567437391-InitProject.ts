import {MigrationInterface, QueryRunner} from "https://denolib.com/denolib/typeorm@v0.2.23-rc4/mod.ts";

export class InitProject1592567437391 implements MigrationInterface {
    name = 'InitProject1592567437391'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "project" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "timestamp" datetime NOT NULL)`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "project"`, undefined);
    }

}
