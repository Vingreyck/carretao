import { Body, Controller, Post } from "@nestjs/common";
import { ComissaoService, ResultadoSimulacao } from "./comissao.service";
import { SimularComissaoDto } from "./dto/simular-comissao.dto";

@Controller("comissao")
export class ComissaoController {
  constructor(private readonly comissao: ComissaoService) {}

  /** POST /api/comissao/simular — calcula a comissão de um pedido (RN-A10/A12). */
  @Post("simular")
  simular(@Body() dto: SimularComissaoDto): ResultadoSimulacao {
    return this.comissao.simular(dto);
  }
}
