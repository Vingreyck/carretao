/**
 * Parâmetros de plataforma (defaults).
 *
 * São os valores configuráveis pelo PLATAFORMA_ADMIN. Aqui ficam os
 * PADRÕES de negócio descritos em docs/03 e docs/04. Em produção, estes
 * valores virão de configuração; o domínio sempre aceita override.
 *
 * Convenção monetária: todo valor em dinheiro é INTEIRO em CENTAVOS.
 * Percentuais são FRAÇÕES (0.05 = 5%).
 */
export const PLATFORM_PARAMS = {
  /** Comissão do mecânico — limites e padrão (fração). RN-013 / docs/04. */
  comissao: { min: 0, max: 0.2, padrao: 0.05 },

  /** Taxa da plataforma sobre a comissão (fração). MVP = 0. RN-A12. */
  takeRateSobreComissao: 0,

  /** Prazo da loja aceitar o pedido, em minutos. RN-039. */
  prazoAceitarPedidoMin: 30,

  /** Janela de devolução até confirmar/liberar comissão, em dias. RN-A21/A22. */
  janelaDevolucaoDias: 7,

  /** Janela de atribuição last-touch do mecânico, em dias. RN-A01. */
  janelaAtribuicaoDias: 7,

  /** SLA de moderação, em horas. RN-054. */
  slaModeracaoHoras: 48,

  /** Saque mínimo do mecânico, em centavos (R$ 20,00). RN-A31. */
  saqueMinimoCentavos: 2000,
} as const;

export type PlatformParams = typeof PLATFORM_PARAMS;
