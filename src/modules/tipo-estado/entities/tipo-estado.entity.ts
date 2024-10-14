import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'tipo_estado'
})
export class TipoEstado {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar'
    })
    descripcion: string;
}
