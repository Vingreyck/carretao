/**
 * Máquina de estados do PEDIDO. RN-037 / RN-038 / RN-039.
 *
 *   CRIADO → CONFIRMADO → EM_PREPARO → PRONTO/ENVIADO → CONCLUIDO
 *                     ↘ CANCELADO            ↘ DEVOLVIDO (pós-conclusão, no prazo)
 */
import { StatusPedido, TipoEntrega } from "./enums";

/** Transições válidas a partir de cada estado. RN-037. */
const TRANSICOES_PEDIDO: Record<StatusPedido, readonly StatusPedido[]> = {
  [StatusPedido.CRIADO]: [StatusPedido.CONFIRMADO, StatusPedido.CANCELADO],
  [StatusPedido.CONFIRMADO]: [StatusPedido.EM_PREPARO, StatusPedido.CANCELADO],
  [StatusPedido.EM_PREPARO]: [
    StatusPedido.PRONTO,
    StatusPedido.ENVIADO,
    StatusPedido.CANCELADO,
  ],
  [StatusPedido.PRONTO]: [StatusPedido.CONCLUIDO, StatusPedido.CANCELADO],
  [StatusPedido.ENVIADO]: [StatusPedido.CONCLUIDO, StatusPedido.CANCELADO],
  [StatusPedido.CONCLUIDO]: [StatusPedido.DEVOLVIDO],
  [StatusPedido.CANCELADO]: [],
  [StatusPedido.DEVOLVIDO]: [],
};

/** Indica se a transição de `de` para `para` é permitida. RN-037. */
export function transicaoPedidoValida(
  de: StatusPedido,
  para: StatusPedido,
): boolean {
  return TRANSICOES_PEDIDO[de].includes(para);
}

/** Lista os próximos estados possíveis a partir de `de`. */
export function proximosEstadosPedido(de: StatusPedido): StatusPedido[] {
  return [...TRANSICOES_PEDIDO[de]];
}

/** Estado sem saída (CANCELADO / DEVOLVIDO). */
export function pedidoEmEstadoTerminal(status: StatusPedido): boolean {
  return TRANSICOES_PEDIDO[status].length === 0;
}

/**
 * Aplica a transição, validando-a. Lança erro se for inválida. RN-037.
 * O domínio nunca deve permitir um pedido "pular" estados.
 */
export function transicionarPedido(
  de: StatusPedido,
  para: StatusPedido,
): StatusPedido {
  if (!transicaoPedidoValida(de, para)) {
    throw new Error(`Transição de pedido inválida: ${de} → ${para}`);
  }
  return para;
}

/**
 * RN-038/RN-039: o CLIENTE só pode cancelar antes de a loja iniciar o preparo
 * (estados CRIADO ou CONFIRMADO). Depois disso, só a loja cancela com motivo.
 */
export function clientePodeCancelarPedido(status: StatusPedido): boolean {
  return status === StatusPedido.CRIADO || status === StatusPedido.CONFIRMADO;
}

/**
 * Estado de "pronto para entrega" esperado conforme o tipo de entrega:
 * RETIRADA → PRONTO, ENTREGA → ENVIADO. RN-040/RN-041.
 */
export function estadoEntregaEsperado(tipo: TipoEntrega): StatusPedido {
  return tipo === TipoEntrega.RETIRADA
    ? StatusPedido.PRONTO
    : StatusPedido.ENVIADO;
}
