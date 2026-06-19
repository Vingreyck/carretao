import { describe, it, expect } from "vitest";
import {
  calcularComissao,
  percentualComissaoValido,
  baseAposDevolucao,
} from "./commission";

describe("calcularComissao (RN-A10/A12)", () => {
  it("RN-A10: comissão de 5% sobre R$ 1.000,00 em itens = R$ 50,00", () => {
    const r = calcularComissao({
      valorItensCentavos: 100_000,
      comissaoPercentual: 0.05,
    });
    expect(r.comissaoBrutaCentavos).toBe(5_000);
    expect(r.comissaoLiquidaCentavos).toBe(5_000);
    expect(r.taxaPlataformaCentavos).toBe(0); // MVP take rate = 0
  });

  it("RN-A12: aplica take rate da plataforma sobre a comissão bruta", () => {
    const r = calcularComissao({
      valorItensCentavos: 100_000,
      comissaoPercentual: 0.05,
      takeRatePlataforma: 0.1, // 10% sobre a comissão
    });
    expect(r.comissaoBrutaCentavos).toBe(5_000);
    expect(r.taxaPlataformaCentavos).toBe(500);
    expect(r.comissaoLiquidaCentavos).toBe(4_500);
  });

  it("arredonda para centavo inteiro", () => {
    // 3333 centavos * 5% = 166,65 → 167 centavos
    const r = calcularComissao({
      valorItensCentavos: 3_333,
      comissaoPercentual: 0.05,
    });
    expect(r.comissaoBrutaCentavos).toBe(167);
  });

  it("comissão 0% gera comissão zero (venda orgânica configurada)", () => {
    const r = calcularComissao({
      valorItensCentavos: 50_000,
      comissaoPercentual: 0,
    });
    expect(r.comissaoLiquidaCentavos).toBe(0);
  });

  it("rejeita valor não-inteiro ou negativo", () => {
    expect(() =>
      calcularComissao({ valorItensCentavos: 10.5, comissaoPercentual: 0.05 }),
    ).toThrow();
    expect(() =>
      calcularComissao({ valorItensCentavos: -1, comissaoPercentual: 0.05 }),
    ).toThrow();
  });

  it("rejeita percentual fora de 0..1", () => {
    expect(() =>
      calcularComissao({ valorItensCentavos: 100, comissaoPercentual: 1.5 }),
    ).toThrow();
  });
});

describe("percentualComissaoValido (RN-013)", () => {
  it("aceita dentro dos limites (0% a 20%)", () => {
    expect(percentualComissaoValido(0)).toBe(true);
    expect(percentualComissaoValido(0.05)).toBe(true);
    expect(percentualComissaoValido(0.2)).toBe(true);
  });
  it("rejeita acima do máximo da plataforma", () => {
    expect(percentualComissaoValido(0.25)).toBe(false);
    expect(percentualComissaoValido(-0.01)).toBe(false);
  });
});

describe("baseAposDevolucao (RN-A11)", () => {
  it("remove itens devolvidos da base", () => {
    expect(baseAposDevolucao(100_000, 30_000)).toBe(70_000);
  });
  it("nunca retorna base negativa", () => {
    expect(baseAposDevolucao(100_000, 150_000)).toBe(0);
  });
});
