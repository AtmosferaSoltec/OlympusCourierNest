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
} from "@nestjs/common";
import { MetodoPagoService } from "./metodo-pago.service";
import { CreateMetodoPagoDto } from "./dto/create-metodo-pago.dto";
import { UpdateMetodoPagoDto } from "./dto/update-metodo-pago.dto";
import { AuthGuard } from "src/guards/auth.guard";

@Controller("metodo-pago")
export class MetodoPagoController {
  constructor(private readonly metodoPagoService: MetodoPagoService) {}

  @Post()
  create(@Body() createMetodoPagoDto: CreateMetodoPagoDto) {
    return this.metodoPagoService.create(createMetodoPagoDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() request: Request) {
    const { id } = request["user"];
    return this.metodoPagoService.findAll(id);
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.metodoPagoService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMetodoPagoDto: UpdateMetodoPagoDto
  ) {
    return this.metodoPagoService.update(+id, updateMetodoPagoDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.metodoPagoService.remove(+id);
  }
}
