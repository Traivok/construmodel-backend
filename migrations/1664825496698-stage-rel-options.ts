import { MigrationInterface, QueryRunner } from "typeorm";

export class stageRelOptions1664825496698 implements MigrationInterface {
    name = 'stageRelOptions1664825496698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "stage" DROP CONSTRAINT "FK_d9337d19acdc71f1d2e6abe7e4d"
        `);
        await queryRunner.query(`
            ALTER TABLE "stage"
            ALTER COLUMN "project_id"
            SET NOT NULL
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
            ALTER TABLE "stage"
            ALTER COLUMN "project_id" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "stage"
            ADD CONSTRAINT "FK_d9337d19acdc71f1d2e6abe7e4d" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
