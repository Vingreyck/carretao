import React from "react";
import { colors, radii, fontSizes } from "../tokens";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  rotulo?: string;
}

/** Campo de texto grande e legível. */
export function Input({
  rotulo,
  style,
  id,
  ...rest
}: InputProps): React.JSX.Element {
  return (
    <label style={{ display: "block", width: "100%" }}>
      {rotulo ? (
        <span
          style={{
            display: "block",
            marginBottom: 6,
            color: colors.texto,
            fontSize: fontSizes.sm,
            fontWeight: 600,
          }}
        >
          {rotulo}
        </span>
      ) : null}
      <input
        id={id}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "14px 16px",
          fontFamily: "inherit",
          fontSize: fontSizes.md,
          color: colors.texto,
          background: colors.superficie,
          border: `1px solid ${colors.borda}`,
          borderRadius: radii.md,
          outline: "none",
          ...style,
        }}
        {...rest}
      />
    </label>
  );
}
