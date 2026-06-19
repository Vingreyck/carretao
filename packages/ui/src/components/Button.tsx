import React from "react";
import { colors, radii, fontSizes, fontWeights } from "../tokens";

export type ButtonVariant = "primario" | "secundario" | "fantasma";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** Ocupa toda a largura disponível. */
  bloco?: boolean;
}

const estiloPorVariant: Record<ButtonVariant, React.CSSProperties> = {
  primario: { background: colors.estrada, color: colors.superficie },
  secundario: { background: colors.asfalto, color: colors.superficie },
  fantasma: {
    background: "transparent",
    color: colors.estrada,
    border: `2px solid ${colors.estrada}`,
  },
};

/** Botão grande e arredondado — pensado para uso com pressa, mão na graxa. */
export function Button({
  variant = "primario",
  bloco = false,
  style,
  children,
  ...rest
}: ButtonProps): React.JSX.Element {
  return (
    <button
      style={{
        ...estiloPorVariant[variant],
        width: bloco ? "100%" : undefined,
        border: estiloPorVariant[variant].border ?? "none",
        borderRadius: radii.pill,
        padding: "14px 24px",
        fontFamily: "inherit",
        fontSize: fontSizes.md,
        fontWeight: fontWeights.forte,
        cursor: "pointer",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
