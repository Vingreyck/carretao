# 08 — Stack Técnica (proposta)

> **Proposta para o Vin confirmar.** Critérios: reaproveitar TypeScript entre web e mobile, encaixar com experiência prévia (PostgreSQL, multi-tenant, app de campo — padrão SeeNet), e ser tocável por um time pequeno.

## Resumo

| Camada | Escolha proposta | Por quê |
|--------|------------------|---------|
| **Monorepo** | pnpm workspaces + Turborepo | Compartilhar tipos/regras entre web, mobile e API |
| **Linguagem** | TypeScript em tudo | Um só idioma; tipos do domínio compartilhados |
| **Backend/API** | NestJS (Node) | Estrutura, modular, multi-tenant, fácil de testar regras de negócio |
| **Banco** | PostgreSQL | Relacional, transações, já é o forte do Vin |
| **ORM** | Prisma | Migrations limpas, tipos gerados, produtivo |
| **Web (landing + app)** | Next.js (React) | SSR p/ SEO local da landing + app no mesmo ecossistema |
| **Mobile** | Expo (React Native) | iOS/Android com 1 base; reaproveita lógica/TS do web |
| **Auth** | OTP por WhatsApp/SMS + JWT | `RN-001`; público usa WhatsApp |
| **Pagamento (Fase 2)** | Gateway com split (ex.: Pix split) | `RN-047`, split de comissão automático |
| **Infra** | Contêiner + Postgres gerenciado | Simples de operar; portável |

## Estrutura de monorepo proposta

```
carretao/
├── docs/                 # esta documentação (fonte da verdade de negócio)
├── apps/
│   ├── api/              # NestJS — backend, regras de negócio (RN-*)
│   ├── web/              # Next.js — landing institucional + web app
│   └── mobile/           # Expo — app do cliente e do mecânico
├── packages/
│   ├── core/             # regras de domínio compartilhadas (estados, cálculo de comissão)
│   ├── types/            # tipos/contratos da API (compartilhados)
│   └── ui/               # componentes/identidade visual (mascote, paleta)
└── package.json          # workspaces
```

## Princípios de arquitetura

1. **Regras de negócio no `core`/`api`, não na UI.** O cálculo de comissão e as máquinas de estado (`RN-037`, `RN-A20+`) vivem em um lugar testável e são citados por ID nos testes.
2. **Multi-tenant por `loja_id`.** Todo dado de loja é isolado; toda query carrega o tenant. Cliente/mecânico são globais (`02`).
3. **Imutabilidade financeira.** Snapshots e auditoria append-only (`RN-036`, `RN-082`) — nunca recalcular o passado.
4. **Contratos primeiro.** A API publica contratos tipados (`packages/types`) que web e mobile consomem — menos divergência.
5. **Offline-tolerante onde dói.** UX pensada pra oficina/estrada com conexão ruim (cache, retry).

## Decisões em aberto

- Gateway de pagamento específico (Fase 2) — avaliar opções com **split de Pix** no mercado BR.
- Estratégia de busca/geo (Postgres + PostGIS vs. serviço de busca) — começar simples no Postgres.
- Push notifications (Expo Push) vs. provedor dedicado.

---

## Registro de decisões de arquitetura (ADR resumido)

> Anote aqui decisões relevantes, com data e motivo. Formato: `AAAA-MM-DD — Decisão — Motivo`.

- **2026-06-19 — Documentação de negócio antes de código (Parte 0).** Motivo: o Vin pediu regras de negócio bem definidas e documentadas como fundação; reduz retrabalho.
- **2026-06-19 — Regras de domínio puras em `@carretao/core`, fora do framework.** Motivo: cálculo de comissão e máquinas de estado (RN-037, RN-A20+) precisam ser testáveis e reusáveis por API, web e mobile sem acoplar a NestJS. 38 testes cobrindo as regras.
- **2026-06-19 — Dinheiro em centavos (Int); percentual em Decimal(5,4).** Motivo: evitar erro de ponto flutuante em valores financeiros; imutabilidade via snapshots (RN-036).
- **2026-06-19 — PrismaService conecta de forma preguiçosa (sem `$connect` no boot).** Motivo: a API sobe mesmo sem banco, permitindo testar endpoints de domínio; o health-check reporta a disponibilidade do banco.
- _(próximas decisões aqui)_
