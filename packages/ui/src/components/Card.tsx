import React from "react";
import { colors, radii, shadows, spacing } from "../tokens";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Superfície branca arredondada com sombra suave — base de listas e cards. */
export function Card({
  style,
  children,
  ...rest
}: CardProps): React.JSX.Element {
  return (
    <div
      style={{
        background: colors.superficie,
        borderRadius: radii.md,
        boxShadow: shadows.card,
        padding: spacing.md,
        border: `1px solid ${colors.borda}`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
