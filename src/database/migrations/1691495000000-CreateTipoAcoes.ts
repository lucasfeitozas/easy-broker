import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTipoAcoes1691495000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_acoes_tipo',
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
            name: 'descricao',
            type: 'text',
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
      INSERT INTO tb_acoes_tipo (nome, descricao) VALUES
      ('Ordinária', 'Ações ordinárias (ON) que conferem direito a voto'),
      ('Preferencial', 'Ações preferenciais (PN) que têm preferência na distribuição de dividendos'),
      ('Units', 'Certificados de depósito de valores mobiliários que reúnem diferentes tipos de ações')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_acoes_tipo');
  }
}
