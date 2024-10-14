import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoEstadoDto } from './create-tipo-estado.dto';

export class UpdateTipoEstadoDto extends PartialType(CreateTipoEstadoDto) {}
