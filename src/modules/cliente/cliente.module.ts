import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { DistritoModule } from '../distrito/distrito.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]),
    DistritoModule
  ],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
