import { Module } from '@nestjs/common';
import { RepartoService } from './reparto.service';
import { RepartoController } from './reparto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reparto } from './entities/reparto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reparto])],
  controllers: [RepartoController],
  providers: [RepartoService],
})
export class RepartoModule {}
