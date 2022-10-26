import { MigrationInterface, QueryRunner } from "typeorm";

export class projectsTable1666799923258 implements MigrationInterface {
    name = 'projectsTable1666799923258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "execution" (
                "work_front_name" character varying NOT NULL,
                "building_id" integer NOT NULL,
                "date" TIMESTAMP NOT NULL,
                "floor" double precision NOT NULL,
                CONSTRAINT "PK_288c141fff6dec4cfa99ea20201" PRIMARY KEY ("work_front_name", "building_id", "date")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "sprint" (
                "id" SERIAL NOT NULL,
                "start" TIMESTAMP NOT NULL,
                "building_id" integer NOT NULL,
                CONSTRAINT "UQ_55694cdb00394029546b808fbaf" UNIQUE ("start", "building_id"),
                CONSTRAINT "PK_f371c7b5c4bc62fb2ba2bdb9f61" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "plan" (
                "work_front_name" character varying NOT NULL,
                "sprint_id" integer NOT NULL,
                "floor" double precision NOT NULL,
                CONSTRAINT "PK_95ef5a1cec41df8a784c94629db" PRIMARY KEY ("work_front_name", "sprint_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "work_front" (
                "name" character varying NOT NULL,
                CONSTRAINT "PK_1e4896bfaf2c7aa157037e92121" PRIMARY KEY ("name")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "building" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "floor_count" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_bbfaf6c11f141a22d2ab105ee5f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "buildings_rel_work_fronts" (
                "building_id" integer NOT NULL,
                "work_front_name" character varying NOT NULL,
                CONSTRAINT "PK_4213ebdabb59a0dceac43bb9c61" PRIMARY KEY ("building_id", "work_front_name")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a74a53cdf86c17ac08df13b280" ON "buildings_rel_work_fronts" ("building_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_ce090c24dd1aa74cad398a0cd0" ON "buildings_rel_work_fronts" ("work_front_name")
        `);
        await queryRunner.query(`
            ALTER TABLE "execution"
            ADD CONSTRAINT "FK_f59d07620404e47ccc8a4d39d7c" FOREIGN KEY ("work_front_name") REFERENCES "work_front"("name") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "execution"
            ADD CONSTRAINT "FK_4b304655f754ba931a4b2660b07" FOREIGN KEY ("building_id") REFERENCES "building"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "sprint"
            ADD CONSTRAINT "FK_0733ebd2f6f17f8de93eae509cf" FOREIGN KEY ("building_id") REFERENCES "building"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "plan"
            ADD CONSTRAINT "FK_67fc24ffc273f82646f4c0624a5" FOREIGN KEY ("work_front_name") REFERENCES "work_front"("name") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "plan"
            ADD CONSTRAINT "FK_bb08a1e6f6ee92be216f5d1b6ee" FOREIGN KEY ("sprint_id") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts"
            ADD CONSTRAINT "FK_a74a53cdf86c17ac08df13b2808" FOREIGN KEY ("building_id") REFERENCES "building"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts"
            ADD CONSTRAINT "FK_ce090c24dd1aa74cad398a0cd08" FOREIGN KEY ("work_front_name") REFERENCES "work_front"("name") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            CREATE VIEW "progress_view" AS
            SELECT DISTINCT ON ("pl"."sprint_id", "pl"."work_front_name") "pl"."sprint_id",
                "pl"."work_front_name",
                "pl"."floor" AS planned_floor,
                COALESCE("pg"."floor", 0) AS current_floor,
                COALESCE(
                    "pg"."date",
                    ("s"."start" + '8d23h59m59s999ms'::interval)
                ) AS progression_date,
                (COALESCE("pg"."floor", 0) < "pl"."floor") AS late
            FROM "plan" "pl"
                INNER JOIN "sprint" "s" ON "s"."id" = "pl"."sprint_id"
                LEFT JOIN "execution" "pg" ON "pg"."building_id" = "s"."building_id"
                AND "pg"."work_front_name" = "pl"."work_front_name"
                AND "pg"."date" < ("s"."start" + '8d23h59m59s999ms'::interval)
            ORDER BY "pl"."sprint_id" ASC,
                "pl"."work_front_name" ASC,
                progression_date DESC
        `);
        await queryRunner.query(`
            INSERT INTO "typeorm_metadata"(
                    "database",
                    "schema",
                    "table",
                    "type",
                    "name",
                    "value"
                )
            VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)
        `, ["public","VIEW","progress_view","SELECT DISTINCT ON (\"pl\".\"sprint_id\", \"pl\".\"work_front_name\") \"pl\".\"sprint_id\", \"pl\".\"work_front_name\", \"pl\".\"floor\" AS planned_floor, COALESCE(\"pg\".\"floor\", 0) AS current_floor, COALESCE(\"pg\".\"date\", (\"s\".\"start\" + '8d23h59m59s999ms'::interval)) AS progression_date, (COALESCE(\"pg\".\"floor\", 0) < \"pl\".\"floor\") AS late FROM \"plan\" \"pl\" INNER JOIN \"sprint\" \"s\" ON \"s\".\"id\" = \"pl\".\"sprint_id\"  LEFT JOIN \"execution\" \"pg\" ON \"pg\".\"building_id\" = \"s\".\"building_id\"  AND  \"pg\".\"work_front_name\" = \"pl\".\"work_front_name\"  AND  \"pg\".\"date\" < (\"s\".\"start\" + '8d23h59m59s999ms'::interval) ORDER BY \"pl\".\"sprint_id\" ASC, \"pl\".\"work_front_name\" ASC, progression_date DESC"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "typeorm_metadata"
            WHERE "type" = $1
                AND "name" = $2
                AND "schema" = $3
        `, ["VIEW","progress_view","public"]);
        await queryRunner.query(`
            DROP VIEW "progress_view"
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts" DROP CONSTRAINT "FK_ce090c24dd1aa74cad398a0cd08"
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts" DROP CONSTRAINT "FK_a74a53cdf86c17ac08df13b2808"
        `);
        await queryRunner.query(`
            ALTER TABLE "plan" DROP CONSTRAINT "FK_bb08a1e6f6ee92be216f5d1b6ee"
        `);
        await queryRunner.query(`
            ALTER TABLE "plan" DROP CONSTRAINT "FK_67fc24ffc273f82646f4c0624a5"
        `);
        await queryRunner.query(`
            ALTER TABLE "sprint" DROP CONSTRAINT "FK_0733ebd2f6f17f8de93eae509cf"
        `);
        await queryRunner.query(`
            ALTER TABLE "execution" DROP CONSTRAINT "FK_4b304655f754ba931a4b2660b07"
        `);
        await queryRunner.query(`
            ALTER TABLE "execution" DROP CONSTRAINT "FK_f59d07620404e47ccc8a4d39d7c"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_ce090c24dd1aa74cad398a0cd0"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_a74a53cdf86c17ac08df13b280"
        `);
        await queryRunner.query(`
            DROP TABLE "buildings_rel_work_fronts"
        `);
        await queryRunner.query(`
            DROP TABLE "building"
        `);
        await queryRunner.query(`
            DROP TABLE "work_front"
        `);
        await queryRunner.query(`
            DROP TABLE "plan"
        `);
        await queryRunner.query(`
            DROP TABLE "sprint"
        `);
        await queryRunner.query(`
            DROP TABLE "execution"
        `);
    }

}
