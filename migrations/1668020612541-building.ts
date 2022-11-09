import { MigrationInterface, QueryRunner } from "typeorm";

export class building1668020612541 implements MigrationInterface {
    name = 'building1668020612541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "building" (
                "id" SERIAL NOT NULL,
                "started_at" date NOT NULL,
                "planned_ending" date NOT NULL,
                "name" character varying(64) NOT NULL,
                "description" character varying(512) NOT NULL,
                "image_url" character varying(128),
                CONSTRAINT "PK_bbfaf6c11f141a22d2ab105ee5f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "sprint"
            ADD "building_id" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "sprint"
            ADD CONSTRAINT "FK_0733ebd2f6f17f8de93eae509cf" FOREIGN KEY ("building_id") REFERENCES "building"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "sprint" DROP CONSTRAINT "FK_0733ebd2f6f17f8de93eae509cf"
        `);
        await queryRunner.query(`
            ALTER TABLE "sprint" DROP COLUMN "building_id"
        `);
        await queryRunner.query(`
            DROP TABLE "building"
        `);
    }

}
