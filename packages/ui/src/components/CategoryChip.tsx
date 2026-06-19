import React from "react";
import { colors, radii, fontSizes, fontWeights } from "../tokens";

export interface CategoryChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rotulo: string;
  /** Emoji/ícone simples à esquerda. */
  icone?: string;
  ativo?: boolean;
}

/** Atalho de categoria de peça (Freios, Motor, Embreagem...). */
export function CategoryChip({
  rotulo,
  icone,
  ativo = false,
  style,
  ...rest
}: CategoryChipProps): React.JSX.Element {
  return (
    <button
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: ativo ? colors.estrada : colors.superficie,
        color: ativo ? colors.superficie : colors.texto,
        border: `1px solid ${ativo ? colors.estrada : colors.borda}`,
        borderRadius: radii.pill,
        padding: "10px 16px",
        fontFamily: "inherit",
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.medio,
        cursor: "pointer",
        ...style,
      }}
      {...rest}
    >
      {icone ? <span aria-hidden>{icone}</span> : null}
      {rotulo}
    </button>
  );
}
