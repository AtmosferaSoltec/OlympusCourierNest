import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateRepartoDto } from "./dto/create-reparto.dto";
import { UpdateRepartoDto } from "./dto/update-reparto.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Reparto } from "./entities/reparto.entity";
import { Between, Like, Repository } from "typeorm";
import { UsuarioService } from "../admin/usuario/usuario.service";

@Injectable()
export class RepartoService {
  constructor(
    @InjectRepository(Reparto)
    private readonly repo: Repository<Reparto>,

    private readonly usuarioService: UsuarioService
  ) {}

  create(createRepartoDto: CreateRepartoDto) {
    return "This action adds a new reparto";
  }

  async findAllNew(
    idUser: number,
    page: number,
    limit: number,
    activo: string,
    estado: string,
    num_reparto: number,
    nom_cliente: string,
    id_usuario: number,
    id_subido: number,
    id_vehiculo: number,
    desde: string,
    hasta: string
  ) {
    try {
      const { empresa } = await this.usuarioService.findOne(idUser);

      const query = this.repo.createQueryBuilder("reparto")
        .leftJoinAndSelect("reparto.empresa", "empresa")
        .leftJoinAndSelect("reparto.cliente", "cliente")
        .leftJoinAndSelect("cliente.distrito", "distrito")
        .leftJoinAndSelect("reparto.usuario", "usuario")
        .leftJoinAndSelect("reparto.items", "items")
        .leftJoinAndSelect("reparto.vehiculo", "vehiculo")
        .leftJoinAndSelect("reparto.comprobante", "comprobante")
        .leftJoinAndSelect("reparto.historialRepartos", "historialRepartos")
        .leftJoinAndSelect("historialRepartos.usuario", "historialUsuario")
        .leftJoinAndSelect("historialRepartos.tipoOperacion", "tipoOperacion")
        .where("empresa.id = :empresaId", { empresaId: empresa.id });


      // Filtros dinámicos
      if (activo) query.andWhere("reparto.activo LIKE :activo", { activo: `%${activo}%` });
      if (estado) query.andWhere("reparto.estado LIKE :estado", { estado: `%${estado}%` });
      if (num_reparto) query.andWhere("reparto.num_reparto = :num_reparto", { num_reparto });
      if (nom_cliente) query.andWhere("cliente.nombres LIKE :nom_cliente", { nom_cliente: `%${nom_cliente}%` });
      if (id_vehiculo) query.andWhere("vehiculo.id = :id_vehiculo", { id_vehiculo });
      if (id_usuario) query.andWhere("reparto.id_usuario = :id_usuario", { id_usuario });
  
      if (id_subido) {
        query.andWhere((qb) => {
          const subQuery = qb.subQuery()
            .select("historialUsuario.id")
            .from("historialRepartos", "h")
            .leftJoin("h.tipoOperacion", "tipoOp")
            .where("h.repartoId = reparto.id")
            .andWhere("tipoOp.id = :tipoOperacionId", { tipoOperacionId: 5 })
            .getQuery();
          return `(${subQuery}) = :id_subido`;
        }, { id_subido });
      }
  
      if (desde && hasta) {
        const desdeDate = new Date(desde).setUTCHours(0, 0, 0, 0);
        const hastaDate = new Date(hasta).setUTCHours(23, 59, 59, 999);
  
        query.andWhere("reparto.fecha_creacion BETWEEN :desde AND :hasta", {
          desde: new Date(desdeDate).toISOString(),
          hasta: new Date(hastaDate).toISOString(),
        });
      }
  
      query.orderBy("reparto.id", "DESC")
        .skip((page - 1) * limit)
        .take(limit);
  
      const [list, total] = await query.getManyAndCount();
  
      const listMap = list.map((r) => {
        const totalAdicional = r.items.reduce((acc, i) => acc + (Number(i.adicional) || 0), 0);
        const totalPrecio = r.items.reduce((acc, i) => acc + (Number(i.precio) || 0), 0);
  
        const subido = r.historialRepartos.find((h) => h.tipoOperacion.id === 5);
        const entregado = r.historialRepartos.find((h) => h.tipoOperacion.id === 4);
  
        return {
          id: r.id,
          num_reparto: r.num_reparto,
          id_usuario: r.usuario?.id,
          usuario: r.usuario?.nombres,
          id_subido: subido?.usuario?.id ?? null,
          subido: subido?.usuario?.nombres ?? null,
          entregado: entregado?.usuario?.nombres ?? null,
          cliente: r.cliente?.nombres,
          telefono: r.cliente?.telefono,
          direccion: r.cliente?.direc,
          distrito: r.cliente?.distrito?.nombre,
          fecha_creacion: r.fecha_creacion,
          estado: r.estado,
          activo: r.activo,
          costo_adicional: +totalAdicional,
          costo_reparto: +totalPrecio,
          comprobante: r.comprobante ? `${r.comprobante.serie}-${r.comprobante.num_serie}` : null,
          items: r.items.map((i) => ({
            id: i.id,
            num_guia: i.num_guia,
            detalle: i.detalle,
            precio: Number(i.precio),
            adicional: Number(i.adicional),
            clave: i.clave,
          })),
        };
      });
  
      return {
        total: +total,
        page: +page,
        limit: +limit,
        totalPages: Math.ceil(total / limit),
        data: listMap,
      };
      
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Error en el servidor");
    }
  }

