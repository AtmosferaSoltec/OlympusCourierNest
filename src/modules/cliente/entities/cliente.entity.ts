import { Distrito } from 'src/modules/distrito/entities/distrito.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cliente' })
export class Cliente {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'char',
        length: 1
    })
    cod_tipodoc: string;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
        unique: true
    })
    documento: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    nombres: string;

    @Column({
        type: 'varchar',
        length: 15,
        nullable: false
    })
    telefono: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    correo: string;

    @Column({
        type: 'char',
        length: 1
    })
    genero: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    direc: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    referencia: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    url_maps: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    fecha_creacion: Date;

    @Column({
        type: 'char',
        length: 1,
        default: 'S'
    })
    activo: string;

    @ManyToOne(
        () => Distrito,
        distrito => distrito.clientes
    )
    @JoinColumn({ name: 'id_distrito' })
    distrito: Distrito;
}
