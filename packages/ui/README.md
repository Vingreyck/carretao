# @carretao/ui — Design System do Carretão

A **identidade visual do Carretão em código**: tokens de marca (cores, fontes,
raios, sombras) + componentes React. É a "fonte da verdade" do visual, usada
pelo web (Next.js) e mobile (Expo).

## Por que isso existe (Claude Design / `/design-sync`)

O **Claude Design** lê o design system direto do código. Com este pacote
pronto, basta abrir o repositório no **Claude Code** e rodar:

```bash
/design-sync
```

Ele lê os **tokens** (`src/tokens.ts`) e os **componentes** (`src/components`)
e cria/atualiza o design system no Claude Design — então todas as telas que
você desenhar lá já saem com a cara do Carretão.

> ℹ️ O comando `/design-sync` faz parte da integração do **Claude Design** e
> aparece no **Claude Code do seu computador/app** quando o Claude Design está
> ativo. Rode-o apontando para a pasta deste pacote (`packages/ui`).

## O que tem aqui

| Arquivo | Conteúdo |
|--------|----------|
| `src/tokens.ts` | Cores, fontes, tamanhos, raios, espaçamentos, sombras |
| `src/tokens.css` | Os mesmos tokens como variáveis CSS (`var(--cor-estrada)`) |
| `tailwind.preset.cjs` | Preset Tailwind (classes `bg-estrada`, `text-asfalto`...) |
| `src/components/` | Button, Card, Input, Badge, PriceTag, CategoryChip |
| `src/format.ts` | `formatarBRL(centavos)` |

## Paleta (Estrada)

| Token | Hex | Uso |
|-------|-----|-----|
| `estrada` | `#F26A1B` | Cor principal (laranja sinaleira) |
| `asfalto` | `#1B2A4A` | Azul escuro / contraste |
| `solDoSertao` | `#FFC400` | Detalhe / destaque |
| `fundo` | `#F7F7F5` | Fundo das telas |
| `sucesso` / `alerta` | `#1E9E5A` / `#E03E3E` | Semânticos |

## Uso

```tsx
import { Button, Card, PriceTag, colors } from "@carretao/ui";

<Card>
  <PriceTag centavos={100000} deCentavos={120000} />
  <Button bloco>Peça aí</Button>
</Card>;
```

Tailwind (web/mobile):

```js
// tailwind.config.js do app
module.exports = {
  presets: [require("@carretao/ui/tailwind-preset")],
};
```
