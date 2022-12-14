import { MigrationInterface, QueryRunner } from 'typeorm';

export class usersTable1663780226929 implements MigrationInterface {
  name = 'usersTable1663780226929';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."users_role_enum" AS ENUM('User', 'Admin')
        `);
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "firstname" character varying NOT NULL,
                "lastname" character varying NOT NULL,
                "email" character varying NOT NULL,
                "username" character varying NOT NULL,
                "password" character varying NOT NULL,
                "role" "public"."users_role_enum" NOT NULL DEFAULT 'User',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "users"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."users_role_enum"
        `);
  }

}