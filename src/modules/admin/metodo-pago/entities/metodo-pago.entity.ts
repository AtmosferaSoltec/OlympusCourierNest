import { Empresa } from "src/modules/empresa/entities/empresa.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('metodo_pago')
export class MetodoPago {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 50
    })
    nombre: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    fecha_creacion: Date;

    @Column({
        type: 'char',
        length: 1,
    })
    activo: string

    @ManyToOne(
        () => Empresa,
        empresa => empresa.metodoPago
    )
    @JoinColumn({name: 'id_ruc'})
    empresa: Empresa
}
