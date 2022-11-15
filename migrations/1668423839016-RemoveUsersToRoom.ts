import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUsersToRoom1668423839016 implements MigrationInterface {
    name = 'RemoveUsersToRoom1668423839016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "users_ids"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" ADD "users_ids" integer array NOT NULL`);
    }

}
