import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCorretoras1691495100000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_corretora',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
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
            isUnique: true,
          },
          {
            name: 'image_url',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    // Inserir dados iniciais
    await queryRunner.query(`
      INSERT INTO tb_corretora (nome, cnpj) VALUES
      ('XP Investimentos', '02.332.886/0001-04'),
      ('Rico Investimentos', '07.792.506/0001-15'),
      ('Clear Corretora', '02.332.886/0001-04'),
      ('Inter DTVM', '17.000.000/0001-40'),
      ('BTG Pactual', '58.487.227/0001-29')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_corretora');
  }
}
