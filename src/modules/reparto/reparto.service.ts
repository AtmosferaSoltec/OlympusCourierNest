import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRepartoDto } from './dto/create-reparto.dto';
import { UpdateRepartoDto } from './dto/update-reparto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reparto } from './entities/reparto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RepartoService {
  constructor(
    @InjectRepository(Reparto)
    private readonly repo: Repository<Reparto>,
  ) {}

  create(createRepartoDto: CreateRepartoDto) {
    return 'This action adds a new reparto';
  }

  async findAll() {
    try {
      const list = await this.repo.find({ relations: ['empresa'] });
      return list.map((r) => {
        const id_ruc = r.empresa.id;
        delete r.empresa;
        return {
          ...r,
          cobro_adicional: Number(r.cobro_adicional),
          id_ruc,
        };
      });
    } catch (error) {
      console.log(error?.message);
      throw new InternalServerErrorException('Error en el servidor');
    }
  }

  async findOne(id: number) {
    try {
      const reparto = await this.repo.findOne({ where: { id }, relations: ['empresa'] });
      if (!reparto) {
        throw new NotFoundException(`Reparto con id ${id} no encontrado`);
      }
      const id_ruc = reparto.empresa.id;
      delete reparto.empresa;
      return {
        ...reparto,
        id_ruc,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error en el servidor');
    }
  }

  update(id: number, updateRepartoDto: UpdateRepartoDto) {
    return `This action updates a #${id} reparto`;
  }

  remove(id: number) {
    return `This action removes a #${id} reparto`;
  }
}
