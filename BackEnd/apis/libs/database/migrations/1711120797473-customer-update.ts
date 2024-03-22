import { MigrationInterface, QueryRunner } from 'typeorm';

export class CustomerUpdate1711120797473 implements MigrationInterface {
  name = 'CustomerUpdate1711120797473';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "first_name"`);
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "last_name"`);
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "customer_full_name" jsonb NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "contact" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD CONSTRAINT "UQ_62571b8f80308e3a98a255c9950" UNIQUE ("contact")`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "role" text DEFAULT 'CUSTOMER'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "role"`);
    await queryRunner.query(
      `ALTER TABLE "customer" DROP CONSTRAINT "UQ_62571b8f80308e3a98a255c9950"`,
    );
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "contact"`);
    await queryRunner.query(
      `ALTER TABLE "customer" DROP COLUMN "customer_full_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "last_name" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "first_name" text NOT NULL`,
    );
  }
}
