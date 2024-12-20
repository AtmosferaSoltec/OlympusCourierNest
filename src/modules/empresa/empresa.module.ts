import { Module } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { UsuarioModule } from '../admin/usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa]), UsuarioModule],
  exports: [EmpresaService],
  controllers: [EmpresaController],
  providers: [EmpresaService],
})
export class EmpresaModule {}
