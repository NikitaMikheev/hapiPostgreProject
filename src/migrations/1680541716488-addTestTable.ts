import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class addTestTable1680541716488 implements MigrationInterface {
  name = 'addTestTable1680541716488';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "accessToken"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "accessToken" character varying`);
  }
}
