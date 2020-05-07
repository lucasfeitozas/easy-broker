import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_corretora')
class Corretoras {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cnpj: string;

  @Column({
    name: 'image_url',
  })
  imageUrl?: string;
}

export default Corretoras;
