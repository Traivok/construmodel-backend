import { MigrationInterface, QueryRunner } from "typeorm";

export class projectsTable1666969539898 implements MigrationInterface {
    name = 'projectsTable1666969539898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "work_front" (
                "name" character varying(128) NOT NULL,
                "floors" integer NOT NULL,
                CONSTRAINT "CHK_0d4d09e9445d4e5df5dbf1107c" CHECK ("floors" > 0),
                CONSTRAINT "PK_1e4896bfaf2c7aa157037e92121" PRIMARY KEY ("name")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "sprint" (
                "id" SERIAL NOT NULL,
                "start" TIMESTAMP NOT NULL,
                "end" TIMESTAMP NOT NULL,
                CONSTRAINT "UQ_19ce79c2df4c697b868e1813be2" UNIQUE ("start"),
                CONSTRAINT "UQ_21e1abb0bcbe107c0778c660c9e" UNIQUE ("end"),
                CONSTRAINT "PK_f371c7b5c4bc62fb2ba2bdb9f61" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "task" (
                "work_front_name" character varying NOT NULL,
                "sprint_id" integer NOT NULL,
                "planned" double precision NOT NULL DEFAULT '0',
                "done" double precision NOT NULL DEFAULT '0',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "CHK_812ee6d964e1eaa7db16d4f9b5" CHECK (
                    "planned" >= 0
                    AND "done" >= 0
                ),
                CONSTRAINT "PK_50e67fb2648b2ae282431b27335" PRIMARY KEY ("work_front_name", "sprint_id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_66d1de66413a529fa0f3b3728b2" FOREIGN KEY ("work_front_name") REFERENCES "work_front"("name") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_422c15d3980fd646448d61f61d8" FOREIGN KEY ("sprint_id") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_422c15d3980fd646448d61f61d8"
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_66d1de66413a529fa0f3b3728b2"
        `);
        await queryRunner.query(`
            DROP TABLE "task"
        `);
        await queryRunner.query(`
            DROP TABLE "sprint"
        `);
        await queryRunner.query(`
            DROP TABLE "work_front"
        `);
    }

}
