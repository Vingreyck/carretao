import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from "@nestjs/common";
import {
  StatusPedido,
  proximosEstadosPedido,
  transicaoPedidoValida,
} from "@carretao/core";
import { ValidarTransicaoDto } from "./dto/validar-transicao.dto";

function parseStatus(valor: string): StatusPedido {
  const status = (valor ?? "").toUpperCase();
  if (!(status in StatusPedido)) {
    throw new BadRequestException(`Status de pedido inválido: ${valor}`);
  }
  return status as StatusPedido;
}

@Controller("pedidos")
export class PedidosController {
  /** GET /api/pedidos/estados/:status/proximos — próximos estados válidos (RN-037). */
  @Get("estados/:status/proximos")
  proximos(@Param("status") status: string): {
    de: StatusPedido;
    proximos: StatusPedido[];
  } {
    const de = parseStatus(status);
    return { de, proximos: proximosEstadosPedido(de) };
  }

  /** POST /api/pedidos/transicao/validar — valida uma transição (RN-037). */
  @Post("transicao/validar")
  validar(@Body() dto: ValidarTransicaoDto): {
    de: StatusPedido;
    para: StatusPedido;
    valida: boolean;
  } {
    const de = parseStatus(dto.de);
    const para = parseStatus(dto.para);
    return { de, para, valida: transicaoPedidoValida(de, para) };
  }
}
