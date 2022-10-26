import { MigrationInterface, QueryRunner } from "typeorm";

export class progressLateRm1666801937190 implements MigrationInterface {
    name = 'progressLateRm1666801937190'

    public async up(queryRunner: QueryRunner): Promise<void> {
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
            CREATE VIEW "progress_view" AS
            SELECT DISTINCT ON ("pl"."sprint_id", "pl"."work_front_name") "pl"."sprint_id",
                "pl"."work_front_name",
                "pl"."floor" AS planned_floor,
                COALESCE("pg"."floor", 0) AS current_floor,
                COALESCE(
                    "pg"."date",
                    ("s"."start" + '8d23h59m59s999ms'::interval)
                ) AS progression_date
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
        `, ["public","VIEW","progress_view","SELECT DISTINCT ON (\"pl\".\"sprint_id\", \"pl\".\"work_front_name\") \"pl\".\"sprint_id\", \"pl\".\"work_front_name\", \"pl\".\"floor\" AS planned_floor, COALESCE(\"pg\".\"floor\", 0) AS current_floor, COALESCE(\"pg\".\"date\", (\"s\".\"start\" + '8d23h59m59s999ms'::interval)) AS progression_date FROM \"plan\" \"pl\" INNER JOIN \"sprint\" \"s\" ON \"s\".\"id\" = \"pl\".\"sprint_id\"  LEFT JOIN \"execution\" \"pg\" ON \"pg\".\"building_id\" = \"s\".\"building_id\"  AND  \"pg\".\"work_front_name\" = \"pl\".\"work_front_name\"  AND  \"pg\".\"date\" < (\"s\".\"start\" + '8d23h59m59s999ms'::interval) ORDER BY \"pl\".\"sprint_id\" ASC, \"pl\".\"work_front_name\" ASC, progression_date DESC"]);
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

}
