import { Controller } from '@nestjs/common';
import { ComprobanteService } from './comprobante.service';

@Controller('comprobante')
export class ComprobanteController {
  constructor(private readonly comprobanteService: ComprobanteService) {}
}
