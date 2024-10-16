import { Module } from "@nestjs/common";
import { RepartoService } from "./reparto.service";
import { RepartoController } from "./reparto.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reparto } from "./entities/reparto.entity";
import { ItemReparto } from "./entities/item-reparto.entity";
import { Vehiculo } from "./entities/vehiculo.entity";
import { TipoOperacion } from "./entities/tipo-operacion.entity";
import { HistorialReparto } from "./entities/historial-reparto.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reparto,
      ItemReparto,
      Vehiculo,
      TipoOperacion,
      HistorialReparto,
    ]),
  ],
  controllers: [RepartoController],
  providers: [RepartoService],
})
export class RepartoModule {}
