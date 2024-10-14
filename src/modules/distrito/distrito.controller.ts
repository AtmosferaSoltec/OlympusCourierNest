import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DistritoService } from './distrito.service';
import { CreateDistritoDto } from './dto/create-distrito.dto';
import { UpdateDistritoDto } from './dto/update-distrito.dto';

@Controller('distrito')
export class DistritoController {
  constructor(private readonly distritoService: DistritoService) {}

  @Post()
  create(@Body() createDistritoDto: CreateDistritoDto) {
    return this.distritoService.create(createDistritoDto);
  }

  @Get()
  findAll() {
    return this.distritoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.distritoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDistritoDto: UpdateDistritoDto) {
    return this.distritoService.update(+id, updateDistritoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.distritoService.remove(+id);
  }
}
