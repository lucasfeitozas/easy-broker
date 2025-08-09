import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column({ unique: true })
  ticker: string;

  @Column()
  tipo_acao_id: number;

  @ManyToOne(() => TipoAcoes)
  @JoinColumn({ name: 'tipo_acao_id' })
  tipoAcao: TipoAcoes;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Acoes;
