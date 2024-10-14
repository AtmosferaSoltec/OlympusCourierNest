import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDistritoDto } from './dto/create-distrito.dto';
import { UpdateDistritoDto } from './dto/update-distrito.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Distrito } from './entities/distrito.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DistritoService {
  constructor(
    @InjectRepository(Distrito)
    private readonly repo: Repository<Distrito>,
  ) {}
  create(createDistritoDto: CreateDistritoDto) {
    return 'This action adds a new distrito';
  }

  async findAll() {
    try {
      const list = await this.repo.find({ relations: ['empresa'] });
      return list.map((d) => {
        return {
          id: d.id,
          id_ruc: d.empresa.id,
          nombre: d.nombre,
          fecha_creacion: d.fecha_creacion,
          activo: d.activo,
        };
      });
    } catch (error) {
      console.log(error?.message);
      throw new InternalServerErrorException('Error en el servidor');
    }
  }

  async findOne(id: number) {
    const distrito = await this.repo.findOne({ where: { id } });
    if (!distrito) {
      throw new NotFoundException('Distrito no encontrado');
    }
    return distrito;
  }

  update(id: number, updateDistritoDto: UpdateDistritoDto) {
    return `This action updates a #${id} distrito`;
  }

  remove(id: number) {
    return `This action removes a #${id} distrito`;
  }
}
