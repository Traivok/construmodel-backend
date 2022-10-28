import { MigrationInterface, QueryRunner } from "typeorm";

export class sprintStartEndCheck1666973554100 implements MigrationInterface {
    name = 'sprintStartEndCheck1666973554100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "sprint"
            ADD CONSTRAINT "CHK_25363e173750b6c1f8ba88b5b0" CHECK ("start" < "end")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "sprint" DROP CONSTRAINT "CHK_25363e173750b6c1f8ba88b5b0"
        `);
    }

}
