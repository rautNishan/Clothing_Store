import { MigrationInterface, QueryRunner } from 'typeorm';

export class CustomerAdminInit1711858004347 implements MigrationInterface {
  name = 'CustomerAdminInit1711858004347';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customer" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "user_name" text NOT NULL, "password" text NOT NULL, "role" text, "customer_full_name" jsonb NOT NULL, "email" text NOT NULL, "contact" text NOT NULL, CONSTRAINT "UQ_c97ac44072dffaa25de616f7902" UNIQUE ("user_name"), CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email"), CONSTRAINT "UQ_62571b8f80308e3a98a255c9950" UNIQUE ("contact"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "admin" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "user_name" text NOT NULL, "password" text NOT NULL, "role" text, CONSTRAINT "UQ_e2ca4b65f127467fe2dd1f4d7ce" UNIQUE ("user_name"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "admin"`);
    await queryRunner.query(`DROP TABLE "customer"`);
  }
}
