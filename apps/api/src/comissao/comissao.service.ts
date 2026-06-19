import { Injectable } from "@nestjs/common";
import {
  calcularComissao,
  percentualComissaoValido,
  type ResultadoComissao,
} from "@carretao/core";
import { SimularComissaoDto } from "./dto/simular-comissao.dto";

export interface ResultadoSimulacao extends ResultadoComissao {
  /** RN-013: o % informado respeita os limites da plataforma? */
  percentualValido: boolean;
}

@Injectable()
export class ComissaoService {
  /**
   * Simula a comissão de um pedido usando as regras de @carretao/core.
   * A regra de negócio vive no core; o service só orquestra (docs/08).
   */
  simular(dto: SimularComissaoDto): ResultadoSimulacao {
    const resultado = calcularComissao({
      valorItensCentavos: dto.valorItensCentavos,
      comissaoPercentual: dto.comissaoPercentual,
      takeRatePlataforma: dto.takeRatePlataforma,
    });
    return {
      ...resultado,
      percentualValido: percentualComissaoValido(dto.comissaoPercentual),
    };
  }
}
