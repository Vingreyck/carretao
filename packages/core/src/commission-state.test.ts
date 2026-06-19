import { describe, it, expect } from "vitest";
import { StatusComissao, StatusPedido } from "./enums";
import {
  transicaoComissaoValida,
  transicionarComissao,
  comissaoAoConcluirPedido,
  comissaoLiberavel,
  comissaoAposJanelaDevolucao,
  comissaoAoCancelarOuDevolver,
} from "./commission-state";

describe("máquina de estados da comissão (RN-A20+)", () => {
  it("fluxo feliz PENDENTE → CONFIRMADA → A_PAGAR → PAGA", () => {
    expect(transicaoComissaoValida(StatusComissao.PENDENTE, StatusComissao.CONFIRMADA)).toBe(true);
    expect(transicaoComissaoValida(StatusComissao.CONFIRMADA, StatusComissao.A_PAGAR)).toBe(true);
    expect(transicaoComissaoValida(StatusComissao.A_PAGAR, StatusComissao.PAGA)).toBe(true);
  });

  it("RN-A24: PAGA pode ir para ESTORNADA (saldo a compensar)", () => {
    expect(transicaoComissaoValida(StatusComissao.PAGA, StatusComissao.ESTORNADA)).toBe(true);
  });

  it("ESTORNADA é terminal", () => {
    expect(transicaoComissaoValida(StatusComissao.ESTORNADA, StatusComissao.PENDENTE)).toBe(false);
  });

  it("proíbe pular PENDENTE → A_PAGAR", () => {
    expect(() =>
      transicionarComissao(StatusComissao.PENDENTE, StatusComissao.A_PAGAR),
    ).toThrow();
  });
});

describe("comissaoAoConcluirPedido (RN-A21)", () => {
  it("PENDENTE + pedido CONCLUIDO + pago → CONFIRMADA", () => {
    expect(
      comissaoAoConcluirPedido(StatusComissao.PENDENTE, StatusPedido.CONCLUIDO, true),
    ).toBe(StatusComissao.CONFIRMADA);
  });

  it("não confirma se o pagamento não foi confirmado (RN-A42)", () => {
    expect(
      comissaoAoConcluirPedido(StatusComissao.PENDENTE, StatusPedido.CONCLUIDO, false),
    ).toBe(StatusComissao.PENDENTE);
  });

  it("não confirma se o pedido ainda não foi concluído", () => {
    expect(
      comissaoAoConcluirPedido(StatusComissao.PENDENTE, StatusPedido.EM_PREPARO, true),
    ).toBe(StatusComissao.PENDENTE);
  });
});

describe("liberação após janela de devolução (RN-A22)", () => {
  const confirmada = new Date("2026-06-01T12:00:00Z");

  it("não libera antes de decorrer a janela de 7 dias", () => {
    const agora = new Date("2026-06-05T12:00:00Z"); // 4 dias
    expect(comissaoLiberavel(StatusComissao.CONFIRMADA, confirmada, agora, 7)).toBe(false);
    expect(comissaoAposJanelaDevolucao(StatusComissao.CONFIRMADA, confirmada, agora, 7)).toBe(
      StatusComissao.CONFIRMADA,
    );
  });

  it("libera (A_PAGAR) exatamente após 7 dias", () => {
    const agora = new Date("2026-06-08T12:00:00Z"); // 7 dias
    expect(comissaoLiberavel(StatusComissao.CONFIRMADA, confirmada, agora, 7)).toBe(true);
    expect(comissaoAposJanelaDevolucao(StatusComissao.CONFIRMADA, confirmada, agora, 7)).toBe(
      StatusComissao.A_PAGAR,
    );
  });

  it("só libera a partir de CONFIRMADA", () => {
    const agora = new Date("2026-06-30T12:00:00Z");
    expect(comissaoLiberavel(StatusComissao.PENDENTE, confirmada, agora, 7)).toBe(false);
  });
});

describe("estorno por cancelamento/devolução (RN-A24/RN-038)", () => {
  it("qualquer estado vai para ESTORNADA", () => {
    expect(comissaoAoCancelarOuDevolver(StatusComissao.PENDENTE)).toBe(StatusComissao.ESTORNADA);
    expect(comissaoAoCancelarOuDevolver(StatusComissao.PAGA)).toBe(StatusComissao.ESTORNADA);
  });
});
