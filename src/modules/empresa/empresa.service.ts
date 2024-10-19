import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { Repository } from 'typeorm';
import { Empresa } from './entities/empresa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from '../admin/usuario/usuario.service';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private readonly repo: Repository<Empresa>,

    private readonly usuarioService: UsuarioService
  ) {}

  create(createEmpresaDto: CreateEmpresaDto) {
    return 'This action adds a new empresa';
  }

  async findAll() {
    return await this.repo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} empresa`;
  }

  async findOneByUserId(id: number) {
    const user = await this.usuarioService.findOne(id);
    if (!user.empresa) {
      throw new NotFoundException('Usuario no tiene empresa');
    }
    return user.empresa;
  }

  update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    return `This action updates a #${id} empresa`;
  }

  remove(id: number) {
    return `This action removes a #${id} empresa`;
  }
}
