import { Module } from '@nestjs/common';
import { TipoEstadoService } from './tipo-estado.service';
import { TipoEstadoController } from './tipo-estado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoEstado } from './entities/tipo-estado.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TipoEstado]),
  ],
  controllers: [TipoEstadoController],
  providers: [TipoEstadoService],
})
export class TipoEstadoModule {}
