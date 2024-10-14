import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Like, Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DistritoService } from '../distrito/distrito.service';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly repo: Repository<Cliente>,
  ) {}

  create(createClienteDto: CreateClienteDto) {
    return 'This action adds a new cliente';
  }

  async findAll(
    activo: string,
    tipo_doc: string,
    documento: string,
    nombres: string,
    page: number,
    limit: number,
  ) {
    if (tipo_doc === '0') {
      tipo_doc = '';
    }

    if (!documento) {
      documento = '';
    }

    if (!nombres) {
      nombres = '';
    }

    const [list, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['distrito'],
      where: {
        activo,
        documento: Like(`%${documento}%`),
        cod_tipodoc: Like(`%${tipo_doc}%`),
        nombres: Like(`%${nombres}%`),
      },
    });

    const mappedList = list.map((c) => ({
      ...c,
      id_distrito: c.distrito.id,
      distrito: c.distrito.nombre,
    }));

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: mappedList,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} cliente`;
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return `This action updates a #${id} cliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
