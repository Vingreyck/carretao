/**
 * Cálculo de comissão do mecânico. Ver docs/04.
 *
 * Regras implementadas:
 *  - RN-A10: comissão incide sobre o VALOR DOS ITENS (sem frete/taxas).
 *  - RN-A11: itens devolvidos/cancelados saem da base.
 *  - RN-A12: a plataforma pode reter um % da comissão (take rate). MVP = 0.
 *  - RN-013: o % de comissão da loja deve respeitar os limites da plataforma.
 *
 * Tudo em CENTAVOS (inteiros) para evitar erro de ponto flutuante.
 */
import { PLATFORM_PARAMS } from "./params";

export interface EntradaComissao {
  /** Soma dos itens em centavos (base da comissão — RN-A10). */
  valorItensCentavos: number;
  /** Percentual de comissão da loja (fração 0..1), congelado no pedido (RN-A02). */
  comissaoPercentual: number;
  /** Take rate da plataforma sobre a comissão (fração). Default: PLATFORM_PARAMS. */
  takeRatePlataforma?: number;
}

export interface ResultadoComissao {
  valorBaseCentavos: number;
  comissaoBrutaCentavos: number;
  taxaPlataformaCentavos: number;
  comissaoLiquidaCentavos: number;
}

/** Calcula a comissão do mecânico para um pedido. RN-A10/A12. */
export function calcularComissao(e: EntradaComissao): ResultadoComissao {
  if (!Number.isInteger(e.valorItensCentavos) || e.valorItensCentavos < 0) {
    throw new Error("valorItensCentavos deve ser inteiro >= 0 (centavos)");
  }
  if (e.comissaoPercentual < 0 || e.comissaoPercentual > 1) {
    throw new Error("comissaoPercentual deve ser uma fração entre 0 e 1");
  }
  const takeRate = e.takeRatePlataforma ?? PLATFORM_PARAMS.takeRateSobreComissao;
  if (takeRate < 0 || takeRate > 1) {
    throw new Error("takeRatePlataforma deve ser uma fração entre 0 e 1");
  }

  const comissaoBrutaCentavos = Math.round(
    e.valorItensCentavos * e.comissaoPercentual,
  );
  const taxaPlataformaCentavos = Math.round(comissaoBrutaCentavos * takeRate);
  const comissaoLiquidaCentavos =
    comissaoBrutaCentavos - taxaPlataformaCentavos;

  return {
    valorBaseCentavos: e.valorItensCentavos,
    comissaoBrutaCentavos,
    taxaPlataformaCentavos,
    comissaoLiquidaCentavos,
  };
}

/** RN-013: valida se o % de comissão da loja está dentro dos limites da plataforma. */
export function percentualComissaoValido(percentual: number): boolean {
  return (
    percentual >= PLATFORM_PARAMS.comissao.min &&
    percentual <= PLATFORM_PARAMS.comissao.max
  );
}

/**
 * RN-A11: recalcula a base de comissão após devolução/cancelamento parcial,
 * removendo o valor dos itens devolvidos. Nunca retorna negativo.
 */
export function baseAposDevolucao(
  valorItensCentavos: number,
  valorDevolvidoCentavos: number,
): number {
  const base = valorItensCentavos - valorDevolvidoCentavos;
  return base < 0 ? 0 : base;
}
