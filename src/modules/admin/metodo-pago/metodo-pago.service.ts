import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMetodoPagoDto } from "./dto/create-metodo-pago.dto";
import { UpdateMetodoPagoDto } from "./dto/update-metodo-pago.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { MetodoPago } from "./entities/metodo-pago.entity";
import { Repository } from "typeorm";
import { UsuarioService } from "../usuario/usuario.service";
import { EmpresaService } from "src/modules/empresa/empresa.service";

@Injectable()
export class MetodoPagoService {
  constructor(
    @InjectRepository(MetodoPago)
    private readonly repo: Repository<MetodoPago>,
    private readonly empresaService: EmpresaService
  ) {}

  create(createMetodoPagoDto: CreateMetodoPagoDto) {
    return "This action adds a new metodoPago";
  }

  async findAll(idUser: number) {
    const empresa = await this.empresaService.findOneByUserId(idUser);
    return await this.repo.find({
      where: { empresa }
    });
  }

  async findOne(id: number) {
    const metodoPago = await this.repo.findOne({ where: { id } });
    if (!metodoPago) {
      throw new NotFoundException(`MetodoPago #${id} not found`);
    }
    return metodoPago;
  }

  update(id: number, updateMetodoPagoDto: UpdateMetodoPagoDto) {
    return `This action updates a #${id} metodoPago`;
  }

  remove(id: number) {
    return `This action removes a #${id} metodoPago`;
  }
}
