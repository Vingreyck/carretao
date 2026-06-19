/**
 * Tokens de marca do Carretão — a fonte da verdade da identidade visual.
 *
 * Lido pelo `/design-sync` do Claude Design e consumido pelo web/mobile.
 * Paleta "Estrada" (laranja) como principal. Ver histórico de marca em docs/.
 */

export const colors = {
  /** Laranja "sinaleira de estrada" — cor principal da marca. */
  estrada: "#F26A1B",
  estradaEscuro: "#D2530B",
  estradaClaro: "#FFE2CF",
  /** Azul escuro "asfalto" — contraste / modo noturno. */
  asfalto: "#1B2A4A",
  /** Amarelo "sol do sertão" — detalhe/destaque. */
  solDoSertao: "#FFC400",
  /** Neutros. */
  fundo: "#F7F7F5",
  superficie: "#FFFFFF",
  texto: "#1B2A4A",
  textoSuave: "#5B6472",
  borda: "#E3E3DF",
  /** Semânticos. */
  sucesso: "#1E9E5A",
  alerta: "#E03E3E",
  aviso: "#E8A100",
} as const;

export const fonts = {
  /** Títulos: arredondado e forte (sugestão: Baloo 2 / Nunito). */
  titulo: "'Baloo 2', 'Nunito', system-ui, sans-serif",
  /** Corpo: legível, grande (público na estrada/oficina). */
  corpo: "'Nunito', system-ui, -apple-system, sans-serif",
} as const;

/** Tamanhos de fonte em px. Corpo base 16, generoso para leitura rápida. */
export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 26,
  xxl: 34,
} as const;

export const fontWeights = {
  regular: 400,
  medio: 600,
  forte: 800,
} as const;

/** Raios de borda em px. Visual amigável e arredondado. */
export const radii = {
  sm: 8,
  md: 14,
  lg: 22,
  pill: 999,
} as const;

/** Espaçamentos em px (escala de 8). */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const shadows = {
  card: "0 2px 10px rgba(27, 42, 74, 0.08)",
  flutuante: "0 8px 24px rgba(27, 42, 74, 0.16)",
} as const;

/** Agrupa todos os tokens num objeto só. */
export const tokens = {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  radii,
  spacing,
  shadows,
} as const;

export type Tokens = typeof tokens;
export type CorMarca = keyof typeof colors;
