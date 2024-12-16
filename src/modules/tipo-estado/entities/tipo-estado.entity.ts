import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "tipo_estado",
})
export class TipoEstado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
  })
  descripcion: string;

  @Column({
    type: "char",
    length: 1,
    unique: true,
    nullable: false
  })
  codigo: string;
}
