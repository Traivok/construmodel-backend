import { MigrationInterface, QueryRunner } from "typeorm";

export class projectTables1665778632364 implements MigrationInterface {
    name = 'projectTables1665778632364'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "sprint" (
                "id" SERIAL NOT NULL,
                "start" TIMESTAMP NOT NULL,
                "end" TIMESTAMP NOT NULL,
                "building_id" integer NOT NULL,
                CONSTRAINT "PK_f371c7b5c4bc62fb2ba2bdb9f61" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "progress" (
                "work_front_id" integer NOT NULL,
                "sprint_id" integer NOT NULL,
                "current_floor" double precision NOT NULL DEFAULT '0',
                "planned_floor" double precision NOT NULL,
                CONSTRAINT "PK_6d99ec2a1ed1d2cf016c99267dc" PRIMARY KEY ("work_front_id", "sprint_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "work_front" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "UQ_1e4896bfaf2c7aa157037e92121" UNIQUE ("name"),
                CONSTRAINT "PK_73ab98bdb761647b4c3b91702bd" PRIMARY KEY ("id")
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
                "category_id" integer NOT NULL,
                CONSTRAINT "PK_a355c7fb98b6cf785981915f2b5" PRIMARY KEY ("building_id", "category_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a74a53cdf86c17ac08df13b280" ON "buildings_rel_work_fronts" ("building_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_d3224096f9a89fc1cc982b55d8" ON "buildings_rel_work_fronts" ("category_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "sprint"
            ADD CONSTRAINT "FK_0733ebd2f6f17f8de93eae509cf" FOREIGN KEY ("building_id") REFERENCES "building"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
            ADD CONSTRAINT "FK_bb5cf793ee95c3847ddde09b491" FOREIGN KEY ("work_front_id") REFERENCES "work_front"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
            ADD CONSTRAINT "FK_d793a5595402c395fcfed4b8dc6" FOREIGN KEY ("sprint_id") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts"
            ADD CONSTRAINT "FK_a74a53cdf86c17ac08df13b2808" FOREIGN KEY ("building_id") REFERENCES "building"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts"
            ADD CONSTRAINT "FK_d3224096f9a89fc1cc982b55d8d" FOREIGN KEY ("category_id") REFERENCES "work_front"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts" DROP CONSTRAINT "FK_d3224096f9a89fc1cc982b55d8d"
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts" DROP CONSTRAINT "FK_a74a53cdf86c17ac08df13b2808"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress" DROP CONSTRAINT "FK_d793a5595402c395fcfed4b8dc6"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress" DROP CONSTRAINT "FK_bb5cf793ee95c3847ddde09b491"
        `);
        await queryRunner.query(`
            ALTER TABLE "sprint" DROP CONSTRAINT "FK_0733ebd2f6f17f8de93eae509cf"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_d3224096f9a89fc1cc982b55d8"
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
            DROP TABLE "progress"
        `);
        await queryRunner.query(`
            DROP TABLE "sprint"
        `);
    }

}
