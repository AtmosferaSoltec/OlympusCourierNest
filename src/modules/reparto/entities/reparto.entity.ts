import { Empresa } from 'src/modules/empresa/entities/empresa.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'reparto',
})
export class Reparto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'num_reparto',
    type: 'int',
  })
  num_reparto: number;

  @Column({
    name: 'anotacion',
    type: 'varchar',
    length: 255,
  })
  anotacion: string;

  @Column({
    name: 'clave',
    type: 'varchar',
    length: 255,
  })
  clave: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  cobro_adicional: number;

  @Column({
    name: 'estado',
    type: 'char',
    length: 1,
    default: 'P',
  })
  estado: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha_creacion: Date;

  @Column({
    type: 'timestamp',
  })
  fecha_entrega: Date;

  @Column({
    type: 'varchar',
    length: 500
  })
  url_foto: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  total: number;

  @Column({
    type: 'char',
    length: 1,
    default: 'S',
  })
  activo: string;

  @ManyToOne(() => Empresa, (e) => e.repartos)
  @JoinColumn({ name: 'id_ruc' })
  empresa: Empresa;
}
