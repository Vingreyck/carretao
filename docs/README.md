# 📚 Documentação — Carretão

> **Carretão** — Marketplace hiperlocal de auto-peças para caminhões, nascido em **Itabaiana/SE**, com programa de comissão transparente para mecânicos.

Esta pasta concentra toda a definição de produto e de negócio do Carretão. A regra é simples: **antes de codar, a regra de negócio tem que estar escrita aqui.** Código segue documento, não o contrário.

## Índice

| Doc | Assunto | Para quem |
|-----|---------|-----------|
| [01 — Visão Geral](./01-visao-geral.md) | O que é, problema, solução, diferencial, por que Itabaiana | Todos |
| [02 — Personas e Papéis](./02-personas-e-papeis.md) | Quem usa, o que cada um faz, papéis no sistema | Produto / Dev |
| [03 — Regras de Negócio](./03-regras-de-negocio.md) | Regras numeradas (RN-XXX) de todo o fluxo | Dev / QA |
| [04 — Comissão do Mecânico](./04-fluxo-de-comissao-mecanico.md) | O coração do produto: como o afiliado ganha | Produto / Dev |
| [05 — Modelo de Dados](./05-modelo-de-dados.md) | Entidades, relações, estados | Dev |
| [06 — Monetização](./06-monetizacao.md) | Como o Carretão fatura | Negócio |
| [07 — Roadmap / MVP por partes](./07-roadmap-mvp.md) | O que construir, em qual ordem | Todos |
| [08 — Stack Técnica](./08-stack-tecnica.md) | Tecnologias propostas e arquitetura | Dev |
| [09 — Glossário](./09-glossario.md) | Termos do negócio e da estrada | Todos |

## Como ler / contribuir

- Toda regra de negócio tem um **ID estável** (ex.: `RN-014`). Cite o ID em PRs, issues e comentários de código.
- Quando uma regra mudar, **edite o documento no mesmo PR** da mudança de código.
- Decisões de arquitetura relevantes viram um registro curto no fim do [08 — Stack Técnica](./08-stack-tecnica.md).

## Status do projeto

| Parte | Descrição | Status |
|-------|-----------|--------|
| 0 | Documentação de regras de negócio + identidade | ✅ Pronto |
| 1 | Landing institucional (estilo querodelivery) | ⬜ A fazer |
| 2 | Backend + modelo de dados | 🟡 Em andamento (core testado + schema + esqueleto API) |
| — | Design system em código (`packages/ui`) para o Claude Design (`/design-sync`) | ✅ Pronto |
| 3 | Web app marketplace | ⬜ A fazer |
| 4 | Painel do lojista | ⬜ A fazer |
| 5 | Painel/app do mecânico (afiliado) | ⬜ A fazer |
| 6 | App mobile (Expo) | ⬜ A fazer |
| 7 | Pagamento in-app + split de comissão | ⬜ A fazer |

Legenda: ✅ Pronto · 🟡 Em andamento · ⬜ A fazer
