import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Acoes from './Acoes';
import Corretoras from './Corretoras';

@Entity('tb_lancamentos')
class Lancamentos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantidade: number;

  @Column()
  valor: number;

  @Column({
    name: 'data_lancamento',
    type: 'date',
  })
  dataLancamento: Date;

  @Column()
  operacao: string;

  @Column()
  corretora_id: number;

  @Column()
  acoes_id: number;

  @ManyToOne(() => Acoes)
  @JoinColumn({ name: 'acoes_id' })
  acao: Acoes;

  @ManyToOne(() => Corretoras)
  @JoinColumn({ name: 'corretora_id' })
  corretora: Corretoras;
}

export default Lancamentos;
