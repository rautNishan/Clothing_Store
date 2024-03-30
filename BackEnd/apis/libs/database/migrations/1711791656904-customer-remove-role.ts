import { MigrationInterface, QueryRunner } from 'typeorm';

export class CustomerRemoveRole1711791656904 implements MigrationInterface {
  name = 'CustomerRemoveRole1711791656904';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "role"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "role" text DEFAULT 'CUSTOMER'`,
    );
  }
}
