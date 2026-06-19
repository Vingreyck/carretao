import { describe, it, expect } from "vitest";
import { OrigemAtribuicao } from "./enums";
import {
  atribuicaoVigente,
  toqueExpiraEm,
  comissaoPermitidaAutocompra,
  type ToqueMecanico,
} from "./attribution";

const agora = new Date("2026-06-19T12:00:00Z");

function toque(
  mecanicoId: string,
  origem: OrigemAtribuicao,
  em: string,
): ToqueMecanico {
  return { mecanicoId, origem, em: new Date(em) };
}

describe("atribuicaoVigente (RN-A01 last-touch)", () => {
  it("sem toques → null (venda orgânica, RN-A04)", () => {
    expect(atribuicaoVigente([], { agora })).toBeNull();
  });

  it("escolhe o último mecânico tocado dentro da janela", () => {
    const toques = [
      toque("MEC_A", OrigemAtribuicao.LINK, "2026-06-15T10:00:00Z"),
      toque("MEC_B", OrigemAtribuicao.LINK, "2026-06-18T10:00:00Z"),
    ];
    expect(atribuicaoVigente(toques, { agora })?.mecanicoId).toBe("MEC_B");
  });

  it("descarta toques fora da janela de 7 dias", () => {
    const toques = [
      toque("MEC_VELHO", OrigemAtribuicao.LINK, "2026-06-01T10:00:00Z"), // 18 dias
    ];
    expect(atribuicaoVigente(toques, { agora, janelaDias: 7 })).toBeNull();
  });

  it("RN-A01: CHECKOUT sobrepõe LINK em empate de horário", () => {
    const mesmoInstante = "2026-06-18T10:00:00Z";
    const toques = [
      toque("MEC_LINK", OrigemAtribuicao.LINK, mesmoInstante),
      toque("MEC_CHECKOUT", OrigemAtribuicao.CHECKOUT, mesmoInstante),
    ];
    expect(atribuicaoVigente(toques, { agora })?.mecanicoId).toBe("MEC_CHECKOUT");
  });

  it("RN-A40: autocompra é descartada (mecânico == cliente)", () => {
    const toques = [
      toque("CLIENTE_1", OrigemAtribuicao.CHECKOUT, "2026-06-18T10:00:00Z"),
    ];
    expect(atribuicaoVigente(toques, { agora, clienteId: "CLIENTE_1" })).toBeNull();
  });
});

describe("toqueExpiraEm (RN-A01)", () => {
  it("expira em em + janela dias", () => {
    const em = new Date("2026-06-10T00:00:00Z");
    expect(toqueExpiraEm(em, 7).toISOString()).toBe("2026-06-17T00:00:00.000Z");
  });
});

describe("comissaoPermitidaAutocompra (RN-A40)", () => {
  it("bloqueia cliente == mecânico", () => {
    expect(comissaoPermitidaAutocompra("U1", "U1")).toBe(false);
  });
  it("permite cliente != mecânico", () => {
    expect(comissaoPermitidaAutocompra("U1", "U2")).toBe(true);
  });
});
