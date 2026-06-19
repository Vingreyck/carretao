import React from "react";
import { colors, fontSizes, fontWeights } from "../tokens";
import { formatarBRL } from "../format";

export interface PriceTagProps {
  /** Valor em centavos (inteiro). */
  centavos: number;
  /** Preço "de" (promoção), também em centavos. */
  deCentavos?: number;
}

/** Exibe preço em BRL, com preço "de/por" opcional. */
export function PriceTag({
  centavos,
  deCentavos,
}: PriceTagProps): React.JSX.Element {
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", gap: 8 }}>
      {deCentavos && deCentavos > centavos ? (
        <span
          style={{
            color: colors.textoSuave,
            textDecoration: "line-through",
            fontSize: fontSizes.sm,
          }}
        >
          {formatarBRL(deCentavos)}
        </span>
      ) : null}
      <span
        style={{
          color: colors.estrada,
          fontSize: fontSizes.lg,
          fontWeight: fontWeights.forte,
        }}
      >
        {formatarBRL(centavos)}
      </span>
    </span>
  );
}
