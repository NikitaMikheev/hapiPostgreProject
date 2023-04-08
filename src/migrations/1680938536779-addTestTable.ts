import { MigrationInterface, QueryRunner } from "typeorm";

export class addTestTable1680938536779 implements MigrationInterface {
    name = 'addTestTable1680938536779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "test" ("id" SERIAL NOT NULL, CONSTRAINT "PK_5417af0062cf987495b611b59c7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "test"`);
    }

}
