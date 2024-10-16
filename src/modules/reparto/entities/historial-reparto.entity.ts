import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TipoOperacion } from "./tipo-operacion.entity";
import { Reparto } from "./reparto.entity";
import { Usuario } from "src/modules/admin/usuario/entities/usuario.entity";

@Entity("historial_reparto")
export class HistorialReparto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  fecha: Date;

  @ManyToOne(() => Reparto, (r) => r.historialRepartos)
  @JoinColumn({ name: "id_reparto" })
  reparto: Reparto;

  @ManyToOne(() => Usuario, (u) => u.historialRepartos)
  @JoinColumn({ name: "id_usuario" })
  usuario: Usuario;

  @ManyToOne(() => TipoOperacion, (to) => to.historialRepartos)
  @JoinColumn({ name: "id_tipo_operacion" })
  tipoOperacion: TipoOperacion;
}
