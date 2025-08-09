import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateAcoes1691495200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_acoes',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'ticker',
            type: 'varchar',
            length: '10',
            isUnique: true,
          },
          {
            name: 'nome',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'cnpj',
            type: 'varchar',
            length: '18',
            isNullable: true,
          },
          {
            name: 'tipo_acao_id',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Criar índices
    await queryRunner.createIndex(
      'tb_acoes',
      new TableIndex({
        name: 'idx_acoes_ticker',
        columnNames: ['ticker'],
      }),
    );

    await queryRunner.createIndex(
      'tb_acoes',
      new TableIndex({
        name: 'idx_acoes_tipo_acao_id',
        columnNames: ['tipo_acao_id'],
      }),
    );

    // Criar foreign key
    await queryRunner.createForeignKey(
      'tb_acoes',
      new TableForeignKey({
        columnNames: ['tipo_acao_id'],
        referencedTableName: 'tb_tipo_acoes',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_acoes');
  }
}
