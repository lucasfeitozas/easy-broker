import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_acoes_tipo')
class TipoAcoes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;
}
export default TipoAcoes;
