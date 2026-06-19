/**
 * Atribuição do mecânico (last-touch). RN-A01 / RN-A40 / docs/04.
 *
 * Modelo: vale o ÚLTIMO mecânico tocado dentro da janela. Em empate de
 * tempo, a origem de maior prioridade vence (código no CHECKOUT sobrepõe o
 * LINK — RN-A01). Autocompra é descartada (RN-A40).
 */
import { OrigemAtribuicao } from "./enums";
import { PLATFORM_PARAMS } from "./params";

export interface ToqueMecanico {
  mecanicoId: string;
  origem: OrigemAtribuicao;
  /** Momento do toque (clique no link, leitura do QR, código no checkout). */
  em: Date;
}

/** Prioridade de desempate por origem. CHECKOUT/PEDIDO sobrepõem LINK/QR. RN-A01. */
const PRIORIDADE_ORIGEM: Record<OrigemAtribuicao, number> = {
  [OrigemAtribuicao.CHECKOUT]: 3,
  [OrigemAtribuicao.PEDIDO_MECANICO]: 3,
  [OrigemAtribuicao.QR]: 2,
  [OrigemAtribuicao.LINK]: 1,
};

/** Quando um toque expira (em + janela). RN-A01. */
export function toqueExpiraEm(
  em: Date,
  janelaDias: number = PLATFORM_PARAMS.janelaAtribuicaoDias,
): Date {
  const expira = new Date(em);
  expira.setDate(expira.getDate() + janelaDias);
  return expira;
}

export interface OpcoesAtribuicao {
  agora: Date;
  janelaDias?: number;
  /** Id do cliente do pedido — usado para descartar autocompra (RN-A40). */
  clienteId?: string;
}

/**
 * Resolve qual mecânico fica atribuído ao pedido, dado o histórico de toques.
 * Retorna `null` quando não há atribuição válida (venda orgânica — RN-A04).
 */
export function atribuicaoVigente(
  toques: readonly ToqueMecanico[],
  opts: OpcoesAtribuicao,
): ToqueMecanico | null {
  const janelaDias = opts.janelaDias ?? PLATFORM_PARAMS.janelaAtribuicaoDias;

  const validos = toques.filter((t) => {
    // RN-A40: autocompra não atribui comissão.
    if (opts.clienteId && t.mecanicoId === opts.clienteId) return false;
    // Dentro da janela de atribuição (RN-A01).
    return opts.agora.getTime() <= toqueExpiraEm(t.em, janelaDias).getTime();
  });

  if (validos.length === 0) return null;

  // Last-touch: maior `em`; empate → maior prioridade de origem.
  return validos.reduce((melhor, atual) => {
    const dt = atual.em.getTime() - melhor.em.getTime();
    if (dt > 0) return atual;
    if (dt < 0) return melhor;
    return PRIORIDADE_ORIGEM[atual.origem] > PRIORIDADE_ORIGEM[melhor.origem]
      ? atual
      : melhor;
  });
}

/**
 * RN-A40: uma conta não pode receber comissão sobre o próprio pedido.
 * Retorna `true` se a comissão é permitida (cliente ≠ mecânico).
 */
export function comissaoPermitidaAutocompra(
  clienteId: string,
  mecanicoId: string,
): boolean {
  return clienteId !== mecanicoId;
}
