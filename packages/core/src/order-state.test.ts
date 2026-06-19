import { describe, it, expect } from "vitest";
import { StatusPedido, TipoEntrega } from "./enums";
import {
  transicaoPedidoValida,
  transicionarPedido,
  proximosEstadosPedido,
  pedidoEmEstadoTerminal,
  clientePodeCancelarPedido,
  estadoEntregaEsperado,
} from "./order-state";

describe("máquina de estados do pedido (RN-037)", () => {
  it("permite o fluxo feliz CRIADO → ... → CONCLUIDO", () => {
    expect(transicaoPedidoValida(StatusPedido.CRIADO, StatusPedido.CONFIRMADO)).toBe(true);
    expect(transicaoPedidoValida(StatusPedido.CONFIRMADO, StatusPedido.EM_PREPARO)).toBe(true);
    expect(transicaoPedidoValida(StatusPedido.EM_PREPARO, StatusPedido.PRONTO)).toBe(true);
    expect(transicaoPedidoValida(StatusPedido.PRONTO, StatusPedido.CONCLUIDO)).toBe(true);
  });

  it("permite ENVIADO → CONCLUIDO (entrega)", () => {
    expect(transicaoPedidoValida(StatusPedido.EM_PREPARO, StatusPedido.ENVIADO)).toBe(true);
    expect(transicaoPedidoValida(StatusPedido.ENVIADO, StatusPedido.CONCLUIDO)).toBe(true);
  });

  it("permite CONCLUIDO → DEVOLVIDO (pós-conclusão)", () => {
    expect(transicaoPedidoValida(StatusPedido.CONCLUIDO, StatusPedido.DEVOLVIDO)).toBe(true);
  });

  it("proíbe pular estados (CRIADO → CONCLUIDO)", () => {
    expect(transicaoPedidoValida(StatusPedido.CRIADO, StatusPedido.CONCLUIDO)).toBe(false);
    expect(() => transicionarPedido(StatusPedido.CRIADO, StatusPedido.CONCLUIDO)).toThrow();
  });

  it("proíbe sair de estado terminal", () => {
    expect(pedidoEmEstadoTerminal(StatusPedido.CANCELADO)).toBe(true);
    expect(pedidoEmEstadoTerminal(StatusPedido.DEVOLVIDO)).toBe(true);
    expect(proximosEstadosPedido(StatusPedido.CANCELADO)).toEqual([]);
  });

  it("transicionarPedido devolve o novo estado quando válido", () => {
    expect(transicionarPedido(StatusPedido.CRIADO, StatusPedido.CONFIRMADO)).toBe(
      StatusPedido.CONFIRMADO,
    );
  });
});

describe("cancelamento pelo cliente (RN-038/RN-039)", () => {
  it("cliente pode cancelar antes do preparo (CRIADO/CONFIRMADO)", () => {
    expect(clientePodeCancelarPedido(StatusPedido.CRIADO)).toBe(true);
    expect(clientePodeCancelarPedido(StatusPedido.CONFIRMADO)).toBe(true);
  });
  it("cliente NÃO pode cancelar a partir de EM_PREPARO", () => {
    expect(clientePodeCancelarPedido(StatusPedido.EM_PREPARO)).toBe(false);
    expect(clientePodeCancelarPedido(StatusPedido.PRONTO)).toBe(false);
  });
});

describe("estado de entrega esperado (RN-040/041)", () => {
  it("RETIRADA espera PRONTO; ENTREGA espera ENVIADO", () => {
    expect(estadoEntregaEsperado(TipoEntrega.RETIRADA)).toBe(StatusPedido.PRONTO);
    expect(estadoEntregaEsperado(TipoEntrega.ENTREGA)).toBe(StatusPedido.ENVIADO);
  });
});
