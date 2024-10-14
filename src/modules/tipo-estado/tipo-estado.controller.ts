import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoEstadoService } from './tipo-estado.service';
import { CreateTipoEstadoDto } from './dto/create-tipo-estado.dto';
import { UpdateTipoEstadoDto } from './dto/update-tipo-estado.dto';

@Controller('tipo-estado')
export class TipoEstadoController {
  constructor(private readonly tipoEstadoService: TipoEstadoService) {}

  @Post()
  create(@Body() createTipoEstadoDto: CreateTipoEstadoDto) {
    return this.tipoEstadoService.create(createTipoEstadoDto);
  }

  @Get()
  findAll() {
    return this.tipoEstadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoEstadoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoEstadoDto: UpdateTipoEstadoDto) {
    return this.tipoEstadoService.update(+id, updateTipoEstadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoEstadoService.remove(+id);
  }
}
