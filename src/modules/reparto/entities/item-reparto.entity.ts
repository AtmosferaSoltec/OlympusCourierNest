import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reparto } from "./reparto.entity";

@Entity({
  name: "item_reparto",
})
export class ItemReparto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 15,
        nullable: true
    })
    num_guia: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true
    })
    detalle: string;

    @Column({
        type: 'decimal',
        nullable: true,
        precision: 10,
        scale: 2
    })
    precio: number;

    @Column({
        type: 'decimal',
        nullable: true,
        precision: 10,
        scale: 2
    })
    adicional: number;

    @Column({
        type: 'varchar',
        nullable: true,
        length: 15
    })
    clave: string;

    @ManyToOne(
        () => Reparto,
        (r) => r.items
    )
    @JoinColumn({
        name: 'id_reparto'
    })
    reparto: Reparto

}
