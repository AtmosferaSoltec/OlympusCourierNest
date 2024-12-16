import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({name: 'tipo_usuario'})
export class TipoUsuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    descrip: string;

    @Column({
        type: 'char',
        length: 1,
        nullable: false,
        unique: true
    })
    codigo: string;
}
