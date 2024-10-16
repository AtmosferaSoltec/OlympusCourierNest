import { Cliente } from "src/modules/cliente/entities/cliente.entity";
import { Empresa } from "src/modules/empresa/entities/empresa.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ItemReparto } from "./item-reparto.entity";
import { Usuario } from "src/modules/admin/usuario/entities/usuario.entity";
import { Vehiculo } from "./vehiculo.entity";
import { Comprobante } from "src/modules/comprobante/entities/comprobante.entity";

@Entity({
  name: "reparto",
})
export class Reparto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "num_reparto",
    type: "int",
  })
  num_reparto: number;

  @Column({
    name: "estado",
    type: "char",
    length: 1,
    default: "P",
  })
  estado: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  fecha_creacion: Date;

  @Column({
    type: "timestamp",
  })
  fecha_entrega: Date;

  @Column({
    type: "varchar",
    length: 500,
  })
  url_foto: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  total: number;

  @Column({
    type: "char",
    length: 1,
    default: "S",
  })
  activo: string;

  @OneToMany(() => ItemReparto, (i) => i.reparto)
  items: ItemReparto[];

  @ManyToOne(() => Vehiculo, (v) => v.repartos)
  @JoinColumn({ name: "id_vehiculo" })
  vehiculo: Vehiculo;

  @ManyToOne(() => Cliente, (c) => c.repartos)
  @JoinColumn({ name: "id_cliente" })
  cliente: Cliente;

  @ManyToOne(() => Usuario, (u) => u.repartos)
  @JoinColumn({ name: "id_usuario" })
  usuario: Usuario;

  @ManyToOne(() => Empresa, (e) => e.repartos)
  @JoinColumn({ name: "id_ruc" })
  empresa: Empresa;

  @ManyToOne(() => Comprobante, (c) => c.repartos)
  @JoinColumn({ name: "id_comprobante" })
  comprobante: Comprobante;
}
