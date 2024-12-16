import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { Request } from "express";

@Controller("usuario")
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Req() req: Request,
    @Query("tipoUsuario") tipoUsuario: string
  ) {
    const { id_ruc } = req["user"];
    return this.usuarioService.findAll(id_ruc, tipoUsuario);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usuarioService.remove(+id);
  }
}
