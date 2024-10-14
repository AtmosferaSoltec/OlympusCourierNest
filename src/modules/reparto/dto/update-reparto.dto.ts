import { PartialType } from '@nestjs/mapped-types';
import { CreateRepartoDto } from './create-reparto.dto';

export class UpdateRepartoDto extends PartialType(CreateRepartoDto) {}
