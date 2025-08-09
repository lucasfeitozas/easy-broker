import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Acoes from './Acoes';
import Corretoras from './Corretoras';

export enum TipoOperacao {
  COMPRA = 'COMPRA',
  VENDA = 'VENDA',
}

@Entity('tb_lancamentos')
class Lancamentos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantidade: number;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @Column({
    name: 'data_lancamento',
    type: 'date',
  })
  dataLancamento: Date;

  @Column({
    type: 'varchar',
    length: 10,
  })
  operacao: 'COMPRA' | 'VENDA';

  @Column({ nullable: true })
  observacoes?: string;

  @Column()
  corretora_id: number;

  @Column()
  acoes_id: number;

  @ManyToOne(() => Acoes, { eager: true })
  @JoinColumn({ name: 'acoes_id' })
  acao: Acoes;

  @ManyToOne(() => Corretoras, { eager: true })
  @JoinColumn({ name: 'corretora_id' })
  corretora: Corretoras;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Lancamentos;
