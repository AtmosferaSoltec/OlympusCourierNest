import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistritoModule } from './modules/distrito/distrito.module';
import { Distrito } from './modules/distrito/entities/distrito.entity';
import { TipoEstadoModule } from './modules/tipo-estado/tipo-estado.module';
import { TipoEstado } from './modules/tipo-estado/entities/tipo-estado.entity';
import { EmpresaModule } from './modules/empresa/empresa.module';
import { Empresa } from './modules/empresa/entities/empresa.entity';
import { RepartoModule } from './modules/reparto/reparto.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { UsuarioModule } from './modules/admin/usuario/usuario.module';
import { ComprobanteModule } from './modules/comprobante/comprobante.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),
    DistritoModule,
    TipoEstadoModule,
    EmpresaModule,
    RepartoModule,
    ClienteModule,
    UsuarioModule,
    ComprobanteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
