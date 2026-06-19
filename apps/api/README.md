# @carretao/api

Backend NestJS do Carretão (multi-tenant, PostgreSQL via Prisma). As regras de
negócio puras vivem em [`@carretao/core`](../../packages/core); esta API as
orquestra e expõe via HTTP. Ver [docs/05](../../docs/05-modelo-de-dados.md) e
[docs/08](../../docs/08-stack-tecnica.md).

## Pré-requisitos

- Node 20+, pnpm
- PostgreSQL 14+ (para migrations/dados; a API sobe sem banco, mas os
  endpoints que tocam o banco ficam indisponíveis)

## Configuração

```bash
cp .env.example .env   # ajuste DATABASE_URL e PORT
```

## Rodando

```bash
# na raiz do monorepo
pnpm install

# gera o Prisma Client + compila
pnpm --filter @carretao/api build

# aplica o schema no banco (precisa de PostgreSQL no DATABASE_URL)
pnpm --filter @carretao/api prisma:migrate

# sobe a API (a partir de apps/api)
pnpm --filter @carretao/api start
# ou em desenvolvimento:
pnpm --filter @carretao/api dev
```

A API sobe em `http://localhost:$PORT/api`.

## Endpoints (esqueleto da Parte 2)

| Método | Rota | O que faz | Regras |
|--------|------|-----------|--------|
| GET | `/api/health` | Status do serviço + banco | — |
| POST | `/api/comissao/simular` | Calcula comissão do mecânico | RN-A10/A12, RN-013 |
| GET | `/api/pedidos/estados/:status/proximos` | Próximos estados válidos do pedido | RN-037 |
| POST | `/api/pedidos/transicao/validar` | Valida uma transição de estado | RN-037 |

### Exemplos

```bash
# Simular comissão de 5% sobre R$ 1.000,00 em itens
curl -X POST http://localhost:3000/api/comissao/simular \
  -H 'Content-Type: application/json' \
  -d '{"valorItensCentavos":100000,"comissaoPercentual":0.05}'
# → {"valorBaseCentavos":100000,"comissaoBrutaCentavos":5000,
#    "taxaPlataformaCentavos":0,"comissaoLiquidaCentavos":5000,"percentualValido":true}

# Próximos estados a partir de EM_PREPARO
curl http://localhost:3000/api/pedidos/estados/EM_PREPARO/proximos
# → {"de":"EM_PREPARO","proximos":["PRONTO","ENVIADO","CANCELADO"]}
```

## Estrutura

```
apps/api/
├── prisma/schema.prisma   # modelo de dados (docs/05)
└── src/
    ├── main.ts            # bootstrap
    ├── app.module.ts
    ├── prisma/            # PrismaService (provider global)
    ├── health/            # health-check
    ├── comissao/          # simulação de comissão (usa @carretao/core)
    └── pedidos/           # máquina de estados do pedido (usa @carretao/core)
```

> Próximas fatias da Parte 2: auth por OTP (RN-001), módulos de lojas,
> produtos/ofertas e o fluxo de criação de pedido com atribuição + persistência
> da comissão. Ver [docs/07](../../docs/07-roadmap-mvp.md).
