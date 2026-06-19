/**
 * Enums do domínio Carretão.
 *
 * Modelados como objetos `as const` + união de tipos (em vez de `enum` do TS)
 * para máxima compatibilidade com type-stripping e bundlers. Espelham os
 * estados descritos em docs/03 e docs/05.
 */

/** Papéis de acesso (RBAC). Ver docs/02. */
export const Papel = {
  CLIENTE: "CLIENTE",
  MECANICO: "MECANICO",
  LOJA_ADMIN: "LOJA_ADMIN",
  LOJA_OPERADOR: "LOJA_OPERADOR",
  PLATAFORMA_ADMIN: "PLATAFORMA_ADMIN",
  PLATAFORMA_SUPORTE: "PLATAFORMA_SUPORTE",
} as const;
export type Papel = (typeof Papel)[keyof typeof Papel];

/** Status de usuário. */
export const StatusUsuario = {
  ATIVO: "ATIVO",
  SUSPENSO: "SUSPENSO",
  EXCLUIDO: "EXCLUIDO",
} as const;
export type StatusUsuario = (typeof StatusUsuario)[keyof typeof StatusUsuario];

/** Status da loja (tenant). RN-014. */
export const StatusLoja = {
  PENDENTE: "PENDENTE",
  ATIVA: "ATIVA",
  SUSPENSA: "SUSPENSA",
} as const;
export type StatusLoja = (typeof StatusLoja)[keyof typeof StatusLoja];

/** Verificação do mecânico para saque. RN-004. */
export const StatusVerificacao = {
  PENDENTE: "PENDENTE",
  APROVADO: "APROVADO",
  REPROVADO: "REPROVADO",
} as const;
export type StatusVerificacao =
  (typeof StatusVerificacao)[keyof typeof StatusVerificacao];

/** Tipo de entrega do pedido. RN-034. */
export const TipoEntrega = {
  RETIRADA: "RETIRADA",
  ENTREGA: "ENTREGA",
} as const;
export type TipoEntrega = (typeof TipoEntrega)[keyof typeof TipoEntrega];

/** Método de pagamento. RN-045. */
export const MetodoPagamento = {
  NA_LOJA: "NA_LOJA",
  ONLINE: "ONLINE",
} as const;
export type MetodoPagamento =
  (typeof MetodoPagamento)[keyof typeof MetodoPagamento];

/** Status do pagamento. */
export const StatusPagamento = {
  PENDENTE: "PENDENTE",
  PAGO: "PAGO",
  ESTORNADO: "ESTORNADO",
} as const;
export type StatusPagamento =
  (typeof StatusPagamento)[keyof typeof StatusPagamento];

/** Ciclo de vida do pedido. RN-037. */
export const StatusPedido = {
  CRIADO: "CRIADO",
  CONFIRMADO: "CONFIRMADO",
  EM_PREPARO: "EM_PREPARO",
  PRONTO: "PRONTO",
  ENVIADO: "ENVIADO",
  CONCLUIDO: "CONCLUIDO",
  CANCELADO: "CANCELADO",
  DEVOLVIDO: "DEVOLVIDO",
} as const;
export type StatusPedido = (typeof StatusPedido)[keyof typeof StatusPedido];

/** Ciclo de vida da comissão do mecânico. RN-A20+. */
export const StatusComissao = {
  PENDENTE: "PENDENTE",
  CONFIRMADA: "CONFIRMADA",
  A_PAGAR: "A_PAGAR",
  PAGA: "PAGA",
  ESTORNADA: "ESTORNADA",
} as const;
export type StatusComissao =
  (typeof StatusComissao)[keyof typeof StatusComissao];

/** Origem da atribuição do mecânico. RN-A01. */
export const OrigemAtribuicao = {
  LINK: "LINK",
  QR: "QR",
  CHECKOUT: "CHECKOUT",
  PEDIDO_MECANICO: "PEDIDO_MECANICO",
} as const;
export type OrigemAtribuicao =
  (typeof OrigemAtribuicao)[keyof typeof OrigemAtribuicao];
