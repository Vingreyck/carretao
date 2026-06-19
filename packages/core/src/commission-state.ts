/**
 * Máquina de estados da COMISSÃO do mecânico. RN-A20+ / docs/04.
 *
 *   PENDENTE → CONFIRMADA → A_PAGAR → PAGA
 *      │            │
 *      └────────────┴──► ESTORNADA  (cancelamento/devolução)
 */
import { StatusComissao, StatusPedido } from "./enums";
import { PLATFORM_PARAMS } from "./params";

const TRANSICOES_COMISSAO: Record<StatusComissao, readonly StatusComissao[]> = {
  [StatusComissao.PENDENTE]: [
    StatusComissao.CONFIRMADA,
    StatusComissao.ESTORNADA,
  ],
  [StatusComissao.CONFIRMADA]: [
    StatusComissao.A_PAGAR,
    StatusComissao.ESTORNADA,
  ],
  [StatusComissao.A_PAGAR]: [StatusComissao.PAGA, StatusComissao.ESTORNADA],
  // RN-A24: comissão já PAGA pode ser estornada (vira saldo a compensar).
  [StatusComissao.PAGA]: [StatusComissao.ESTORNADA],
  [StatusComissao.ESTORNADA]: [],
};

/** Indica se a transição de comissão é permitida. RN-A20+. */
export function transicaoComissaoValida(
  de: StatusComissao,
  para: StatusComissao,
): boolean {
  return TRANSICOES_COMISSAO[de].includes(para);
}

/** Aplica a transição da comissão, validando-a. Lança erro se inválida. */
export function transicionarComissao(
  de: StatusComissao,
  para: StatusComissao,
): StatusComissao {
  if (!transicaoComissaoValida(de, para)) {
    throw new Error(`Transição de comissão inválida: ${de} → ${para}`);
  }
  return para;
}

/**
 * RN-A21: ao CONCLUIR o pedido com pagamento confirmado, a comissão PENDENTE
 * passa a CONFIRMADA (e começa a contar a janela de devolução). Em qualquer
 * outra combinação, o status não muda.
 */
export function comissaoAoConcluirPedido(
  statusComissao: StatusComissao,
  statusPedido: StatusPedido,
  pagamentoConfirmado: boolean,
): StatusComissao {
  if (
    statusComissao === StatusComissao.PENDENTE &&
    statusPedido === StatusPedido.CONCLUIDO &&
    pagamentoConfirmado
  ) {
    return StatusComissao.CONFIRMADA;
  }
  return statusComissao;
}

/**
 * RN-A22: a comissão CONFIRMADA fica liberável (A_PAGAR) somente após
 * decorrer a janela de devolução sem estorno.
 */
export function comissaoLiberavel(
  statusComissao: StatusComissao,
  confirmadaEm: Date,
  agora: Date,
  janelaDias: number = PLATFORM_PARAMS.janelaDevolucaoDias,
): boolean {
  if (statusComissao !== StatusComissao.CONFIRMADA) return false;
  const liberaEm = new Date(confirmadaEm);
  liberaEm.setDate(liberaEm.getDate() + janelaDias);
  return agora.getTime() >= liberaEm.getTime();
}

/**
 * RN-A22: retorna A_PAGAR se a comissão já estiver liberável; senão mantém.
 */
export function comissaoAposJanelaDevolucao(
  statusComissao: StatusComissao,
  confirmadaEm: Date,
  agora: Date,
  janelaDias: number = PLATFORM_PARAMS.janelaDevolucaoDias,
): StatusComissao {
  return comissaoLiberavel(statusComissao, confirmadaEm, agora, janelaDias)
    ? StatusComissao.A_PAGAR
    : statusComissao;
}

/**
 * RN-A24/RN-038: cancelamento ou devolução do pedido estorna a comissão em
 * qualquer estado (inclusive PAGA, que vira saldo a compensar). ESTORNADA é
 * terminal, então o resultado é sempre ESTORNADA.
 */
export function comissaoAoCancelarOuDevolver(
  _statusComissao: StatusComissao,
): StatusComissao {
  return StatusComissao.ESTORNADA;
}
