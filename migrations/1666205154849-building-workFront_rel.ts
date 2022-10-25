import { MigrationInterface, QueryRunner } from "typeorm";

export class buildingWorkFrontRel1666205154849 implements MigrationInterface {
    name = 'buildingWorkFrontRel1666205154849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts" DROP CONSTRAINT "FK_d3224096f9a89fc1cc982b55d8d"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_d3224096f9a89fc1cc982b55d8"
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts"
                RENAME COLUMN "category_id" TO "work_front_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts"
                RENAME CONSTRAINT "PK_a355c7fb98b6cf785981915f2b5" TO "PK_8d2e71847b97cda8dce26899779"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_839be9f4382204201640b7069f" ON "buildings_rel_work_fronts" ("work_front_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts"
            ADD CONSTRAINT "FK_839be9f4382204201640b7069fe" FOREIGN KEY ("work_front_id") REFERENCES "work_front"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts" DROP CONSTRAINT "FK_839be9f4382204201640b7069fe"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_839be9f4382204201640b7069f"
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts"
                RENAME CONSTRAINT "PK_8d2e71847b97cda8dce26899779" TO "PK_a355c7fb98b6cf785981915f2b5"
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts"
                RENAME COLUMN "work_front_id" TO "category_id"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_d3224096f9a89fc1cc982b55d8" ON "buildings_rel_work_fronts" ("category_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts"
            ADD CONSTRAINT "FK_d3224096f9a89fc1cc982b55d8d" FOREIGN KEY ("category_id") REFERENCES "work_front"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
