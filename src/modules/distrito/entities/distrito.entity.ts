import { Cliente } from 'src/modules/cliente/entities/cliente.entity';
import { Empresa } from 'src/modules/empresa/entities/empresa.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'distrito',
})
export class Distrito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  nombre: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  fecha_creacion: Date;

  @Column({
    type: 'char',
    length: 1,
    default: 'S',
    nullable: true,
  })
  activo: string;

  @ManyToOne(() => Empresa, (e) => e.distritos)
  @JoinColumn({ name: 'id_ruc' })
  empresa: Empresa;

  @OneToMany(
    () => Cliente,
    (c) => c.distrito
  )
  clientes: Cliente[];
}
