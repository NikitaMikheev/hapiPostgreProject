import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class addTestTable1682280725733 implements MigrationInterface {
  name = 'addTestTable1682280725733';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_tree" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "parentID" integer array NULL, "childID" integer array NULL, "partnerID" integer array NULL, CONSTRAINT "PK_8c5e44a14850523322208120561" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_tree"`);
  }
}
