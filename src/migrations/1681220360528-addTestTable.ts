import { MigrationInterface, QueryRunner } from "typeorm";

export class addTestTable1681220360528 implements MigrationInterface {
    name = 'addTestTable1681220360528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "cityUserId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f928755e8e8c1c188b799a49a5e" FOREIGN KEY ("cityUserId") REFERENCES "city"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f928755e8e8c1c188b799a49a5e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "cityUserId"`);
    }

}
