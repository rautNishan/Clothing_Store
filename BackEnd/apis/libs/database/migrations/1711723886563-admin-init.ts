import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdminInit1711723886563 implements MigrationInterface {
  name = 'AdminInit1711723886563';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "admin" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "user_name" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_e2ca4b65f127467fe2dd1f4d7ce" UNIQUE ("user_name"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "admin"`);
  }
}
