import { Injectable } from "@nestjs/common";
import { CreateTipoUsuarioDto } from "./dto/create-tipo-usuario.dto";
import { UpdateTipoUsuarioDto } from "./dto/update-tipo-usuario.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TipoUsuario } from "./entities/tipo-usuario.entity";
import { Repository } from "typeorm";

@Injectable()
export class TipoUsuarioService {
  constructor(
    @InjectRepository(TipoUsuario)
    private readonly repo: Repository<TipoUsuario>
  ) {}

  create(createTipoUsuarioDto: CreateTipoUsuarioDto) {
    return "This action adds a new tipoUsuario";
  }

  async findAll() {
    const list = await this.repo.find();
    return list;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoUsuario`;
  }

  update(id: number, updateTipoUsuarioDto: UpdateTipoUsuarioDto) {
    return `This action updates a #${id} tipoUsuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoUsuario`;
  }
}
