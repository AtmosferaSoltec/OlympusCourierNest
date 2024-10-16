import { Empresa } from "src/modules/empresa/entities/empresa.entity";
import { HistorialReparto } from "src/modules/reparto/entities/historial-reparto.entity";
import { Reparto } from "src/modules/reparto/entities/reparto.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("usuario")
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 20,
    nullable: false,
    unique: true,
  })
  documento: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  nombres: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
    default: null,
  })
  apellidos: string;

  @Column({
    type: "varchar",
    length: 15,
    unique: true,
  })
  telefono: string;

  @Column({
    type: "varchar",
    length: 255,
    unique: true,
  })
  correo: string;

  @Column({
    type: "date",
    nullable: true,
    default: true,
  })
  fecha_nac: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  fecha_creacion: Date;

  @Column({
    type: "varchar",
    length: 255,
  })
  clave: string;

  @Column({
    type: "char",
    length: 1,
    default: null,
  })
  cod_rol: string;

  @Column({
    type: "char",
    length: 1,
    default: "S",
  })
  activo: string;

  @ManyToOne(() => Empresa, (e) => e.usuarios)
  @JoinColumn({ name: "id_ruc" })
  empresa: Empresa;

  @OneToMany(
    () => Reparto,
    (r) => r.usuario
  )
    repartos: Reparto[];

    @OneToMany(
        () => HistorialReparto,
        (historialReparto) => historialReparto.usuario
    )
    historialRepartos: HistorialReparto[]
}
