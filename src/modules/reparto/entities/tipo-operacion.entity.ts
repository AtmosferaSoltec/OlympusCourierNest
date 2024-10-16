import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { HistorialReparto } from "./historial-reparto.entity";

@Entity('tipo_operacion')
export class TipoOperacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 20
    })
    nombre: string;

    @OneToMany(
        () => HistorialReparto,
        (historialReparto) => historialReparto.tipoOperacion
    )
    historialRepartos: HistorialReparto[]
}