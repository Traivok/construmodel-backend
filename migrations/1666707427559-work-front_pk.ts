import { MigrationInterface, QueryRunner } from "typeorm";

export class workFrontPk1666707427559 implements MigrationInterface {
    name = 'workFrontPk1666707427559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "progress" DROP CONSTRAINT "FK_bb5cf793ee95c3847ddde09b491"
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts" DROP CONSTRAINT "FK_839be9f4382204201640b7069fe"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_839be9f4382204201640b7069f"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
                RENAME COLUMN "work_front_id" TO "work_front_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
                RENAME CONSTRAINT "PK_6d99ec2a1ed1d2cf016c99267dc" TO "PK_cf4b2cacc7eea2d6b79f53d9463"
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts"
                RENAME COLUMN "work_front_id" TO "work_front_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts"
                RENAME CONSTRAINT "PK_8d2e71847b97cda8dce26899779" TO "PK_4213ebdabb59a0dceac43bb9c61"
        `);
        await queryRunner.query(`
            ALTER TABLE "work_front" DROP CONSTRAINT "PK_73ab98bdb761647b4c3b91702bd"
        `);
        await queryRunner.query(`
            ALTER TABLE "work_front" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress" DROP CONSTRAINT "PK_cf4b2cacc7eea2d6b79f53d9463"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
            ADD CONSTRAINT "PK_d793a5595402c395fcfed4b8dc6" PRIMARY KEY ("sprint_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "progress" DROP COLUMN "work_front_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
            ADD "work_front_name" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "progress" DROP CONSTRAINT "PK_d793a5595402c395fcfed4b8dc6"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
            ADD CONSTRAINT "PK_cf4b2cacc7eea2d6b79f53d9463" PRIMARY KEY ("sprint_id", "work_front_name")
        `);
        await queryRunner.query(`
            ALTER TABLE "work_front"
            ADD CONSTRAINT "PK_1e4896bfaf2c7aa157037e92121" PRIMARY KEY ("name")
        `);
        await queryRunner.query(`
            ALTER TABLE "work_front" DROP CONSTRAINT "UQ_1e4896bfaf2c7aa157037e92121"
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts" DROP CONSTRAINT "PK_4213ebdabb59a0dceac43bb9c61"
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts"
            ADD CONSTRAINT "PK_a74a53cdf86c17ac08df13b2808" PRIMARY KEY ("building_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts" DROP COLUMN "work_front_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts"
            ADD "work_front_name" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts" DROP CONSTRAINT "PK_a74a53cdf86c17ac08df13b2808"
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts"
            ADD CONSTRAINT "PK_4213ebdabb59a0dceac43bb9c61" PRIMARY KEY ("building_id", "work_front_name")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_ce090c24dd1aa74cad398a0cd0" ON "buildings_rel_work_fronts" ("work_front_name")
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
            ADD CONSTRAINT "FK_e6f4d13bdecbc43a7257e3ad74a" FOREIGN KEY ("work_front_name") REFERENCES "work_front"("name") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts"
            ADD CONSTRAINT "FK_ce090c24dd1aa74cad398a0cd08" FOREIGN KEY ("work_front_name") REFERENCES "work_front"("name") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts" DROP CONSTRAINT "FK_ce090c24dd1aa74cad398a0cd08"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress" DROP CONSTRAINT "FK_e6f4d13bdecbc43a7257e3ad74a"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_ce090c24dd1aa74cad398a0cd0"
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts" DROP CONSTRAINT "PK_4213ebdabb59a0dceac43bb9c61"
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts"
            ADD CONSTRAINT "PK_a74a53cdf86c17ac08df13b2808" PRIMARY KEY ("building_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts" DROP COLUMN "work_front_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts"
            ADD "work_front_name" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts" DROP CONSTRAINT "PK_a74a53cdf86c17ac08df13b2808"
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts"
            ADD CONSTRAINT "PK_4213ebdabb59a0dceac43bb9c61" PRIMARY KEY ("building_id", "work_front_name")
        `);
        await queryRunner.query(`
            ALTER TABLE "work_front"
            ADD CONSTRAINT "UQ_1e4896bfaf2c7aa157037e92121" UNIQUE ("name")
        `);
        await queryRunner.query(`
            ALTER TABLE "work_front" DROP CONSTRAINT "PK_1e4896bfaf2c7aa157037e92121"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress" DROP CONSTRAINT "PK_cf4b2cacc7eea2d6b79f53d9463"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
            ADD CONSTRAINT "PK_d793a5595402c395fcfed4b8dc6" PRIMARY KEY ("sprint_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "progress" DROP COLUMN "work_front_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
            ADD "work_front_name" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "progress" DROP CONSTRAINT "PK_d793a5595402c395fcfed4b8dc6"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
            ADD CONSTRAINT "PK_cf4b2cacc7eea2d6b79f53d9463" PRIMARY KEY ("work_front_name", "sprint_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "work_front"
            ADD "id" SERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "work_front"
            ADD CONSTRAINT "PK_73ab98bdb761647b4c3b91702bd" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts"
                RENAME CONSTRAINT "PK_4213ebdabb59a0dceac43bb9c61" TO "PK_8d2e71847b97cda8dce26899779"
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts"
                RENAME COLUMN "work_front_name" TO "work_front_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
                RENAME CONSTRAINT "PK_cf4b2cacc7eea2d6b79f53d9463" TO "PK_6d99ec2a1ed1d2cf016c99267dc"
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
                RENAME COLUMN "work_front_name" TO "work_front_id"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_839be9f4382204201640b7069f" ON "buildings_rel_work_fronts" ("work_front_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "buildings_rel_work_fronts"
            ADD CONSTRAINT "FK_839be9f4382204201640b7069fe" FOREIGN KEY ("work_front_id") REFERENCES "work_front"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "progress"
            ADD CONSTRAINT "FK_bb5cf793ee95c3847ddde09b491" FOREIGN KEY ("work_front_id") REFERENCES "work_front"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
