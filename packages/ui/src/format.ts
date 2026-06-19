/** Formata centavos (inteiro) para moeda BRL. Ex.: 100000 → "R$ 1.000,00". */
export function formatarBRL(centavos: number): string {
  return (centavos / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
