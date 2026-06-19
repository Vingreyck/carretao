import React from "react";
import { colors, radii, fontSizes, fontWeights } from "../tokens";

export type BadgeTom = "estrada" | "sucesso" | "alerta" | "neutro" | "sol";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tom?: BadgeTom;
}

const fundoPorTom: Record<BadgeTom, { bg: string; cor: string }> = {
  estrada: { bg: colors.estradaClaro, cor: colors.estradaEscuro },
  sucesso: { bg: "#D8F3E4", cor: colors.sucesso },
  alerta: { bg: "#FBE0E0", cor: colors.alerta },
  sol: { bg: "#FFF1C2", cor: colors.aviso },
  neutro: { bg: "#ECECEA", cor: colors.textoSuave },
};

/** Selo pequeno: status de pedido, "Em estoque", "Patrocinado" etc. */
export function Badge({
  tom = "neutro",
  style,
  children,
  ...rest
}: BadgeProps): React.JSX.Element {
  const cores = fundoPorTom[tom];
  return (
    <span
      style={{
        display: "inline-block",
        background: cores.bg,
        color: cores.cor,
        borderRadius: radii.pill,
        padding: "4px 10px",
        fontSize: fontSizes.xs,
        fontWeight: fontWeights.medio,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
