import { MigrationInterface, QueryRunner } from "typeorm";

export class progressId1665786756198 implements MigrationInterface {
    name = 'progressId1665786756198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "progress"
            ADD "id" SERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "progress" DROP CONSTRAINT "PK_6d99ec2a1ed1d2cf016c99267dc"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
            ADD CONSTRAINT "PK_0814601656c48277307bed1a0db" PRIMARY KEY ("work_front_id", "sprint_id", "id")
        `);
        await queryRunner.query(`
            ALTER TABLE "progress" DROP CONSTRAINT "FK_bb5cf793ee95c3847ddde09b491"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress" DROP CONSTRAINT "FK_d793a5595402c395fcfed4b8dc6"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress" DROP CONSTRAINT "PK_0814601656c48277307bed1a0db"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
            ADD CONSTRAINT "PK_bbc7daa0db1e8917c03b95b9113" PRIMARY KEY ("sprint_id", "id")
        `);
        await queryRunner.query(`
            ALTER TABLE "progress" DROP CONSTRAINT "PK_bbc7daa0db1e8917c03b95b9113"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
            ADD CONSTRAINT "PK_79abdfd87a688f9de756a162b6f" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
            ADD CONSTRAINT "UQ_6d99ec2a1ed1d2cf016c99267dc" UNIQUE ("work_front_id", "sprint_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
            ADD CONSTRAINT "FK_bb5cf793ee95c3847ddde09b491" FOREIGN KEY ("work_front_id") REFERENCES "work_front"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
            ADD CONSTRAINT "FK_d793a5595402c395fcfed4b8dc6" FOREIGN KEY ("sprint_id") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "progress" DROP CONSTRAINT "FK_d793a5595402c395fcfed4b8dc6"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress" DROP CONSTRAINT "FK_bb5cf793ee95c3847ddde09b491"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress" DROP CONSTRAINT "UQ_6d99ec2a1ed1d2cf016c99267dc"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress" DROP CONSTRAINT "PK_79abdfd87a688f9de756a162b6f"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
            ADD CONSTRAINT "PK_bbc7daa0db1e8917c03b95b9113" PRIMARY KEY ("sprint_id", "id")
        `);
        await queryRunner.query(`
            ALTER TABLE "progress" DROP CONSTRAINT "PK_bbc7daa0db1e8917c03b95b9113"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
            ADD CONSTRAINT "PK_0814601656c48277307bed1a0db" PRIMARY KEY ("work_front_id", "sprint_id", "id")
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
            ADD CONSTRAINT "FK_d793a5595402c395fcfed4b8dc6" FOREIGN KEY ("sprint_id") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
            ADD CONSTRAINT "FK_bb5cf793ee95c3847ddde09b491" FOREIGN KEY ("work_front_id") REFERENCES "work_front"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "progress" DROP CONSTRAINT "PK_0814601656c48277307bed1a0db"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
            ADD CONSTRAINT "PK_6d99ec2a1ed1d2cf016c99267dc" PRIMARY KEY ("work_front_id", "sprint_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "progress" DROP COLUMN "id"
        `);
    }

}
