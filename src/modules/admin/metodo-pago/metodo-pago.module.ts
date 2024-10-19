import { Module } from "@nestjs/common";
import { MetodoPagoService } from "./metodo-pago.service";
import { MetodoPagoController } from "./metodo-pago.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MetodoPago } from "./entities/metodo-pago.entity";
import { EmpresaModule } from "src/modules/empresa/empresa.module";

@Module({
  imports: [TypeOrmModule.forFeature([MetodoPago]), EmpresaModule],
  controllers: [MetodoPagoController],
  providers: [MetodoPagoService],
})
export class MetodoPagoModule {}
