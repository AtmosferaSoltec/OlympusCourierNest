import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTipoEstadoDto } from './dto/create-tipo-estado.dto';
import { UpdateTipoEstadoDto } from './dto/update-tipo-estado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoEstado } from './entities/tipo-estado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TipoEstadoService {
  constructor(
    @InjectRepository(TipoEstado)
    private readonly repo: Repository<TipoEstado>,
  ) {}

  create(createTipoEstadoDto: CreateTipoEstadoDto) {
    return 'This action adds a new tipoEstado';
  }

  async findAll() {
    try {
      return await this.repo.find();
    } catch (error) {
      console.log(error?.message);
      
      throw new InternalServerErrorException('Error en el servidor');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoEstado`;
  }

  update(id: number, updateTipoEstadoDto: UpdateTipoEstadoDto) {
    return `This action updates a #${id} tipoEstado`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoEstado`;
  }
}
