import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateClienteDto } from "./dto/create-cliente.dto";
import { UpdateClienteDto } from "./dto/update-cliente.dto";
import { Like, Not, Repository } from "typeorm";
import { Cliente } from "./entities/cliente.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DistritoService } from "../distrito/distrito.service";

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly repo: Repository<Cliente>,
    private readonly distritoService: DistritoService
  ) {}

  async create(dto: CreateClienteDto) {
    const findDoc = await this.repo.findOne({
      where: { documento: dto.documento },
    });
    if (findDoc) {
      return { message: "El documento ya existe" };
    }

    const findDistrito = await this.distritoService.findOne(dto.id_distrito);
    if (!findDistrito) {
      return { message: "El distrito no existe" };
    }

    const newCliente = this.repo.create({
      ...dto,
      distrito: findDistrito,
    });

    await this.repo.save(newCliente);
    return this.findOneMap(newCliente.id);
  }

  async findAll(
    activo: string,
    tipo_doc: string,
    documento: string,
    nombres: string,
    page: number,
    limit: number
  ) {
    if (tipo_doc === "0") {
      tipo_doc = "";
    }

    if (!documento) {
      documento = "";
    }

    if (!nombres) {
      nombres = "";
    }

    const [list, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ["distrito"],
      where: {
        activo,
        documento: Like(`%${documento}%`),
        cod_tipodoc: Like(`%${tipo_doc}%`),
        nombres: Like(`%${nombres}%`),
      },
      order: {
        fecha_creacion: "DESC",
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

  async search(term: string) {
    const list = await this.repo.find({
      where: [{ nombres: Like(`%${term}%`) }, { documento: Like(`%${term}%`) }],
      select: ["id", "nombres"],
      take: 10,
    });
    return list;
  }

  async findOneMap(id: number) {
    const find = await this.findOne(id);
    return {
      ...find,
      distrito: find.distrito.nombre,
      id_distrito: find.distrito.id,
    };
  }

  async findOne(id: number) {
    const find = await this.repo.findOne({
      where: { id },
      relations: ["distrito"],
    });
    if (!find) {
      throw new NotFoundException(`Cliente #${id} no encontrado`);
    }
    return find;
  }

  async update(id: number, dto: UpdateClienteDto) {
    const find = await this.findOne(id);
    const findDoc = await this.repo.findOne({
      where: { documento: dto.documento, id: Not(id) },
    });
    if (findDoc) {
      return { message: "El documento ya existe" };
    }

    const findDistrito = await this.distritoService.findOne(dto.id_distrito);
    if (!findDistrito) {
      return { message: "El distrito no existe" };
    }

    const updateCliente = await this.repo.preload({
      id: find.id,
      ...dto,
      distrito: findDistrito,
    });

    await this.repo.save(updateCliente);

    return this.findOneMap(id);
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
