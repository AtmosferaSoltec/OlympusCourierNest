import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RepartoService } from './reparto.service';
import { CreateRepartoDto } from './dto/create-reparto.dto';
import { UpdateRepartoDto } from './dto/update-reparto.dto';

@Controller('reparto')
export class RepartoController {
  constructor(private readonly repartoService: RepartoService) {}

  @Post()
  create(@Body() createRepartoDto: CreateRepartoDto) {
    return this.repartoService.create(createRepartoDto);
  }

  @Get()
  findAll() {
    return this.repartoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repartoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRepartoDto: UpdateRepartoDto) {
    return this.repartoService.update(+id, updateRepartoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repartoService.remove(+id);
  }
}
