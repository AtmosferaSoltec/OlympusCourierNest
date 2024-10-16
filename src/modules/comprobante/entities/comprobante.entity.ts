import { Reparto } from "src/modules/reparto/entities/reparto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("comprobante")
export class Comprobante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "int",
  })
  id_ruc: number;

  @Column({
    type: "int",
  })
  tipo_comprobante: number;

  @Column({
    type: "varchar",
    length: 5,
  })
  serie: string;

  @Column({
    type: "int",
  })
  num_serie: number;

  @Column({
    type: "int",
  })
  id_metodo_pago: number;

  @Column({
    type: "varchar",
    length: 255,
  })
  num_operacion: string;

  @Column({
    type: "char",
    length: 1,
  })
  tipo_doc: string;

  @Column({
    type: "varchar",
    length: 15,
  })
  documento: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  nombre: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  direc: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  correo: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  telefono: string;

  @Column({
    type: "int",
  })
  id_usuario: number;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  fecha_creacion: Date;

  @Column({
    type: "char",
    length: 1,
  })
  activo: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  enlace: string;

  @Column({
    type: "tinyint",
  })
  estado_sunat: number;

  @Column({
    type: "varchar",
    length: 100,
  })
  sunat_descrip: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  enlace_pdf: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  enlace_xml: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  importe_total: number;

  @OneToMany(
    () => Reparto,
    (r) => r.comprobante,
  )
    repartos: Reparto[];
}
