import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import TipoAcoes from './TipoAcoes';

@Entity('tb_acoes')
class Acoes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cnpj: string;

  @Column()
  descricao: string;

  @Column()
  tipo_acao_id: number;

  @ManyToOne(() => TipoAcoes)
  @JoinColumn({ name: 'tipo_acao_id' })
  tipoAcao: TipoAcoes;
}
export default Acoes;