  async findAll(
    idUser: number,
    page: number,
    limit: number,
    activo: string,
    estado: string,
    num_reparto: number,
    nom_cliente: string,
    id_usuario: number,
    id_subido: number,
    id_vehiculo: number,
    desde: string,
    hasta: string
  ) {
    try {
      const { empresa } = await this.usuarioService.findOne(idUser);

      const whereCondition: any = {};

      whereCondition.empresa = { id: empresa.id };

      // Condiciones dinámicas para los filtros
      if (activo) {
        whereCondition.activo = Like(`%${activo}%`);
      }
      if (estado) {
        whereCondition.estado = Like(`%${estado}%`);
      }
      if (num_reparto) {
        whereCondition.num_reparto = num_reparto; // Es un número, no necesita Like
      }
      if (nom_cliente) {
        whereCondition.cliente = { nombres: Like(`%${nom_cliente}%`) };
      }

      if (id_vehiculo) {
        whereCondition.vehiculo = { id: id_vehiculo };
      }

      if (desde && hasta) {
        if (desde == hasta) {
          whereCondition.fecha_creacion = Like(`%${desde}%`);
        } else {
          const desdeDate = new Date(desde);
          desdeDate.setUTCHours(0, 0, 0, 0);
          const hastaDate = new Date(hasta);
          hastaDate.setUTCHours(23, 59, 59, 999);
          whereCondition.fecha_creacion = Between(desdeDate, hastaDate);
        }
      }

      const [list, total] = await this.repo.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: [
          "empresa",
          "cliente",
          "cliente.distrito",
          "usuario",
          "items",
          "vehiculo",
          "comprobante",
          "historialRepartos",
          "historialRepartos.usuario",
          "historialRepartos.tipoOperacion",
        ],
        order: { id: "DESC" },
        where: whereCondition,
      });

      let listMap = list.map((r) => {
        const totalAdicional = r.items.reduce(
          (acc, i) => acc + (Number(i.adicional) || 0),
          0
        );
        const totalPrecio = r.items.reduce(
          (acc, i) => acc + (Number(i.precio) || 0),
          0
        );
        let comp: any = null;
        if (r?.comprobante) {
          comp = `${r.comprobante.serie}-${r.comprobante.num_serie}`;
        }

        //obtener por quien fue subido
        const subido = r.historialRepartos.find(
          (h) => h.tipoOperacion.id === 5
        );

        // obtener por quien fue entregado
        const entregado = r.historialRepartos.find(
          (h) => h.tipoOperacion.id === 4
        );

        const reparto = {
          id: r.id,
          num_reparto: r.num_reparto,
          id_usuario: r.usuario?.id,
          usuario: r.usuario?.nombres,
          id_subido: subido?.usuario?.id ?? null,
          subido: subido?.usuario?.nombres ?? null,
          entregado: entregado?.usuario?.nombres ?? null,
          cliente: r.cliente?.nombres,
          telefono: r.cliente?.telefono,
          direccion: r.cliente?.direc,
          distrito: r.cliente?.distrito?.nombre,
          fecha_creacion: r.fecha_creacion,
          estado: r.estado,
          activo: r.activo,
          costo_adicional: +totalAdicional,
          costo_reparto: +totalPrecio,
          comprobante: comp,
          items: r.items.map((i) => ({
            id: i.id,
            num_guia: i.num_guia,
            detalle: i.detalle,
            precio: Number(i.precio),
            adicional: Number(i.adicional),
            clave: i.clave,
          })),
        };

        return reparto;
      });

      if (id_usuario) {
        listMap = listMap.filter((r) => r.id_usuario == id_usuario);
      }

      if (id_subido) {
        listMap = listMap.filter((r) => r.id_subido == id_subido);
      }

      return {
        total: +total,
        page: +page,
        limit: +limit,
        totalPages: Math.ceil(total / limit),
        data: listMap,
      };
    } catch (error) {
      console.log(error?.message);
      throw new InternalServerErrorException("Error en el servidor");
    }
  }

  async findOne(id: number) {
    try {
      const reparto = await this.repo.findOne({
        where: { id },
        relations: ["empresa"],
      });
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
      throw new InternalServerErrorException("Error en el servidor");
    }
  }

  update(id: number, updateRepartoDto: UpdateRepartoDto) {
    return `This action updates a #${id} reparto`;
  }

  remove(id: number) {
    return `This action removes a #${id} reparto`;
  }
}
