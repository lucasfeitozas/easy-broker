import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateLancamentos1691495300000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_lancamentos',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'quantidade',
            type: 'int',
          },
          {
            name: 'valor',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'dataLancamento',
            type: 'date',
          },
          {
            name: 'operacao',
            type: 'enum',
            enum: ['compra', 'venda'],
          },
          {
            name: 'observacoes',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'corretora_id',
            type: 'int',
          },
          {
            name: 'acoes_id',
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
      'tb_lancamentos',
      new TableIndex({
        name: 'idx_lancamentos_corretora_id',
        columnNames: ['corretora_id'],
      }),
    );

    await queryRunner.createIndex(
      'tb_lancamentos',
      new TableIndex({
        name: 'idx_lancamentos_acoes_id',
        columnNames: ['acoes_id'],
      }),
    );

    await queryRunner.createIndex(
      'tb_lancamentos',
      new TableIndex({
        name: 'idx_lancamentos_data',
        columnNames: ['dataLancamento'],
      }),
    );

    await queryRunner.createIndex(
      'tb_lancamentos',
      new TableIndex({
        name: 'idx_lancamentos_operacao',
        columnNames: ['operacao'],
      }),
    );

    // Criar foreign keys
    await queryRunner.createForeignKey(
      'tb_lancamentos',
      new TableForeignKey({
        columnNames: ['corretora_id'],
        referencedTableName: 'tb_corretora',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'tb_lancamentos',
      new TableForeignKey({
        columnNames: ['acoes_id'],
        referencedTableName: 'tb_acoes',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_lancamentos');
  }
}
