/**
 * Preset Tailwind do Carretão.
 * Uso (web/mobile): no tailwind.config.js do app →
 *   presets: [require("@carretao/ui/tailwind-preset")]
 * Assim as classes (bg-estrada, text-asfalto, rounded-md...) usam os tokens.
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        estrada: {
          DEFAULT: "#F26A1B",
          escuro: "#D2530B",
          claro: "#FFE2CF",
        },
        asfalto: "#1B2A4A",
        sol: "#FFC400",
        fundo: "#F7F7F5",
        superficie: "#FFFFFF",
        suave: "#5B6472",
        borda: "#E3E3DF",
        sucesso: "#1E9E5A",
        alerta: "#E03E3E",
        aviso: "#E8A100",
      },
      fontFamily: {
        titulo: ["Baloo 2", "Nunito", "system-ui", "sans-serif"],
        corpo: ["Nunito", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "14px",
        lg: "22px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 2px 10px rgba(27, 42, 74, 0.08)",
        flutuante: "0 8px 24px rgba(27, 42, 74, 0.16)",
      },
    },
  },
};
