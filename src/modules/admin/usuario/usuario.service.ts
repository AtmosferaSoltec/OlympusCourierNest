import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repo: Repository<Usuario>
  ) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    return "This action adds a new usuario";
  }

  async findAll(idRuc: number, tipoUsuario: string) {
    const qb = this.repo.createQueryBuilder("usuario");

    qb.leftJoinAndSelect("usuario.empresa", "empresa");

    if (tipoUsuario) {
      qb.andWhere("usuario.cod_rol = :tipoUsuario", { tipoUsuario });
    }

    qb.andWhere("empresa.id = :idRuc", { idRuc });

    const list = await qb.getMany();

    return list;
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({
      where: { id },
      relations: ["empresa"],
    });
    if (!user) {
      throw new NotFoundException(`Usuario #${id} not found`);
    }
    return user;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
