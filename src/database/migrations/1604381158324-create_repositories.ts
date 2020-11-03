/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createRepositories1604381158324
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'repositories',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'title',
            type: 'varchar(50)',
          },
          {
            name: 'url',
            type: 'varchar',
          },
          {
            name: 'techs',
            type: 'varchar[](20)',
          },
          {
            name: 'likes',
            type: 'integer',
            unsigned: true,
            default: 0,
          },
          /* {
            name: 'created_at',
            type: ' timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: ' timestamp with time zone',
            default: 'now()',
          }, */
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('repositories');
  }
}
