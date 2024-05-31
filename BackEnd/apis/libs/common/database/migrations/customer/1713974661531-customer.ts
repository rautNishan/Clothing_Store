import { MigrationInterface, QueryRunner } from 'typeorm';

export class Customer1713974661531 implements MigrationInterface {
  name = 'Customer1713974661531';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customer" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "user_name" text NOT NULL, "password" text NOT NULL, "role" text, "customer_full_name" jsonb NOT NULL, "email" text NOT NULL, "contact" text NOT NULL, CONSTRAINT "UQ_c97ac44072dffaa25de616f7902" UNIQUE ("user_name"), CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email"), CONSTRAINT "UQ_62571b8f80308e3a98a255c9950" UNIQUE ("contact"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "customer"`);
  }
}
