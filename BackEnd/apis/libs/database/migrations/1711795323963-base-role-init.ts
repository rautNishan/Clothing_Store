import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseRoleInit1711795323963 implements MigrationInterface {
  name = 'BaseRoleInit1711795323963';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "admin" ADD "role" text DEFAULT 'CUSTOMER'`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "role" text DEFAULT 'CUSTOMER'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "role"`);
    await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "role"`);
  }
}
