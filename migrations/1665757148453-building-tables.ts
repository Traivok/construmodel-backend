import { MigrationInterface, QueryRunner } from "typeorm";

export class buildingTables1665757148453 implements MigrationInterface {
    name = 'buildingTables1665757148453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "Floor" (
                "floor_number" integer NOT NULL,
                "work_front_id" integer NOT NULL,
                "expected_at" TIMESTAMP NOT NULL,
                "completed_at" TIMESTAMP,
                CONSTRAINT "CHK_857f9b6372fcced37bccee966f" CHECK (floor_number > 0),
                CONSTRAINT "PK_799c58107315d881d366e95ce8e" PRIMARY KEY ("floor_number", "work_front_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "work_front" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "building_id" integer NOT NULL,
                CONSTRAINT "PK_73ab98bdb761647b4c3b91702bd" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "building" (
                "id" SERIAL NOT NULL,
                "floor_count" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_bbfaf6c11f141a22d2ab105ee5f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "Floor"
            ADD CONSTRAINT "FK_9dfa38a22fe14df3869b1aa44f6" FOREIGN KEY ("work_front_id") REFERENCES "work_front"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "work_front"
            ADD CONSTRAINT "FK_d0aa4a849d8844332b9e7f71250" FOREIGN KEY ("building_id") REFERENCES "building"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "work_front" DROP CONSTRAINT "FK_d0aa4a849d8844332b9e7f71250"
        `);
        await queryRunner.query(`
            ALTER TABLE "Floor" DROP CONSTRAINT "FK_9dfa38a22fe14df3869b1aa44f6"
        `);
        await queryRunner.query(`
            DROP TABLE "building"
        `);
        await queryRunner.query(`
            DROP TABLE "work_front"
        `);
        await queryRunner.query(`
            DROP TABLE "Floor"
        `);
    }

}
