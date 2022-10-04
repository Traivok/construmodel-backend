import { MigrationInterface, QueryRunner } from "typeorm";

export class projectStageTaskTables1664813030525 implements MigrationInterface {
    name = 'projectStageTaskTables1664813030525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "task" (
                "name" character varying NOT NULL,
                "id" SERIAL NOT NULL,
                "stage_id" integer NOT NULL,
                "next_task_id" integer,
                "expected_at" TIMESTAMP NOT NULL,
                "completed_at" TIMESTAMP,
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_62744b7f9ca5890d4a87f3825ed" UNIQUE ("next_task_id", "stage_id"),
                CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "stage" (
                "id" SERIAL NOT NULL,
                "description" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "project_id" integer,
                CONSTRAINT "PK_c54d11b3c24a188262844af1612" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "project" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_5fa11f9605015781f97c8b02687" FOREIGN KEY ("stage_id") REFERENCES "stage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_57ffb7e6cd96110abbba48132fe" FOREIGN KEY ("next_task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "stage"
            ADD CONSTRAINT "FK_d9337d19acdc71f1d2e6abe7e4d" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "stage" DROP CONSTRAINT "FK_d9337d19acdc71f1d2e6abe7e4d"
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_57ffb7e6cd96110abbba48132fe"
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_5fa11f9605015781f97c8b02687"
        `);
        await queryRunner.query(`
            DROP TABLE "project"
        `);
        await queryRunner.query(`
            DROP TABLE "stage"
        `);
        await queryRunner.query(`
            DROP TABLE "task"
        `);
    }

}
