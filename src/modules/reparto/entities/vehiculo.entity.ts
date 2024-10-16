import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reparto } from "./reparto.entity";
import { Empresa } from "src/modules/empresa/entities/empresa.entity";

@Entity({
  name: "vehiculo",
})
export class Vehiculo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 50,
    })
    nombre: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    fecha_creacion: Date;

    @Column({
        type: 'char',
        length: 1,
        default: 'S',
    })
    activo: string;

    @OneToMany(
        () => Reparto,
        (r) => r.vehiculo
    )
    repartos: Reparto[]

    @ManyToOne(
        () => Empresa,
        (e) => e.vehiculos
    )
    @JoinColumn({
        name: 'id_ruc'
    })
    empresa: Empresa
}

