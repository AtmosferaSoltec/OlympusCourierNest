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
import { MetodoPagoModule } from './modules/admin/metodo-pago/metodo-pago.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),

    JwtModule.register({
      global: true,
      secret: 'MiLlaveSecretaDeRepartos11*',
      signOptions: { expiresIn: '4h' },
    }),
    
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
    MetodoPagoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
