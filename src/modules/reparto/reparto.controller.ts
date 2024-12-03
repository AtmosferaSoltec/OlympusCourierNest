import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from "@nestjs/common";
import { RepartoService } from "./reparto.service";
import { CreateRepartoDto } from "./dto/create-reparto.dto";
import { UpdateRepartoDto } from "./dto/update-reparto.dto";
import { AuthGuard } from "src/guards/auth.guard";

@Controller("reparto")
export class RepartoController {
  constructor(private readonly repartoService: RepartoService) {}

  @Post()
  create(@Body() createRepartoDto: CreateRepartoDto) {
    return this.repartoService.create(createRepartoDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
    @Query("activo") activo: string,
    @Query("estado") estado: string,
    @Query("num_reparto") num_reparto: number,
    @Query("nom_cliente") nom_cliente: string,
    @Query("id_usuario") id_usuario: number,
    @Query("id_subido") id_subido: number,
    @Query("id_vehiculo") id_vehiculo: number,
    @Query("desde") desde: string,
    @Query("hasta") hasta: string,
    @Req() req
  ) {
    const { id } = req.user;

    return this.repartoService.findAllNew(
      id,
      page,
      limit,
      activo,
      estado,
      num_reparto,
      nom_cliente,
      id_usuario,
      id_subido,
      id_vehiculo,
      desde,
      hasta
    );
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.repartoService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRepartoDto: UpdateRepartoDto) {
    return this.repartoService.update(+id, updateRepartoDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.repartoService.remove(+id);
  }
}
