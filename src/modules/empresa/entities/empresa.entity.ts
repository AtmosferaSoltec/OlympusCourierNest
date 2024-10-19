import { MetodoPago } from 'src/modules/admin/metodo-pago/entities/metodo-pago.entity';
import { Usuario } from 'src/modules/admin/usuario/entities/usuario.entity';
import { Distrito } from 'src/modules/distrito/entities/distrito.entity';
import { Reparto } from 'src/modules/reparto/entities/reparto.entity';
import { Vehiculo } from 'src/modules/reparto/entities/vehiculo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'empresa',
})
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'ruc',
    type: 'char',
    length: 11,
    nullable: false,
  })
  ruc: string;

  @Column({
    name: 'razon_social',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  razon_social: string;

  @Column({
    name: 'num_reparto',
    type: 'int',
    nullable: true,
  })
  num_reparto: number;

  @Column({
    name: 'serie_f',
    type: 'char',
    length: 4,
    nullable: true,
  })
  serie_f: string;

  @Column({
    name: 'num_f',
    type: 'int',
    nullable: true,
  })
  num_f: number;

  @Column({
    name: 'serie_b',
    type: 'char',
    length: 4,
    nullable: true,
  })
  serie_b: string;

  @Column({
    name: 'num_b',
    type: 'int',
    nullable: true,
  })
  num_b: number;

  @Column({
    name: 'ruta',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  ruta: string;

  @Column({
    name: 'token',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  token: string;

  @OneToMany(
    () => Reparto,
    (r) => r.empresa
  )
  repartos: Reparto[];

  @OneToMany(() => Distrito, (d) => d.empresa)
  distritos: Distrito[];

  @OneToMany(
    () => Usuario,
    (u) => u.empresa
  )
  usuarios: Usuario[];

  @OneToMany(
    () => Vehiculo,
    (v) => v.empresa
  )
  vehiculos: Vehiculo[];

  @OneToMany(
    () => MetodoPago,
    (mp) => mp.empresa
  )
  metodoPago: MetodoPago[];
}
